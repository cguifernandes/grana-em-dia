<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FinancesController extends Controller
{
    public function getMonthlyTrends()
    {
        $user = Auth::user();

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

        $result = [];

       foreach ($months as $month) {
            $income = 0;
            $expense = 0;

            if (isset($rawData[$month])) {
                $income = $rawData[$month]->firstWhere('type', 'income')->total ?? 0;
                $expense = $rawData[$month]->firstWhere('type', 'expense')->total ?? 0;
            }

            $monthlyTrends[] = [
                'month' => \Carbon\Carbon::createFromFormat('Y-m', $month)->translatedFormat('F'),
                'income' => (float) $income,
                'expense' => (float) $expense,
            ];
        }

        return response()->json($result);
    }
}
