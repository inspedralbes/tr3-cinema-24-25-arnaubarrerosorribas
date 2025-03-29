<?php
    namespace Database\Seeders;
    use app\Models\peliculas;
    use app\Models\categories;
    use Illuminate\Database\Seeder;

    class DatabaseSeeder extends Seeder {
        public function run(): void {
            $this->call(users::class);
            $this->call(CategoriasTableSeeder::class);
            $this->call(PeliculasTableSeeder::class);
            $this->call(EntradasCompradasTableSeeder::class);
        }
    }