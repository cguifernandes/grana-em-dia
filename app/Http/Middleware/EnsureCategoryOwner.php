<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureCategoryOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $category = $request->route('category');

        if ($category instanceof Category) {
            if ($category->user_id !== auth()->id()) {
                abort(403, 'Acesso não autorizado.');
            }
        }

        return $next($request);
    }
}
