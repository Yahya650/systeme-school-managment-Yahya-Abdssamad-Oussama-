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


    protected $appends = ['role', 'paymentStatus'];

    protected $with = ['classe', 'parent', 'reports.admin', 'absences.course', 'absences.teacher', 'payments'];

    public function getRoleAttribute()
    {
        return 'student';
    }

    public function getPaymentStatusAttribute()
    {
        return $this->paymentStatus();
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

        $paymentsForSchoolYear = $this->payments()->where('school_year_id', $schoolYearId);

        if ($paymentsForSchoolYear->count() == 0) {
            return [
                'status' => false,
                'months_not_paid' => 1,
                'amount_due' => $this->monthlyFees()->where('student_id', $this->id)->where('school_year_id', $schoolYearId)->latest()->first()->amount
            ];
        }

        $lastPayment = $paymentsForSchoolYear->latest()->first();
        $lastPaymentDate = $lastPayment->created_at;
        $lastPaymentMonth = $lastPayment->month;

        $currentDate = Carbon::now();
        $totalAmountPaid = $paymentsForSchoolYear->sum('amount');
        $totalMonthsPaid = $paymentsForSchoolYear->count();
        $monthlyFee = $this->monthlyFees()->where('student_id', $this->id)->where('school_year_id', $schoolYearId)->latest()->first()->amount;
        $monthsNotPaid = max(0, $currentDate->diffInMonths(Carbon::parse($lastPaymentMonth)));
        $amountStillDue = $monthsNotPaid * $monthlyFee;

        return [
            'status' => $monthsNotPaid == 0,
            'months_not_paid' => $monthsNotPaid,
            'amount_due' => $amountStillDue,
            'amount_paid' => $totalMonthsPaid,
            'total_money_paid' => $totalAmountPaid,
            'lastPaymentDate' => $lastPaymentDate,
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
