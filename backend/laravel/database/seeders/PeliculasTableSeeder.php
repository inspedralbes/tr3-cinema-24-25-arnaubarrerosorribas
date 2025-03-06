<?php
    namespace Database\Seeders;
    use App\Models\peliculas;
    use App\Models\User;
    use Illuminate\Database\Console\Seeds\WithoutModelEvents;
    use Illuminate\Database\Seeder;

    class PeliculasTableSeeder extends Seeder {
        public function run(): void {
            $peliculas = [
                [ "nombre_pelicula" => "El Lobo de Wall Street",  "disponible" => true,   "categoria_id" => 1,    "descripcion" => "Basada en la vida real de Jordan Belfort, esta película dirigida por Martin Scorsese sigue la ascensión y caída de un corredor de bolsa en Wall Street, quien se enriquece a través del fraude y la corrupción, pero su estilo de vida decadente lo lleva a enfrentarse con la ley." ],
                [ "nombre_pelicula" => "American Psico",          "disponible" => false,  "categoria_id" => 2,    "descripcion" => "Un thriller psicológico que sigue a Patrick Bateman, un ejecutivo de Wall Street obsesionado con el éxito, la imagen y el materialismo, mientras lucha con su oscura y violenta naturaleza psicópata en la Nueva York de los años 80." ],
                [ "nombre_pelicula" => "Baby Driver",             "disponible" => true,   "categoria_id" => 3,    "descripcion" => "Un joven conductor especializado en fugas, conocido como Baby, se ve obligado a trabajar para un jefe del crimen. Con una banda sonora electrizante y persecuciones llenas de adrenalina, Baby intenta escapar del mundo criminal para proteger a la mujer que ama." ],
                [ "nombre_pelicula" => "El correo",               "disponible" => true,   "categoria_id" => 3,    "descripcion" => "Dirigida por Clint Eastwood, esta película cuenta la historia real de Frances 'Frank' Abagnale Jr., un joven estafador que logró burlar al FBI durante años, asumiendo múltiples identidades y cometiendo fraudes millonarios, hasta que es perseguido por un agente obstinado." ],
            ];
            peliculas::insert($peliculas);
        }
    }