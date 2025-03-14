<?php
    namespace App\Http\Controllers;
    use App\Models\User;
    use Illuminate\Http\Request;
    use App\Models\EntradasCompradas;
    use App\Http\Controllers\Controller;

    class UserController extends Controller {
        public function index(Request $request) {
            $user = $request->user();

            if (!$user) {
                return response()->json(['error' => 'Usuario no autenticado'], 401);
            }

            $entradas = EntradasCompradas::where('cliente_id', $user->id)
                ->with('pelicula')
                ->get();

            $response = $entradas->groupBy('id_compra_conjunta')->map(function ($entradasConjuntas) {
                if ($entradasConjuntas->first()->id_compra_conjunta === null) {
                    return null;
                }

                return [
                    'id_compra_conjunta' => $entradasConjuntas->first()->id_compra_conjunta,
                    'pelicula' => $entradasConjuntas->first()->pelicula->nombre_pelicula ?? 'Película no disponible',
                    'butacas' => $entradasConjuntas->map(function ($entrada) {
                        return [
                            'fila' => $entrada->fila,
                            'columna' => $entrada->columna,
                        ];
                    })->values(),
                ];
            })->filter();

            return response()->json($response);
        }

        public function esAdmin(Request $request) {
            $user = $request->user();
        
            if ($user->isAdmin == 1) {
                return response()->json(true);
            } else {
                return response()->json(false);
            }
        }
    }