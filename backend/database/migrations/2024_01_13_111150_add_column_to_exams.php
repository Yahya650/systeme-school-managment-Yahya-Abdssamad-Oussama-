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
        Schema::table('exams', function (Blueprint $table) {
            $table->string('name')->nullable()->change();
            $table->string('image')->after('id')->nullable();
            $table->float('maximum_marks')->after('course_id')->nullable();
            $table->unsignedBigInteger('semester_id')->after('course_id')->nullable();
            $table->foreign('semester_id')->references('id')->on('semesters')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exams', function (Blueprint $table) {
            $table->dropColumn('duration');
            $table->dropColumn('maximum_marks');
            $table->dropColumn('passing_marks');
        });
    }
};
