<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('access_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->onDelete('cascade');

            // Definiamo la relazione polimorfica
            $table->morphs('loggable');
            $table->timestamps();

            $table->unique(['user_id', 'loggable_id', 'loggable_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('access_logs');
    }
};
