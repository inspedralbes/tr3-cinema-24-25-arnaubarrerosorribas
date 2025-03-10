<?php
    namespace App\Http\Controllers;
    use App\Models\EntradasCompradas;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;

    class EntradasCompradasController extends Controller {
        public function PeliculasOcupadasPelicula($id) {
            $butacas = EntradasCompradas::where('pelicula_id', $id)
                                        ->get()
                                        ->map(function($butacas){
                                            return[
                                                "fila"=>$butacas->fila,
                                                "columna"=>$butacas->columna,
                                            ];
                                        });
            return response()->json($butacas);
        }
    }