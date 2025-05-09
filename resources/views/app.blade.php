<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    @routes
    @inertiaHead
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    <script>
        (function () {
            const theme = localStorage.getItem("theme") || "light";
            document.documentElement.classList.add(theme);
        })();
    </script>
</head>
<body>
@inertia
</body>
</html>