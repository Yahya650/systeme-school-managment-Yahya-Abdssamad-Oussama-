<?php

namespace App\Models;

use App\Models\Admin;
use App\Models\Classe;
use App\Models\Report;
use App\Models\Absence;
use App\Models\Payment;
use App\Models\ExamRecord;
use App\Models\StudentParent;
use Carbon\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Student extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;


    protected $appends = ['role', 'paymentStatus', 'monthlyFee'];

    protected $with = ['classe', 'parent', 'reports.admin', 'absences.course', 'absences.teacher', 'payments', 'monthlyFees'];

    public function getRoleAttribute()
    {
        return 'student';
    }

    public function getPaymentStatusAttribute()
    {
        return $this->paymentStatus();
    }

    public function getMonthlyFeeAttribute()
    {
        return $this->monthlyFees()->where('school_year_id', getCurrentSchoolYearFromDataBase()->id)->first();
    }

    protected $fillable = [
        'profile_picture',
        'first_name',
        'last_name',
        'gender',
        'email',
        'code_massar',
        'cin',
        'health_status',
        'date_of_birth',
        'blood_type',
        'phone_number',
        'address',
        'last_login_date',
        'status_pay',
        'class_id',
        'parent_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function paymentStatus($schoolYearId = null)
    {
        if (is_null($schoolYearId)) {
            $schoolYearId = getCurrentSchoolYearFromDataBase()->id;
        }

        $paymentsBySchoolYear = $this->payments()->where('school_year_id', $schoolYearId);

        if ($paymentsBySchoolYear->count() == 0) {
            return [
                'status' => false,
                'months_not_paid' => 1,
                'amount_due' => $this->monthlyFees()->where('school_year_id', $schoolYearId)->latest()->first()->amount
            ];
        }

        $lastPayment = $paymentsBySchoolYear->latest()->first();

        $monthlyFee = $this->monthlyFees()->where('school_year_id', $schoolYearId)->latest()->first()->amount;
        $monthsNotPaid = max(0, Carbon::now()->diffInMonths(Carbon::parse($lastPayment->month)));
        $amountStillDue = $monthsNotPaid * $monthlyFee;

        return [
            'status' => $monthsNotPaid == 0,
            'months_not_paid' => $monthsNotPaid,
            'amount_due' => $amountStillDue,
            'months_paid' => $paymentsBySchoolYear->count(),
            'total_money_paid' => $paymentsBySchoolYear->sum('amount'),
            'lastPaymentDate' => $lastPayment->created_at,
        ];
    }


    public function examRecords()
    {
        return $this->hasMany(ExamRecord::class);
    }

    public function monthlyFees()
    {
        return $this->hasMany(MonthlyFee::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    public function absences()
    {
        return $this->hasMany(Absence::class);
    }

    public function classe()
    {
        return $this->belongsTo(Classe::class, 'classe_id');
    }

    public function parent()
    {
        return $this->belongsTo(StudentParent::class, 'student_parent_id');
    }
}
