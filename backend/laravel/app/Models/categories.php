<?php
    namespace App\Models;
    use Illuminate\Database\Eloquent\Model;

    class categories extends Model {
        protected $fillable = [
            'categoria',
        ];

        public function peliculas(){
            return $this -> hasMany(peliculas::class, 'categoria');
        }
    }