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

            $response = $entradas->map(function ($entrada) {
                return [
                    'pelicula' => $entrada->pelicula->nombre_pelicula,
                    'butaca' => [
                        'fila' => $entrada->fila,
                        'columna' => $entrada->columna,
                    ],
                ];
            });

            return response()->json($response);
        }
    }