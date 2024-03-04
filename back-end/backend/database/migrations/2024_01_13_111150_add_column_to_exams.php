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
            $table->time('duration')->after('type');
            $table->string('image')->after('id')->nullable();
            $table->float('maximum_marks')->nullable()->after('type');
            $table->enum('passing_marks', [5, 10])->default(10)->after('type');
            $table->unsignedBigInteger('semester_id')->after('teacher_id')->nullable();
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
