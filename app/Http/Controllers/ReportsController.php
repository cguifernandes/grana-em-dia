<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\FinancesController;

class ReportsController extends Controller
{
    public function index()
    {
        return Inertia::render('reports');
    }
}
