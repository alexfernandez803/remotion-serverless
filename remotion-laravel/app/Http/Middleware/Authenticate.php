<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Symfony\Component\HttpFoundation\Response;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo($request)
    {

        if (!$request->expectsJson()) {
            return "/";
        }

    }

    /**
     * Handle an incoming request.

    public function handle($request, Closure $next, ...$guards): Response
    {
    try {
    $this->authenticate($request, $guards);
    } catch (AuthenticationException $e) {
    if (!$request->wantsJson()) {
    throw $e;
    }

    if ($response = $this->auth->onceBasic()) {
    return $response;
    }
    }

    return $next($request);
    }
     */
}
