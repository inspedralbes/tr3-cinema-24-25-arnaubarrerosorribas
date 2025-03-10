<?php
    namespace Database\Seeders;

    use Illuminate\Database\Console\Seeds\WithoutModelEvents;
    use App\Models\EntradasCompradas;
    use Illuminate\Database\Seeder;

    class EntradasCompradasTableSeeder extends Seeder {
        public function run(): void {
            $entradas = [
                ["pelicula_id" => 1, "cliente_id" => 1, "fila" => 3, "columna" => 4],
                ["pelicula_id" => 1, "cliente_id" => 1, "fila" => 3, "columna" => 5],
            ];
            EntradasCompradas::insert($entradas);
        }
    }