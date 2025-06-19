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

            $driver = DB::getDriverName();

            $startDate = Carbon::now()->subMonths(5)->startOfMonth();

            $dateFormat = $driver === 'pgsql'
                ? "TO_CHAR(date, 'YYYY-MM')"  
                : "DATE_FORMAT(date, '%Y-%m')";

            $rawData = $user->transactions()
                ->selectRaw("$dateFormat as month, type, SUM(amount) as total")
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

            $totalExpense = $user->transactions()
                ->where('type', 'expense')
                ->whereYear('date', $year)
                ->whereMonth('date', $month)
                ->sum('amount');

            $expenses = $user->transactions()
                ->selectRaw("category_id, SUM(amount) as total")
                ->where('type', 'expense')
                ->whereYear('date', $year)
                ->whereMonth('date', $month)
                ->groupBy('category_id')
                ->with('category:id,name,color')
                ->get()
                ->map(function ($item) use ($totalExpense) {
                    return [
                        'name' => $item->category->name,
                        'fill' => $item->category->color,
                        'value' => (float) $item->total,
                        'percentage' => $totalExpense > 0 ? round(($item->total / $totalExpense) * 100, 2) : 0,
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

    public function reportsMonthlyAnalysis(Request $request)
    {
        try {
            $user = Auth::user();

            $month = $request->query('month');
            $year = $request->query('year');

            if (!$month || !$year || $month < 1 || $month > 12 || $year < 1900) {
                return response()->json([
                    'success' => false,
                    'message' => "Parâmetros 'month' e 'year' são obrigatórios e devem ser válidos."
                ], 400);
            }

            Carbon::setLocale('pt_BR');

            $previousMonthDate = Carbon::createFromDate($year, $month, 1)->subMonth();
            $prevMonth = $previousMonthDate->month;
            $prevYear = $previousMonthDate->year;
            $currentMonthName = Carbon::createFromDate($year, $month)->translatedFormat('F');
            $previousMonthName = Carbon::createFromDate($year, $month)->subMonth()->translatedFormat('F');

            $monthlyExpense = $user->transactions()
                ->where('type', 'expense')
                ->whereMonth('date', $month)
                ->whereYear('date', $year)
                ->sum('amount');

            $monthlyIncome = $user->transactions()
                ->where('type', 'income')
                ->whereMonth('date', $month)
                ->whereYear('date', $year)
                ->sum('amount');
                
            $totalExpense = $user->transactions()
                ->where('type', 'expense')
                ->sum('amount');

            $totalIncome = $user->transactions()
                ->where('type', 'income')
                ->sum('amount');

            $topCategory = $user->transactions()
                ->selectRaw('category_id, SUM(amount) as total')
                ->where('type', 'expense')
                ->whereMonth('date', $month)
                ->whereYear('date', $year)
                ->groupBy('category_id')
                ->orderByDesc('total')
                ->with('category:id,name,icon,color') 
                ->first();

            $categoryComparison = $user->transactions()
                ->selectRaw('category_id, type, SUM(amount) as total')
                ->whereMonth('date', $month)
                ->whereYear('date', $year)
                ->groupBy('category_id', 'type')
                ->with('category:id,name')
                ->get()
                ->groupBy('category_id')
                ->map(function ($items) {
                    $category = $items->first()->category;

                    return [
                        'category' => $category->name,
                        'income' => (float) ($items->firstWhere('type', 'income')->total ?? 0),
                        'expense' => (float) ($items->firstWhere('type', 'expense')->total ?? 0),
                    ];
                })
                ->values();

            $currentData = $user->transactions()
                ->selectRaw('category_id, type, SUM(amount) as total')
                ->whereMonth('date', $month)
                ->whereYear('date', $year)
                ->groupBy('category_id', 'type')
                ->with('category:id,name')
                ->get()
                ->groupBy('category_id');

            $previousData = $user->transactions()
                ->selectRaw('category_id, type, SUM(amount) as total')
                ->whereMonth('date', $prevMonth)
                ->whereYear('date', $prevYear)
                ->groupBy('category_id', 'type')
                ->with('category:id,name')
                ->get()
                ->groupBy('category_id');

            $allCategoryIds = $currentData->keys()->merge($previousData->keys())->unique();

            $categoryMonthlyComparison = $allCategoryIds->map(function ($categoryId) use ($currentData, $previousData, $currentMonthName, $previousMonthName) {
                $current = $currentData->get($categoryId);
                $previous = $previousData->get($categoryId);

                $category = $current?->first()->category ?? $previous?->first()->category;

                return [
                    'category' => $category?->name,
                    'previous_month' => [
                        'month' => strtolower($previousMonthName),
                        'income' => (float) ($previous?->firstWhere('type', 'income')?->total ?? 0),
                        'expense' => (float) ($previous?->firstWhere('type', 'expense')?->total ?? 0),
                    ],
                    'current_month' => [
                        'month' => strtolower($currentMonthName),
                        'income' => (float) ($current?->firstWhere('type', 'income')?->total ?? 0),
                        'expense' => (float) ($current?->firstWhere('type', 'expense')?->total ?? 0),
                    ],
                ];
            });

            $saving = $monthlyIncome - $monthlyExpense;
            $balance = $totalIncome - $totalExpense;

            $expenseVariations = $allCategoryIds
                ->map(function ($categoryId) use ($currentData, $previousData) {
                    $current = $currentData->get($categoryId)?->firstWhere('type', 'expense');
                    $previous = $previousData->get($categoryId)?->firstWhere('type', 'expense');

                    $currentAmount = (float) ($current?->total ?? 0.0);
                    $previousAmount = (float) ($previous?->total ?? 0.0);

                    if ($previousAmount === 0.0) {
                        return null;
                    }

                    $difference = $currentAmount - $previousAmount;
                    $category = $current?->category ?? $previous?->category;

                    if (!$category?->name) {
                        return null;
                    }

                    return [
                        'category' => $category->name,
                        'current' => round($currentAmount, 2),
                        'previous' => round($previousAmount, 2),
                        'difference' => round($difference, 2),
                        'positive' => $difference <= 0,
                    ];
                })
                ->filter() 
                ->values();

            return response()->json([
                'success' => true,
                'message' => 'Relatório mensal carregado com sucesso.',
                'data' => [
                    'total_expense' => round($monthlyExpense, 2),
                    'top_category' => $topCategory ? [
                        'name' => $topCategory->category->name,
                        'icon' => $topCategory->category->icon,
                        'color' => $topCategory->category->color,
                        'value' => round($topCategory->total, 2),
                    ] : null,
                    'saving' => round($saving, 2),
                    'balance' => round($balance, 2),
                    'category_comparison' => $categoryComparison,
                    'category_monthly_comparison' => $categoryMonthlyComparison->values(),
                    'expense_variation_by_category'=> $expenseVariations->isEmpty() ? null : $expenseVariations,
                ],
            ]);
        } catch (\Exception $e) {
            \Log::error('Erro ao buscar relatório mensal: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erro ao buscar relatório mensal.',
            ], 500);
        }
    }

    public function reportsCategories(Request $request)
    {
        try {
            $user = Auth::user();

            $month = $request->query('month');
            $year = $request->query('year');

            if (!$month || !$year || $month < 1 || $month > 12 || $year < 1900) {
                return response()->json([
                    'success' => false,
                    'message' => "Parâmetros 'month' e 'year' são obrigatórios e devem ser válidos."
                ], 400);
            }

            Carbon::setLocale('pt_BR');

            $dates = collect();
            for ($i = 2; $i >= 0; $i--) {
                $date = Carbon::createFromDate($year, $month, 1)->subMonths($i);
                $dates->push(['month' => $date->month, 'year' => $date->year]);
            }

            $totalExpense = $user->transactions()
                ->where('type', 'expense')
                ->whereYear('date', $year)
                ->whereMonth('date', $month)
                ->sum('amount');

            $categories = $user->transactions()
                ->selectRaw("category_id, SUM(amount) as total")
                ->where('type', 'expense')
                ->whereYear('date', $year)
                ->whereMonth('date', $month)
                ->groupBy('category_id')
                ->with('category:id,name,color')
                ->get()
                ->map(function ($item) use ($totalExpense) {
                    return [
                        'name' => $item->category->name,
                        'fill' => $item->category->color,
                        'value' => (float) $item->total,
                        'percentage' => $totalExpense > 0 ? round(($item->total / $totalExpense) * 100, 2) : 0,
                    ];
                });

            $transactionsThreeMonths = $user->transactions()
                ->selectRaw("category_id, MONTH(date) as month, YEAR(date) as year, SUM(amount) as total")
                ->where('type', 'expense')
                ->where(function ($query) use ($dates) {
                    foreach ($dates as $date) {
                        $query->orWhere(function ($q) use ($date) {
                            $q->whereMonth('date', $date['month'])
                            ->whereYear('date', $date['year']);
                        });
                    }
                })
                ->groupBy('category_id', 'month', 'year')
                ->with('category:id,name,color')
                ->get();

            $trends = $transactionsThreeMonths->groupBy('category_id')->map(function ($items) use ($dates) {
                $first = $items->first();
                $category = $first->category;

                $values = $dates->map(function ($date) use ($items) {
                    $match = $items->firstWhere(fn ($item) =>
                        (int)$item->month === $date['month'] && (int)$item->year === $date['year']
                    );
                    return (float) ($match->total ?? 0);
                });

                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'color' => $category->color,
                    'values' => $values->toArray(),
                ];
            })->values();

            return response()->json([
                'success' => true,
                'message' => 'Relatório de categorias carregado com sucesso.',
                'data' => [
                    'categories' => $categories,
                    'trends' => $trends
                ],
            ]);
        } catch (\Exception $e) {
            \Log::error('Erro ao buscar relatório de categorias: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erro ao carregar relatório de categorias.',
            ], 500);
        }
    }

}
