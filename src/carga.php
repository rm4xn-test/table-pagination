<?php

$ch = curl_init('https://pokeapi.co/api/v2/ability/');

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

curl_close($ch);

header('Content-Type: application/json');

echo json_encode(json_decode($response, true)['results']);
