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
        Schema::create('school_years', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('year'); // 2022-2023
            $table->date('start_date')->nullable(); // Start date of the school year
            $table->date('end_date')->nullable(); // End date of the school year
            // $table->boolean('is_current')->default(false); // Indicates if it's the current school year
            // $table->boolean('is_active')->default(true); // Indicates if the school year is active
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_years');
    }
};
