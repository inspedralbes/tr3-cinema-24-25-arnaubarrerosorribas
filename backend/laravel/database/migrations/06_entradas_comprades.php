<?php
    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration {
        public function up(): void {
            Schema::create('entradas_compradas', function (Blueprint $table) {
                $table->id();
                $table->integer("id_compra_conjunta");
                
                $table->unsignedBigInteger("pelicula_id");
                $table->foreign("pelicula_id")->references('id')->on("peliculas")->onDelete("cascade");

                $table->unsignedBigInteger("cliente_id");
                $table->foreign("cliente_id")->references('id')->on("users")->onDelete("cascade");

                $table->integer("fila");
                $table->integer("columna");
                $table->integer("preuTotal");
                $table->timestamp("updated_at")->nullable();
                $table->timestamp("created_at")->nullable();
            });

        }

        public function down(): void {
            Schema::dropIfExists('entradas_compradas');
        }
    };