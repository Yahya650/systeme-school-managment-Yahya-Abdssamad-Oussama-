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
        Schema::create('exam_records', function (Blueprint $table) {
            $table->id();
            $table->float('note');
            $table->text('comment');

            $table->unsignedBigInteger('student_id');
            $table->foreign('student_id')->references('id')->on('students')->cascadeOnDelete();

            $table->unsignedBigInteger('exam_id');
            $table->foreign('exam_id')->references('id')->on('exams');

            $table->unsignedBigInteger('admin_id');
            $table->foreign('admin_id')->references('id')->on('admins');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_records');
    }
};
