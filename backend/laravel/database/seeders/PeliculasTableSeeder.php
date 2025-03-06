<?php
    namespace Database\Seeders;
    use App\Models\peliculas;
    use App\Models\User;
    use Illuminate\Database\Console\Seeds\WithoutModelEvents;
    use Illuminate\Database\Seeder;

    class PeliculasTableSeeder extends Seeder {
        public function run(): void {
            $peliculas = [
                ["nombre_pelicula" => "El Lobo de Wall Street", "disponible" => true,   "categoria_id" => 1],
                ["nombre_pelicula" => "American Psico",         "disponible" => false,  "categoria_id" => 2],
                ["nombre_pelicula" => "Baby Driver",            "disponible" => true,   "categoria_id" => 3],
                ["nombre_pelicula" => "El correo",              "disponible" => true,   "categoria_id" => 3],
            ];

            peliculas::insert($peliculas);
        }
    }