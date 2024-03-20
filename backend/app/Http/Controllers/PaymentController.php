<?php

namespace App\Http\Controllers;

use Dompdf\Dompdf;
use App\Models\Payment;
use App\Mail\ReceiptEmail;
use App\Models\Student;
use App\Models\StudentParent;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class PaymentController extends Controller
{

    public function generateAndSaveReceipt($payment)
    {
        // Save PDF receipt in storage
        $fileName = 'receipt_' . $payment->id . '.pdf';

        // Generate PDF receipt
        $pdf = new Dompdf();
        $pdf->loadHtml(view('templates.payment', ['payment' => $payment])->render());
        $pdf->setPaper('A4', 'portrait');
        $pdf->render();

        Storage::disk("public")->put('receipts/' . $fileName, $pdf->output());

        return $fileName;
    }

    public function sendReceiptEmail($payment, $email)
    {
        // Send email with receipt attachment
        Mail::to($email)->send(new ReceiptEmail($payment));
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }
    public function getPaymentsBySchoolYear($schoolYearId)
    {
        // $request = request();
        $payments = Payment::with(['student', 'parent'])->where('school_year_id', $schoolYearId)->get();
        return response()->json($payments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'method' => 'required',
            'student_id' => 'required|exists:students,id',
        ]);

        $student = Student::find($request->student_id);
        $studentParent = StudentParent::find($student->student_parent_id);
        // if ($student->paymentStatus()['status']) {
        //     return response()->json([
        //         'message' => 'not access'
        //     ]);
        // }

        $payment = new Payment();
        $payment->amount = $student->monthlyFee->amount;
        $payment->method = $request->method;
        $payment->payment_date = Carbon::now()->format('Y-m-d');
        $payment->description = $request->description;
        $payment->month = Carbon::now()->format('Y-m') . Carbon::parse($student->created_at)->format('-d');;
        $payment->status = true;
        $payment->school_year_id = getCurrentSchoolYearFromDataBase()->id;
        $payment->student_parent_id = $student->student_parent_id;
        $payment->student_id = $request->student_id;
        $payment->receipt = "";
        $payment->save();

        $payment->receipt = $this->generateAndSaveReceipt($payment);
        $payment->save();

        Mail::to($studentParent->email)->send(new ReceiptEmail($payment));
        // $this->sendReceiptEmail($payment, StudentParent::find($student->student_parent_id)->email);

        return response()->json([
            'message' => 'paid succes'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
