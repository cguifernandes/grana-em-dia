<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FinancesController extends Controller
{
    public function trendsLastSixMonths()
    {
        try {
            $user = Auth::user();

            Carbon::setLocale('pt_BR');

            $startDate = Carbon::now()->subMonths(5)->startOfMonth();

            $rawData = $user->transactions()
                ->selectRaw("DATE_FORMAT(date, '%Y-%m') as month, type, SUM(amount) as total")
                ->where('date', '>=', $startDate)
                ->groupBy('month', 'type')
                ->orderBy('month')
                ->get()
                ->groupBy('month');

            $months = collect(range(0, 5))->map(function ($i) {
                return Carbon::now()->subMonths($i)->format('Y-m');
            })->sort();

            $monthlyTrends = [];

            foreach ($months as $month) {
                $income = 0;
                $expense = 0;

                if (isset($rawData[$month])) {
                    $income = $rawData[$month]->firstWhere('type', 'income')->total ?? 0;
                    $expense = $rawData[$month]->firstWhere('type', 'expense')->total ?? 0;
                }

                $monthlyTrends[] = [
                    'month' => ucfirst(Carbon::createFromFormat('Y-m', $month)->translatedFormat('F')),
                    'income' => (float) $income,
                    'expense' => (float) $expense,
                ];

            }

            return response()->json([
                'success' => true,
                'message' => 'Dados financeiros carregados com sucesso.',
                'data' => $monthlyTrends
            ]);
        } catch (Exception $e) {
            session()->flash('error', 'Erro ao carregar os dados financeiros.');

            return response()->json([
                'success' => false,
                'message' => 'Erro ao carregar os dados financeiros.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function expensesByCategory()
    {
        try {
            $user = Auth::user();

            $month = date('m');
            $year = date('Y'); 

            $expenses = $user->transactions()
                ->selectRaw("category_id, SUM(amount) as total")
                ->where('type', 'expense')
                ->whereYear('date', $year)
                ->whereMonth('date', $month)
                ->groupBy('category_id')
                ->with('category:id,name,color')
                ->get()
                ->map(function ($item) {
                    return [
                        'name' => $item->category->name,
                        'fill' => $item->category->color,
                        'value' => (float) $item->total,
                    ];
                });

            return response()->json([
                'success' => true,
                'message' => 'Despesas por categoria carregadas com sucesso.',
                'data' => $expenses,
            ]);
        } catch (\Exception $e) {
            session()->flash('error', 'Erro ao buscar despesas por categoria.');

            return response()->json([
                'success' => false,
                'message' => 'Erro ao buscar despesas por categoria.',
            ], 500);
        }
    }

    public function calculateSummary()
    {
        try {
            $user = Auth::user();
            $now = Carbon::now();

            $income = $user->transactions()
                ->where('type', 'income')
                ->sum('amount');

            $expense = $user->transactions()
                ->where('type', 'expense')
                ->sum('amount');

            $balance = $income - $expense;
            $savingsPercent = $income > 0 ? ($balance / $income) * 100 : 0;

            return response()->json([
                'success' => true,
                'message' => 'Resumo financeiro carregado com sucesso.',
                'data' => [
                    'income' => $income,
                    'expense' => $expense,
                    'balance' => $balance,
                    'savings_percent' => round($savingsPercent, 2),
                ],
            ]);
        } catch (\Exception $e) {
            session()->flash('error', 'Erro ao gerar resumo financeiro.');

            return response()->json([
                'success' => false,
                'message' => 'Erro ao gerar resumo financeiro.',
            ], 500);
        }
    }

    public function latestTransactions()
    {
        try {
            $user = Auth::user();

            $transactions = $user->transactions()
                ->with('category:id,name,icon') 
                ->orderBy('date', 'desc')
                ->orderBy('id', 'desc')
                ->get()
                ->map(function ($t) {
                    return [
                        'id' => (string) $t->id,
                        'description' => $t->description,
                        'amount' => (float) $t->amount,
                        'category' => [
                            'name' => $t->category->name,
                            'icon' => $t->category->icon, 
                        ],
                        'date' => Carbon::parse($t->date)->toDateString(),
                        'type' => $t->type,
                    ];
                });

            $income = $user->transactions()
                ->where('type', 'income')
                ->sum('amount');

            $expense = $user->transactions()
                ->where('type', 'expense')
                ->sum('amount');

            $balance = $income - $expense;

            return response()->json([
                'success' => true,
                'message' => 'Últimas transações carregadas com sucesso.',
                'data' => [
                    'transactions' => $transactions,
                    'balance' => $balance,
                ],
            ]);
        } catch (\Exception $e) {
            session()->flash('error', 'Erro ao gerar resumo financeiro.');

            return response()->json([
                'success' => false,
                'message' => 'Erro ao buscar transações recentes.',
            ], 500);
        }
    }

}
