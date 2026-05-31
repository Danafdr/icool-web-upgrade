<?php

/**
 * Vercel Serverless Entry Point
 * 
 * This file acts as a proxy to Laravel's public/index.php
 * Vercel directs all HTTP requests here based on vercel.json
 */

require __DIR__ . '/../public/index.php';
