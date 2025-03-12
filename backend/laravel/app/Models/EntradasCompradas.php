<?php
    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;

    class EntradasCompradas extends Model {
        protected $fillable = [
            'pelicula_id',
            'cliente_id',
            'fila',
            'columna',
        ];

        public function cliente(){
            return $this -> hasOne(user::class, 'cliente_id');
        }

        public function pelicula(){
            return $this -> hasOne(peliculas::class, 'cliente_id');
        }
    }