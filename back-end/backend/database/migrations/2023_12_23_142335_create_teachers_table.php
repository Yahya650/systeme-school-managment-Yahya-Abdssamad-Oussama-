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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('profile_picture')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->enum('gender', ['male', 'female']);
            $table->string('email')->unique();
            $table->string('cin')->unique();
            $table->string('password');
            $table->enum('health_status', ['good', 'bad', 'middle'])->nullable();
            $table->date('date_of_birth');
            $table->enum('blood_type', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])->nullable();
            $table->string('phone_number')->unique();
            $table->string('address')->nullable();
            $table->date('last_login_date')->nullable();
            $table->rememberToken();
            $table->timestamp('email_verified_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
