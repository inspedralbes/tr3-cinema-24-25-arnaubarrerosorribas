<?php
    namespace App\Http\Controllers;

    use App\Models\User;
    use Illuminate\Http\Request;
    use App\Models\EntradasCompradas;
    use Illuminate\Support\Facades\Log;
    use App\Http\Controllers\Controller;
    use Illuminate\Support\Facades\Mail;

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
            Log::info($request->idUser);

            $email_cliente = User::select('email')
                ->where('id', $request->idUser)
                ->first();

            $butacasOcupadas = EntradasCompradas::where('pelicula_id', $request->pelicula)
                ->whereIn('fila', array_column($request->butacas, 'fila'))
                ->whereIn('columna', array_column($request->butacas, 'columna'))
                ->exists();
        
            if ($butacasOcupadas) {
                return response()->json(['error' => 'Una o más butacas ya están reservadas.'], 400);
            }
        
            $ultimoIdCompra = EntradasCompradas::max('id_compra_conjunta') ?? 0;
            $nuevoIdCompra = $ultimoIdCompra + 1;
        
            foreach ($request->butacas as $butaca) {
                EntradasCompradas::create([
                    'id_compra_conjunta' => $nuevoIdCompra,
                    'pelicula_id' => $request->pelicula,
                    'cliente_id' => $request->idUser,
                    'preuTotal' => $request->preuTotal,
                    'fila' => $butaca['fila'],
                    'columna' => $butaca['columna'],
                ]);
            }
        
            Mail::send('tickets.ticket', [], function ($message) use ($email_cliente) {
                $message->to($email_cliente->email)
                    ->subject('Ticket | Cines Pedralbes');
            });
        
            return response()->json($email_cliente, 201);
        }
    }