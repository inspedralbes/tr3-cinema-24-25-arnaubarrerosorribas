<?php
    namespace App\Http\Controllers;

    use App\Models\EntradasCompradas;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;

    class EntradasCompradasController extends Controller {
        public function PeliculasOcupadasPelicula($id) {
            $butacas = EntradasCompradas::where('pelicula_id', $id)
                ->get()
                ->map(function ($butacas) {
                    return [
                        "fila" => $butacas->fila,
                        "columna" => $butacas->columna,
                    ];
                });
            return response()->json($butacas);
        }

        public function fer_compra(Request $request) {
            // GET NAME & EMAIL CLIENT
            
            // Fer bucle perquè hi han més d'una fila y butaca per usuari
            foreach ($request->butacas as $butaca){
                EntradasCompradas::create([
                    'pelicula_id' => $request->pelicula,
                    'cliente_id' => $request->idUser,
                    'fila' => $butaca['fila'],
                    'columna' => $butaca['columna'],
                ]);
            }

            // SEND ON HIS EMAIL THE TICKETS

            return response()->json([
                'Missatge' => 'Pel·licula creada correctament.',
            ], 201);
        }
    }