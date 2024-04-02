<?php

namespace App\Models;

use Dompdf\Dompdf;
use Dompdf\Options;
use App\Models\Student;
use App\Models\StudentParent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory, SoftDeletes;


    protected $appends = ['parent', 'year'];

    protected $fillable = [
        'amount',
        'method',
        'payment_date',
        'description',
        'receipt',
    ];

    public function getParentAttribute()
    {
        return $this->parent()->first();
    }

    public function getYearAttribute()
    {
        return $this->year()->first();
    }


    public function generateReceipt()
    {
        // Create a new Dompdf instance
        $dompdf = new Dompdf();

        // Load HTML content for the receipt
        $html = view('templates.payment', ['payment' => $this])->render();

        // Set options for Dompdf
        $options = new Options();
        $options->set('isHtml5ParserEnabled', true);

        $dompdf->setOptions($options);

        // Load HTML into Dompdf
        $dompdf->loadHtml($html);

        // Render the PDF (optional: increase rendering time and quality)
        $dompdf->setPaper('A4', 'portrait');

        // Output the PDF as a string
        return $dompdf->output();
    }

    public function parent()
    {
        return $this->belongsTo(StudentParent::class, 'student_parent_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
    public function year()
    {
        return $this->belongsTo(SchoolYear::class, 'school_year_id');
    }
}
