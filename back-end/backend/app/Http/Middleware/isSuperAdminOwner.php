<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use App\Models\Teacher;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class isSuperAdminOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $guard)
    {
        if ($guard === 'admin') {
            $admin = Admin::find($request->route('admin'));
            if ($admin && $admin->super_admin_id !== $request->user()->id) {
                return response()->json(['message' => 'Unauthorized.'], 401);
            }
            return $next($request);
        } elseif ($guard === 'teacher') {
            $teacher = Teacher::find($request->route('teacher'));
            if ($teacher && $teacher->super_admin_id !== $request->user()->id) {
                return response()->json(['message' => 'Unauthorized.'], 401);
            }
            return $next($request);
        }
    }
}
