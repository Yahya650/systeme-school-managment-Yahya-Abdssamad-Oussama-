<?php

use Vinkla\Hashids\Facades\Hashids;

function dcryptID($encrypted_id, $connection = 'main')
{
    try {
        $text = Hashids::connection($connection)->decode($encrypted_id);
        if (count($text) > 0) {
            return $text[0];
        } else {
            return null;
        }
    } catch (\Exception $e) {
        return null;
    }
}

function cryptID($id, $connection = 'main')
{
    try {
        return Hashids::connection($connection)->encode($id);
    } catch (\Exception $e) {
        return null;
    }
}

function enCodeId($text)
{
    if (!isset($text)) {
        exit("Merci de spécifier le 'text' à encoder.");
    }
    $encrypt_method = 'AES-256-CBC';
    $secret_key = 'ad4f56g4hhe'; //'The DB is the bottleneck because';
    $secret_iv = '2f3g65h8ttfd'; //'Doing it in PHP is better because';
    // hash
    $key = substr(hash('sha256', $secret_key), 0, 32);
    $iv = substr(hash('sha256', $secret_iv), 0, 16);
    $output = openssl_encrypt($text, $encrypt_method, $key, 0, $iv);

    return base64_encode($output);
}
