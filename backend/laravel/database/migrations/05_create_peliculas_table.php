<?php
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration {
        public function up(): void {
            Schema::create('peliculas', function (Blueprint $table) {
                $table->id();
                $table->string("nombre_pelicula");
                $table->boolean("disponible");

                $table->unsignedBigInteger("categoria_id");
                $table->foreign("categoria_id")->references('id')->on("categories")->onDelete("cascade");

                $table->string("imagen")->nullable();
                $table->string("descripcion", 1000);
                $table->timestamps();
            });
        }

        public function down(): void {
            Schema::dropIfExists('peliculas');
        }
    };