<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('profile');
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'currentPassword' => 'required|string',
            'newPassword' => 'required|string|max:8',
            'passwordConfirmation' => 'required|same:newPassword',
        ], [
            'name.required' => 'Este campo é obrigatório.',
            'name.string' => 'O campo nome deve ser uma string.',
            'email.required' => 'Este campo é obrigatório.',
            'email.email' => 'E-mail inválido, por favor digite um e-mail válido.',
            'email.unique' => 'Já existe um usuário com este e-mail.',
            'currentPassword.required' => 'Este campo é obrigatório.',
            'newPassword.required' => 'Este campo é obrigatório.',
            'newPassword.max' => 'A senha deve ter no máximo 8 caracteres.',
            'passwordConfirmation.required' => 'Este campo é obrigatório.',
            'passwordConfirmation.same' => 'As senhas não coincidem.',
        ]);

        if (!\Hash::check($validated['currentPassword'], $user->password)) {
            return back()->withErrors(['currentPassword' => 'Senha atual incorreta.']);
        }
    
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['newPassword']),
        ]);
    
        return back()->with('success', 'Perfil atualizado com sucesso!');
    }
}