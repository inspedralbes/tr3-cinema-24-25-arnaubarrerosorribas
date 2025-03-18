<?php
    namespace Database\Seeders;
    use App\Models\peliculas;
    use Illuminate\Database\Seeder;

    class PeliculasTableSeeder extends Seeder {
        public function run(): void {
            $peliculas = [
                ["nombre_pelicula" => "El Lobo de Wall Street",   "disponible" => true,     "categoria_id" => 1, "data" => today(), "descripcion" => "Basada en la vida real de Jordan Belfort, esta película dirigida por Martin Scorsese sigue la ascensión y caída de un corredor de bolsa en Wall Street, quien se enriquece a través del fraude y la corrupción, pero su estilo de vida decadente lo lleva a enfrentarse con la ley."],
                ["nombre_pelicula" => "American Psycho",          "disponible" => false,    "categoria_id" => 2, "data" => today(), "descripcion" => "Un thriller psicológico que sigue a Patrick Bateman, un ejecutivo de Wall Street obsesionado con el éxito, la imagen y el materialismo, mientras lucha con su oscura y violenta naturaleza psicópata en la Nueva York de los años 80."],
                ["nombre_pelicula" => "Baby Driver",              "disponible" => true,     "categoria_id" => 3, "data" => today(), "descripcion" => "Un joven conductor especializado en fugas, conocido como Baby, se ve obligado a trabajar para un jefe del crimen. Con una banda sonora electrizante y persecuciones llenas de adrenalina, Baby intenta escapar del mundo criminal para proteger a la mujer que ama."],
                ["nombre_pelicula" => "El correo",                "disponible" => true,     "categoria_id" => 1, "data" => today(), "descripcion" => "Dirigida por Clint Eastwood, esta película cuenta la historia real de un mensajero que transporta paquetes sospechosos y se ve envuelto en una red de crimen organizado."],
                ["nombre_pelicula" => "Interestelar",             "disponible" => true,     "categoria_id" => 2, "data" => today(), "descripcion" => "Una odisea espacial dirigida por Christopher Nolan que sigue a un grupo de astronautas en una misión para encontrar un nuevo hogar para la humanidad mientras enfrentan los misterios del tiempo y el espacio."],
                ["nombre_pelicula" => "Inception",                "disponible" => false,    "categoria_id" => 3, "data" => today(), "descripcion" => "Un ladrón que roba secretos a través de los sueños es contratado para implantar una idea en la mente de un empresario, en una película que desafía la percepción de la realidad."],
                ["nombre_pelicula" => "Gladiador",                "disponible" => true,     "categoria_id" => 1, "data" => today(), "descripcion" => "Un general romano traicionado busca venganza contra el corrupto emperador que mató a su familia y lo convirtió en un gladiador."],
                ["nombre_pelicula" => "Titanic",                  "disponible" => true,     "categoria_id" => 2, "data" => today(), "descripcion" => "Un épico romance trágico a bordo del famoso barco que se hundió en su viaje inaugural."],
                ["nombre_pelicula" => "Matrix",                   "disponible" => true,     "categoria_id" => 3, "data" => today(), "descripcion" => "Un hacker descubre la verdad detrás de su realidad y lidera la resistencia contra las máquinas en una guerra cibernética."],
                ["nombre_pelicula" => "Pulp Fiction",             "disponible" => false,    "categoria_id" => 1, "data" => today(), "descripcion" => "Un clásico de Tarantino que entrelaza múltiples historias del mundo criminal con diálogos icónicos y violencia estilizada."],
                ["nombre_pelicula" => "El Padrino",               "disponible" => true,     "categoria_id" => 2, "data" => today(), "descripcion" => "La historia de la familia Corleone y su lucha por el poder en el mundo de la mafia."],
                ["nombre_pelicula" => "El Caballero de la Noche", "disponible" => true,     "categoria_id" => 3, "data" => today(), "descripcion" => "Batman enfrenta al Joker en una lucha por el alma de Gotham en una de las mejores películas de superhéroes de la historia."]
            ];

            peliculas::insert($peliculas);
        }
    }