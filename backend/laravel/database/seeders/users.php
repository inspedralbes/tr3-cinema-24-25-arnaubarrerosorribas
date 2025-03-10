<?php
    namespace Database\Seeders;
    use Illuminate\Database\Console\Seeds\WithoutModelEvents;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Database\Seeder;
    use App\Models\User;

    class users extends Seeder {
        public function run(): void {
            $users = [
                [   "name" => "Arnau",  
                    "apellidos" => "Barrero Sorribas",  
                    "email" => "arnau.baso@gmail.com",    
                    "email_verified_at" => now(),
                    "password" => Hash::make('Arnau_2004'),
                ],
            ];
            user::insert($users);
        }
    }