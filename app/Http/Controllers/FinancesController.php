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
            return response()->json([
                'success' => false,
                'message' => 'Erro ao carregar os dados financeiros.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function expensesByCategory(Request $request)
    {
        try {
            $user = Auth::user();

            $month = $request->query('month');
            $year = date('Y');

            if (!$month || $month < 1 || $month > 12) {
                return response()->json([
                    'success' => false,
                    'message' => "Parâmetro 'month' inválido ou ausente. Use valores de 1 a 12."
                ], 400);
            }

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
            Log::error('Erro ao buscar despesas por categoria: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erro ao buscar despesas por categoria.',
            ], 500);
        }
    }

}
