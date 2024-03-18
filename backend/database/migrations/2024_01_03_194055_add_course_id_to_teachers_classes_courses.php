<?php

use App\Models\Course;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('teachers_classes_courses', function (Blueprint $table) {
            $table->unsignedBigInteger('course_id')->nullable()->after('teacher_id');
            $table->foreign('course_id')->references('id')->on('courses')->nullOnDelete();
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('teachers_classes_courses', function (Blueprint $table) {
            //
        });
    }
};
