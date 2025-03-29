<?php
    namespace Database\Seeders;

    use Illuminate\Database\Console\Seeds\WithoutModelEvents;
    use Illuminate\Database\Seeder;
    use App\Models\categories;

    class CategoriasTableSeeder extends Seeder {
        public function run(): void {
            $categorias = [
                ["categoria" => "Conducció"],
                ["categoria" => "Acció"],
                ["categoria" => "Romantica"],
                ["categoria" => "Por"]
            ];
            categories::insert($categorias);
        }
    }