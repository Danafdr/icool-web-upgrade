<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected string $apiKey;
    protected string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key');
    }

    public function analyzeContactForm(array $data): array
    {
        if (empty($this->apiKey)) {
            Log::warning('Gemini API key is not set. Skipping AI analysis.');
            return [
                'is_spam' => false,
                'cleaned_message' => $data['message'] ?? '',
                'urgency' => 'medium'
            ];
        }

        $prompt = $this->buildPrompt($data);

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($this->baseUrl . '?key=' . $this->apiKey, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.1,
                    'responseMimeType' => 'application/json',
                ]
            ]);

            if ($response->successful()) {
                $jsonResult = $response->json('candidates.0.content.parts.0.text');
                
                if ($jsonResult) {
                    $decoded = json_decode($jsonResult, true);
                    if (json_last_error() === JSON_ERROR_NONE) {
                        return $decoded;
                    }
                }
            }

            Log::error('Gemini API returned an invalid response: ' . $response->body());
        } catch (\Exception $e) {
            Log::error('Gemini API connection error: ' . $e->getMessage());
        }

        // Fallback if API fails
        return [
            'is_spam' => false,
            'cleaned_message' => $data['message'] ?? '',
            'urgency' => 'medium'
        ];
    }

    protected function buildPrompt(array $data): string
    {
        $json = json_encode($data, JSON_PRETTY_PRINT);
        return <<<PROMPT
You are an expert customer service assistant for "iCool", an HVAC and AC repair company in Indonesia.
Your task is to analyze an incoming contact form submission and return a strict JSON response.

Here is the submitted data:
{$json}

Follow these exact instructions:
1. Determine if this request is SPAM or a FAKE request (e.g., keyboard mashing, completely unrelated gibberish, SEO spam, or fake names like "asdfasdf").
2. Determine the "urgency" of the request (low, medium, high). E.g., AC leaking/broken in a hot climate is usually medium/high. Maintenance is low.
3. Provide a "cleaned_message". Fix any typos, improve grammar, translate to professional Indonesian if needed, and summarize the core issue clearly for the admin. If the user didn't write a message, just write "Pelanggan tidak menyertakan pesan tambahan."

Your output MUST be a valid JSON object with EXACTLY these keys:
{
    "is_spam": boolean,
    "confidence_score": integer (0-100),
    "cleaned_message": string,
    "urgency": "low" | "medium" | "high",
    "reasoning": string
}
PROMPT;
    }

    public function generateReply(\App\Models\Contact $contact): string
    {
        if (empty($this->apiKey)) {
            Log::warning('Gemini API key is not set. Cannot generate reply.');
            return "Maaf, sistem AI sedang tidak tersedia saat ini. Mohon ketik balasan Anda secara manual.";
        }

        $prompt = <<<PROMPT
You are an expert customer service representative for "iCool", a professional HVAC and AC repair company in Indonesia.
Please write a polite, professional, and helpful email reply to the following customer. 

Customer Details:
Name: {$contact->name}
Service Requested: {$contact->hvac_issue_type}
Their Message/Summary: {$contact->ai_summary} (Original message: {$contact->message})

Instructions:
1. Write the reply in Indonesian.
2. Be empathetic and professional. 
3. If they requested a service/repair, tell them our technicians will contact them soon to schedule a visit, or ask them for a preferred time.
4. Do NOT include a subject line, just the email body starting with a greeting (e.g., "Halo Bpk/Ibu {$contact->name},").
5. Sign off as "Tim Support iCool".
PROMPT;

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($this->baseUrl . '?key=' . $this->apiKey, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                ]
            ]);

            if ($response->successful()) {
                $textResult = $response->json('candidates.0.content.parts.0.text');
                if ($textResult) {
                    return trim($textResult);
                }
            }

            Log::error('Gemini API returned an invalid response during reply generation: ' . $response->body());
        } catch (\Exception $e) {
            Log::error('Gemini API connection error (reply generation): ' . $e->getMessage());
        }

        return "Maaf, sistem AI gagal menghasilkan balasan. Mohon ketik balasan secara manual.";
    }
}
