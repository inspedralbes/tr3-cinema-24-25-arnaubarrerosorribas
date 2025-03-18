<?php
    namespace Database\Seeders;

    use Illuminate\Database\Console\Seeds\WithoutModelEvents;
    use App\Models\EntradasCompradas;
    use Illuminate\Database\Seeder;

    class EntradasCompradasTableSeeder extends Seeder {
        public function run(): void {
            $entradas = [
                ["id_compra_conjunta" => 1, "pelicula_id" => 1, "cliente_id" => 1, "fila" => 3, "columna" => 4, "preuTotal" => 13, "updated_at" => now(), "created_at" => now()],
                ["id_compra_conjunta" => 1, "pelicula_id" => 1, "cliente_id" => 1, "fila" => 3, "columna" => 5, "preuTotal" => 26, "updated_at" => now(), "created_at" => now()],
            ];
            EntradasCompradas::insert($entradas);
        }
    }