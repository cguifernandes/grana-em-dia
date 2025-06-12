<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Http\Controllers\FinancesController;

class HomeController extends Controller
{
    public function index()
    {
        $financesController = new FinancesController();
        
        $summary = $financesController->calculateSummary();
        $monthlyTrends = $financesController->trendsLastSixMonths();
        $categories = $financesController->expensesByCategory();
        $transactions = $financesController->latestTransactions();

        return Inertia::render('home', [
            'dashboard' => [
                'summary' => $summary->original,
                'trends' => $monthlyTrends->original,
                'categories' => $categories->original,
                'transactions' => $transactions->original
            ]
        ]);
    }
}