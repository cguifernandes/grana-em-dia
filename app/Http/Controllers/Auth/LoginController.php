<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class LoginController extends Controller
{
    public function index()
    {
        return Inertia::render('auth/login');
    }
}
