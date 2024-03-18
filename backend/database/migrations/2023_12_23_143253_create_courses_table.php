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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('ceof1')->nullable();
            $table->integer('ceof2')->nullable();
            $table->integer('ceof_final1')->nullable();
            $table->integer('ceof_final2')->nullable();
            $table->unsignedBigInteger('classe_type_id');
            $table->foreign('classe_type_id')->references('id')->on('classe_types');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
