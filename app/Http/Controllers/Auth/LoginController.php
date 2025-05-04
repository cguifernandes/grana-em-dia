<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        return Inertia::render('auth/login');
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ], [
            'email.required' => 'Este campo é obrigatório.',
            'email.email' => 'E-mail inválido.',
            'password.required' => 'Este campo é obrigatório.',
        ]);

        $rememberMe = $request->boolean('rememberMe');

        if (Auth::attempt($credentials, $rememberMe)) {
            $request->session()->regenerate();

            return redirect()->intended('/')->with('success', 'Login realizado com sucesso!');
        }

        return Redirect::back()->with([
            'error' => 'As credenciais não conferem.',
        ]);
    }
}
