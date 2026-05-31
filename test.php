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
$response = \Illuminate\Support\Facades\Http::get('https://generativelanguage.googleapis.com/v1beta/models?key=' . $apiKey);
var_dump($response->status());
var_dump($response->body());
