<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('monthly_fees', function (Blueprint $table) {
            $table->id();
            $table->float('amount');

            $table->unsignedBigInteger('student_id');
            $table->foreign('student_id')->references('id')->on('students')->cascadeOnDelete();

            $table->unsignedBigInteger('school_year_id');
            $table->foreign('school_year_id')->references('id')->on('school_years')->cascadeOnDelete();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monthly_fees');
    }
};
