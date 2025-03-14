<?php
    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;

    class peliculas extends Model {
        protected $fillable = [
            'nombre_pelicula',
            'disponible',
            'categoria_id',
            'imagen',
            'descripcion',
            'data',
        ];

        public function categoria(){
            return $this -> belongsTo(categories::class, 'categoria_id');
        }

        public function entradasCompradas() {
            return $this -> hasMany(EntradasCompradas::class, 'pelicula_id');
        }
    }