<?php
/**
 * Point d'envoi du formulaire /contact pour l'hébergement mutualisé (Apache + PHP).
 * Remplace la procédure oRPC contact.submit : mêmes règles de validation,
 * envoi d'un e-mail à l'équipe GLE (SMTP authentifié ou mail()) et, si
 * configuré, enregistrement en MySQL.
 *
 * La configuration (destinataire, expéditeur, SMTP, base MySQL) se trouve dans
 * contact-config.php, à placer à côté de ce fichier sur le serveur
 * (modèle : deploy/contact-config.example.php).
 */

declare(strict_types=1);

// Les erreurs vont dans le journal de l'hébergeur, jamais dans la réponse JSON.
ini_set('display_errors', '0');
ini_set('log_errors', '1');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'Méthode non autorisée.']);
}

$configPath = __DIR__ . '/contact-config.php';
if (!is_file($configPath)) {
    error_log('[contact] contact-config.php introuvable');
    respond(500, ['error' => 'Configuration du formulaire manquante.']);
}
$config = require $configPath;

$raw = file_get_contents('php://input', false, null, 0, 64 * 1024);
$input = json_decode($raw ?: '', true);
if (!is_array($input)) {
    respond(400, ['error' => 'Requête invalide.']);
}

// Champ piège invisible : un humain le laisse vide, un robot le remplit.
if (!empty($input['website'])) {
    respond(200, ['id' => null, 'receivedAt' => gmdate('c')]);
}

/** Texte nettoyé, ou null si vide. */
function field(array $input, string $key): ?string
{
    $value = $input[$key] ?? null;
    if (!is_string($value)) {
        return null;
    }
    $value = trim($value);
    return $value === '' ? null : $value;
}

function length(?string $value): int
{
    return $value === null ? 0 : mb_strlen($value, 'UTF-8');
}

$subjects = [
    'devis' => 'Demande de devis',
    'appel-offres' => "Consultation sur appel d'offres",
    'fournisseur' => 'Proposition de fourniture',
];

$data = [
    'subject' => field($input, 'subject'),
    'name' => field($input, 'name'),
    'organization' => field($input, 'organization'),
    'email' => field($input, 'email'),
    'phone' => field($input, 'phone'),
    'location' => field($input, 'location'),
    'message' => field($input, 'message'),
    'howHeard' => field($input, 'howHeard'),
];

// Seul le message peut contenir plusieurs lignes.
foreach ($data as $key => $value) {
    if ($key !== 'message' && $value !== null) {
        $data[$key] = preg_replace('/\s+/u', ' ', $value);
    }
}

// Mêmes limites que le schéma zod de src/api/routes/contact.ts.
$errors = [];
if (!isset($subjects[$data['subject'] ?? ''])) $errors[] = 'subject';
if (length($data['name']) < 2 || length($data['name']) > 120) $errors[] = 'name';
if (length($data['organization']) > 160) $errors[] = 'organization';
if ($data['email'] === null || length($data['email']) > 160 || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if (length($data['phone']) > 40) $errors[] = 'phone';
if (length($data['location']) > 160) $errors[] = 'location';
if (length($data['message']) < 10 || length($data['message']) > 4000) $errors[] = 'message';
if (length($data['howHeard']) > 80) $errors[] = 'howHeard';

if ($errors) {
    respond(422, ['error' => 'Champs invalides.', 'fields' => $errors]);
}

$data['email'] = mb_strtolower($data['email'], 'UTF-8');
$id = bin2hex(random_bytes(16));
$receivedAt = gmdate('c');

/* ------------------------------------------------------------- base MySQL */

$stored = false;
if (!empty($config['db']['name'])) {
    try {
        $pdo = new PDO(
            sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['db']['host'] ?? 'localhost', $config['db']['name']),
            $config['db']['user'] ?? '',
            $config['db']['password'] ?? '',
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        $stmt = $pdo->prepare(
            'INSERT INTO contact_submissions
                (id, subject, name, organization, email, phone, location, message, how_heard, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP())'
        );
        $stmt->execute([
            $id, $data['subject'], $data['name'], $data['organization'], $data['email'],
            $data['phone'], $data['location'], $data['message'], $data['howHeard'],
        ]);
        $stored = true;
    } catch (Throwable $e) {
        error_log('[contact] MySQL : ' . $e->getMessage());
    }
}

/* ----------------------------------------------------------------- e-mail */

/** Retire les retours à la ligne pour empêcher l'injection d'en-têtes. */
function headerSafe(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value));
}

$subjectLabel = $subjects[$data['subject']];
$lines = [
    "Nouvelle demande reçue depuis le site — {$subjectLabel}",
    '',
    'Nom : ' . $data['name'],
    'Structure : ' . ($data['organization'] ?? '—'),
    'E-mail : ' . $data['email'],
    'Téléphone : ' . ($data['phone'] ?? '—'),
    'Localisation du projet : ' . ($data['location'] ?? '—'),
    'Connu via : ' . ($data['howHeard'] ?? '—'),
    '',
    'Message :',
    $data['message'],
    '',
    "Référence : {$id} — reçue le {$receivedAt} (UTC)",
];

$from = headerSafe($config['mail_from']);
$to = headerSafe($config['mail_to']);
$subjectHeader = mb_encode_mimeheader("[Site GLE] {$subjectLabel} — " . headerSafe($data['name']), 'UTF-8');
$body = implode("\r\n", $lines);
$headers = [
    'From: ' . mb_encode_mimeheader($config['mail_from_name'] ?? 'Site GLE', 'UTF-8') . " <{$from}>",
    'Reply-To: ' . mb_encode_mimeheader(headerSafe($data['name']), 'UTF-8') . ' <' . headerSafe($data['email']) . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

/** Lit une réponse SMTP (éventuellement sur plusieurs lignes) et vérifie son code. */
function smtpRead($socket, array $expected): string
{
    $response = '';
    while (($line = fgets($socket, 1024)) !== false) {
        $response .= $line;
        if (strlen($line) < 4 || $line[3] === ' ') break;
    }
    if (!in_array((int) substr($response, 0, 3), $expected, true)) {
        throw new RuntimeException('réponse SMTP inattendue : ' . trim($response));
    }
    return $response;
}

function smtpCommand($socket, string $command, array $expected): string
{
    fwrite($socket, $command . "\r\n");
    return smtpRead($socket, $expected);
}

/**
 * Envoi par SMTP authentifié (port 465 en SSL, sinon STARTTLS) : plus fiable
 * que mail() sur les hébergements qui le brident.
 */
function smtpSend(array $smtp, string $from, string $to, string $subject, array $headers, string $body): void
{
    $port = (int) ($smtp['port'] ?? 465);
    $host = $smtp['host'];
    $socket = @stream_socket_client(
        ($port === 465 ? 'ssl://' : 'tcp://') . "{$host}:{$port}", $errno, $errstr, 15
    );
    if (!$socket) {
        throw new RuntimeException("connexion à {$host}:{$port} impossible ({$errstr})");
    }
    stream_set_timeout($socket, 15);
    try {
        smtpRead($socket, [220]);
        $ehlo = smtpCommand($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), [250]);
        if ($port !== 465) {
            if (stripos($ehlo, 'STARTTLS') === false) {
                throw new RuntimeException('le serveur ne propose pas STARTTLS');
            }
            smtpCommand($socket, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('échec de STARTTLS');
            }
            smtpCommand($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), [250]);
        }
        smtpCommand($socket, 'AUTH LOGIN', [334]);
        smtpCommand($socket, base64_encode($smtp['user']), [334]);
        smtpCommand($socket, base64_encode($smtp['password']), [235]);
        smtpCommand($socket, "MAIL FROM:<{$from}>", [250]);
        smtpCommand($socket, "RCPT TO:<{$to}>", [250, 251]);
        smtpCommand($socket, 'DATA', [354]);

        $message = implode("\r\n", array_merge(
            [
                "To: <{$to}>",
                "Subject: {$subject}",
                'Date: ' . date(DATE_RFC2822),
                'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . substr(strrchr($from, '@'), 1) . '>',
            ],
            $headers,
            ['Content-Transfer-Encoding: base64', '', rtrim(chunk_split(base64_encode($body), 76, "\r\n"))]
        ));
        smtpCommand($socket, $message . "\r\n.", [250]);
        smtpCommand($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

$sent = false;
if (!empty($config['smtp']['host']) && !empty($config['smtp']['password'])) {
    try {
        smtpSend($config['smtp'], $from, $to, $subjectHeader, $headers, $body);
        $sent = true;
    } catch (Throwable $e) {
        error_log("[contact] SMTP, demande {$id} : " . $e->getMessage());
    }
} elseif (!function_exists('mail')) {
    error_log('[contact] mail() est désactivée par l\'hébergeur : renseigner la section smtp de contact-config.php');
} else {
    $mailHeaders = implode("\r\n", array_merge($headers, ['Content-Transfer-Encoding: 8bit']));
    $sent = mail($to, $subjectHeader, $body, $mailHeaders, '-f' . $from);
    if (!$sent) {
        // Certains hébergeurs refusent l'expéditeur forcé par -f.
        $sent = mail($to, $subjectHeader, $body, $mailHeaders);
    }
    if (!$sent) {
        error_log("[contact] échec de mail() pour la demande {$id} : " . (error_get_last()['message'] ?? 'raison inconnue'));
    }
}

if (!$sent && !$stored) {
    respond(500, ['error' => "La demande n'a pas pu être transmise."]);
}

respond(200, ['id' => $id, 'receivedAt' => $receivedAt]);
