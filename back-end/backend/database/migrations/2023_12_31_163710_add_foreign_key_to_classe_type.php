<?php

use App\Models\SchoolLevel;
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
        Schema::table('classe_types', function (Blueprint $table) {
            $table->unsignedBigInteger('school_level_id')->after('code');
            $table->foreign('school_level_id')->references('id')->on('school_levels')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('classe_types', function (Blueprint $table) {
            //
        });
    }
};
