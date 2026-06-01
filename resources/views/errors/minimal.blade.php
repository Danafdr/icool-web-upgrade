<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title') - iCool</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background-color: #030712; /* gray-950 */
            color: #f3f4f6; /* gray-100 */
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            text-align: center;
            padding: 2rem;
        }
        .error-code {
            font-size: 6rem;
            font-weight: 800;
            color: #00B551; /* brand-green */
            margin: 0;
            line-height: 1;
        }
        .error-message {
            font-size: 1.5rem;
            font-weight: 500;
            margin-top: 1rem;
            color: #9ca3af; /* gray-400 */
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .btn {
            display: inline-block;
            margin-top: 2.5rem;
            padding: 0.75rem 2rem;
            background-color: #00B551;
            color: #030712;
            text-decoration: none;
            font-weight: 600;
            border-radius: 9999px;
            transition: opacity 0.2s;
        }
        .btn:hover {
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="error-code">@yield('code')</h1>
        <div class="error-message">@yield('message')</div>
        <button type="button" id="refresh-btn" class="btn" style="border: none; cursor: pointer; font-size: inherit; font-family: inherit;">
            @hasSection('action_text')
                @yield('action_text')
            @else
                Refresh Website
            @endif
        </button>
    </div>

    <script>
        document.getElementById('refresh-btn').addEventListener('click', function() {
            try {
                // Strategy 1: Navigate the top-level window (works if not sandboxed)
                if (window.top && window.top !== window) {
                    window.top.location.reload();
                    return;
                }
            } catch (e) {
                // Blocked by sandbox — try postMessage
            }

            try {
                // Strategy 2: Ask the parent frame to reload via postMessage
                if (window.parent && window.parent !== window) {
                    window.parent.postMessage('inertia-reload', '*');
                    return;
                }
            } catch (e) {
                // Also blocked
            }

            // Strategy 3: We're not in an iframe at all, just reload normally
            window.location.reload(true);
        });
    </script>
</body>
</html>
