<?php
    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;

    class EntradasCompradas extends Model {
        protected $fillable = [
            'id_compra_conjunta',
            'pelicula_id',
            'cliente_id',
            'fila',
            'columna',
            'preuTotal',
        ];

        public function cliente(){
            return $this -> hasOne(user::class, 'cliente_id');
        }

        public function pelicula(){
            return $this -> belongsTo(peliculas::class, 'pelicula_id');
        }
    }