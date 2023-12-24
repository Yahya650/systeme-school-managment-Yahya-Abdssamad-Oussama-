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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('profile_picture')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->enum('gender', ['male', 'female']);
            $table->string('email')->unique()->nullable();
            $table->string('code_massar')->unique();
            $table->string('cin')->unique()->nullable();
            $table->string('password');
            $table->string('health_status')->nullable();
            $table->date('date_of_birth');
            $table->enum('blood_type', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])->nullable();
            $table->string('phone_number')->unique();
            $table->string('address')->nullable();
            $table->date('last_login_date')->nullable();
            $table->boolean('status_pay')->default(false);
            $table->rememberToken();

            $table->unsignedBigInteger('admin_id');
            $table->foreign('admin_id')->references('id')->on('admins');

            $table->unsignedBigInteger('classe_id');
            $table->foreign('classe_id')->references('id')->on('classes');

            $table->unsignedBigInteger('parent_id');
            $table->foreign('parent_id')->references('id')->on('student_parents');

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
        Schema::dropIfExists('students');
    }
};