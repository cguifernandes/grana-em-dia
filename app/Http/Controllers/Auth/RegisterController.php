<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class RegisterController extends Controller
{
    public function index()
    {
        return Inertia::render('auth/register');
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'passwordConfirmation' => 'required|same:password',
        ], [
            'name.required' => 'O campo nome é obrigatório.',
            'name.string' => 'O campo nome deve ser uma string.',
            'email.required' => 'O campo e-mail é obrigatório.',
            'email.email' => 'O e-mail fornecido não é válido.',
            'email.unique' => 'Já existe um usuário com este e-mail.',
            'password.required' => 'O campo senha é obrigatório.',
            'password.string' => 'A senha deve ser uma string.',
            'password.min' => 'A senha deve ter pelo menos 6 caracteres.',
            'passwordConfirmation.required' => 'A confirmação de senha é obrigatória.',
            'passwordConfirmation.same' => 'As senhas não coincidem.',
        ]);

        dd($validated);
        
        // Criar o usuário aqui
        // User::create([...])
        
        // return redirect()->route('login');
    }
}
