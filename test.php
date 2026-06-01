<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$contact = App\Models\Contact::latest()->first();
$gemini = app(\App\Services\GeminiService::class);
$reflection = new ReflectionClass($gemini);
$property = $reflection->getProperty('apiKey');
$property->setAccessible(true);
$apiKey = $property->getValue($gemini);
$baseUrl = $reflection->getProperty('baseUrl');
$baseUrl->setAccessible(true);
$prompt = "test";
var_dump($gemini->refineReply("wth u talking abt just pay 200rb now or i wont come to ur house"));
