<?php
/**
 * Modèle de configuration du formulaire de contact.
 * À copier sur le serveur sous le nom public_html/contact-config.php
 * (à côté de contact.php), puis à compléter.
 * Ne pas versionner le fichier réel : il contient le mot de passe MySQL.
 */

return [
    // Boîte qui reçoit les demandes.
    'mail_to' => 'contact@globalengineering.sn',

    // Expéditeur : une adresse qui EXISTE sur le domaine hébergé,
    // sinon les messages risquent d'arriver en spam ou d'être refusés.
    'mail_from' => 'no-reply@globalengineering.sn',
    'mail_from_name' => 'Site Global Engineering',

    // Envoi par SMTP authentifié (recommandé sur mutualisé) : identifiants de
    // la boîte mail_from. Mot de passe vide = repli sur mail() de PHP.
    'smtp' => [
        'host' => 'mail.globalengineering.sn',
        'port' => 465,
        'user' => 'no-reply@globalengineering.sn',
        'password' => '',
    ],

    // Enregistrement en base (facultatif) : laisser 'name' vide pour ne
    // faire que l'envoi d'e-mail. Créer la table avec deploy/schema.sql.
    'db' => [
        'host' => 'localhost',
        'name' => '',
        'user' => '',
        'password' => '',
    ],
];
