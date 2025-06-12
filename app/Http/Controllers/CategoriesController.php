<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Facades\Redirect;

class CategoriesController extends Controller
{
    public function index()
    {
        $categories = Category::where('user_id', auth()->id())->get();
        
        return Inertia::render('category', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
         $user = auth()->user();

        if ($user->categories()->count() >= 6) {
            return Redirect::back()->withErrors([
                'error' => 'Você só pode criar até 6 categorias.',
            ]);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:20'],
        ], [
            'name.required' => 'Este campo é obrigatório.',
            'name.string' => 'O campo nome deve ser uma string.',
            'name.max' => 'O campo nome deve ter no máximo 20 caracteres.',
        ]);

        $category = Category::create([
            'name' => $request->name,
            'icon' => $request->icon,
            'color' => $request->color,
            'user_id' => auth()->id(),
        ]);
    
        return Redirect::back()->with('success', 'Categoria criada com sucesso.');
    }

    public function update(Request $request, Category $category)
    {
        if ($category->user_id !== auth()->id()) {
            abort(403, 'Acesso não autorizado.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:20'],
        ], [
            'name.required' => 'Este campo é obrigatório.',
            'name.string' => 'O campo nome deve ser uma string.',
            'name.max' => 'O campo nome deve ter no máximo 20 caracteres.',
        ]);

        $category->update($request->only(['name', 'icon', 'color']));
    
        return Redirect::back()->with('success', 'Categoria atualizada com sucesso.');
    }

    public function destroy(Category $category)
    {
        if ($category->user_id !== auth()->id()) {
            abort(403, 'Acesso não autorizado.');
        }

        $category->delete();

        return Redirect::back()->with('success', 'Categoria deletada com sucesso.');
    }
}