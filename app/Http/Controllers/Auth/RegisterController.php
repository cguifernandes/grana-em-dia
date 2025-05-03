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
            'password' => 'required|string|max:8',
            'passwordConfirmation' => 'required|same:password',
        ], [
            'name.required' => 'Este campo é obrigatório.',
            'name.string' => 'O campo nome deve ser uma string.',
            'email.required' => 'Este campo é obrigatório.',
            'email.email' => 'E-mail inválido, por favor digite um e-mail válido.',
            'email.unique' => 'Já existe um usuário com este e-mail.',
            'password.required' => 'Este campo é obrigatório.',
            'password.string' => 'A senha deve ser uma string.',
            'password.max' => 'A senha deve ter no máximo 8 caracteres.',
            'passwordConfirmation.required' => 'Este campo é obrigatório.',
            'passwordConfirmation.same' => 'As senhas não coincidem.',
        ]);

        $user = User::create($request->only(['name', 'email', 'password']));
    
        return Redirect::route('register')->with('success', 'Parabéns! Sua conta foi criada com sucesso.');
    }
}
