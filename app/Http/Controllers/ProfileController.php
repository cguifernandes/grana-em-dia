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

        if ($request->has('id') && $request->id != $user->id) {
            abort(403, 'Acesso não autorizado.');
        }

        $rules = [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ];

        if ($request->filled('currentPassword') || $request->filled('newPassword') || $request->filled('passwordConfirmation')) {
            $rules['currentPassword'] = 'required|string';
            $rules['newPassword'] = 'required|string|max:8';
            $rules['passwordConfirmation'] = 'required|same:newPassword';
        }

        $validated = $request->validate($rules, [
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

        $data = [
            'name' => $validated['name'],
            'email' => $validated['email'],
        ];

        if (!empty($validated['currentPassword']) && !empty($validated['newPassword'])) {
            if (!\Hash::check($validated['currentPassword'], $user->password)) {
                return back()->withErrors(['currentPassword' => 'Senha atual incorreta.']);
            }
            $data['password'] = bcrypt($validated['newPassword']);
        }

        $user->update($data);

        return back()->with('success', 'Perfil atualizado com sucesso!');
    }
}