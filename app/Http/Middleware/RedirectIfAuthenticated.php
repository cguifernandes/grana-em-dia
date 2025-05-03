<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class RedirectIfAuthenticated extends Middleware
{
  public function handle(Request $request, Closure $next, ...$guards)
  {
      foreach ($guards as $guard) {
          if (Auth::guard($guard)->check()) {
              return redirect('/'); 
          }
      }

      return $next($request);
  }
}