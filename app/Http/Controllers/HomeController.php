<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $now = Carbon::now();

        $income = $user->transactions()
            ->where('type', 'income')
            ->whereMonth('date', $now->month)
            ->whereYear('date', $now->year)
            ->sum('amount');

        $expense = $user->transactions()
            ->where('type', 'expense')
            ->whereMonth('date', $now->month)
            ->whereYear('date', $now->year)
            ->sum('amount');

        $balance = $income - $expense;

        $savingsPercent = $income > 0 ? ($balance / $income) * 100 : 0;

        return Inertia::render('home', [
            'finances' => [
                'balance' => $balance,
                'income' => $income,
                'expense' => $expense,
                'savings_percent' => round($savingsPercent, 2),
            ]
        ]);
    }
}