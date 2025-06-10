<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use App\Models\Transaction;
use App\Models\Category;
use Carbon\Carbon;

class TransactionsController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('category')
            ->where('user_id', auth()->id())
            ->get();

        $categories = Category::where('user_id', auth()->id())->get();

        return Inertia::render('transactions', [
            'transactions' => $transactions,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => ['required', 'string', 'min:1', 'max:20'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'date' => ['required', 'date'],
            'category_id' => ['required', 'integer', 'min:1'],
            'type' => ['required', 'string', 'in:expense,income'],
        ], [
            'description.required' => 'Este campo é obrigatório.',
            'description.string' => 'O campo descrição deve ser uma string.',
            'description.min' => 'O campo descrição deve ter no mínimo 1 caractere.',
            'description.max' => 'O campo descrição deve ter no máximo 20 caracteres.',
            'amount.required' => 'Este campo é obrigatório.',
            'amount.numeric' => 'O campo valor deve ser um número.',
            'amount.min' => 'O valor deve ser maior que zero.',
            'date.required' => 'Este campo é obrigatório.',
            'date.date' => 'O campo data deve ser uma data válida.',
            'category_id.required' => 'Este campo é obrigatório.',
            'category_id.integer' => 'O campo categoria deve ser um número inteiro.',
            'category_id.min' => 'O campo categoria é obrigatório.',
            'type.required' => 'Este campo é obrigatório.',
            'type.string' => 'O campo tipo deve ser uma string.',
            'type.in' => 'O tipo deve ser despesa ou receita.',
        ]);

        // Converte a data para o formato 'Y-m-d H:i:s'
        $validated['date'] = Carbon::parse($validated['date'])->format('Y-m-d H:i:s');

        $transaction = Transaction::create([
            'description' => $validated['description'],
            'amount' => $validated['amount'],
            'date' => $validated['date'],
            'category_id' => $validated['category_id'],
            'type' => $validated['type'],
            'user_id' => auth()->id(),
        ]);

        return Redirect::back()->with('success', 'Transação criada com sucesso.');
    }


    public function update(Request $request, Transaction $transaction) 
    {
        if ($transaction->user_id !== auth()->id()) {
            abort(403, 'Acesso não autorizado.');
        }

        $validated = $request->validate([
            'description' => ['required', 'string', 'min:1', 'max:20'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'date' => ['required', 'date'],
            'category_id' => ['required', 'integer', 'min:1'],
            'type' => ['required', 'string', 'in:expense,income'],
        ], [
            'description.required' => 'Este campo é obrigatório.',
            'description.string' => 'O campo descrição deve ser uma string.',
            'description.min' => 'O campo descrição deve ter no mínimo 1 caractere.',
            'description.max' => 'O campo descrição deve ter no máximo 20 caracteres.',
            'amount.required' => 'Este campo é obrigatório.',
            'amount.numeric' => 'O campo valor deve ser um número.',
            'amount.min' => 'O valor deve ser maior que zero.',
            'date.required' => 'Este campo é obrigatório.',
            'date.date' => 'O campo data deve ser uma data válida.',
            'category_id.required' => 'Este campo é obrigatório.',
            'category_id.integer' => 'O campo categoria deve ser um número inteiro.',
            'category_id.min' => 'O campo categoria é obrigatório.',
            'type.required' => 'Este campo é obrigatório.',
            'type.string' => 'O campo tipo deve ser uma string.',
            'type.in' => 'O tipo deve ser despesa ou receita.',
        ]);

        $transaction->update($request->only(['description', 'amount', 'date', 'category_id', 'type']));
    
        return Redirect::back()->with('success', 'Transação atualizada com sucesso.');
    }
    
    public function destroy(Transaction $transaction)
    {
        if ($transaction->user_id !== auth()->id()) {
            abort(403, 'Acesso não autorizado.');
        }

        $transaction->delete();

        return Redirect::back()->with('success', 'Transação deletada com sucesso.');
    }
}
