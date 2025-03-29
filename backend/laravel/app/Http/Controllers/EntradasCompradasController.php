<?php

namespace App\Http\Controllers;

use Dompdf\Dompdf;
use Dompdf\Options;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\EntradasCompradas;
use Spatie\LaravelPdf\Facades\Pdf;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class EntradasCompradasController extends Controller
{
    public function PeliculasOcupadasPelicula($id)
    {
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

    public function fer_compra(Request $request)
    {
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
        $preuTotal = $request->preuTotal;

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

        // Generar contenido PDF
        $pdfContent = view('tickets.pdf', [
            'butacas' => $request->butacas,
        ])->render();

        // Configurar dompdf
        $options = new Options();
        $options->set('defaultFont', 'Arial');
        $dompdf = new Dompdf($options);
        $dompdf->loadHtml($pdfContent);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        $ticketPath = public_path('tickets');
        if (!file_exists($ticketPath)) {
            mkdir($ticketPath, 0777, true);
        }

        $pdfFilePath = public_path("tickets/ticket_$nuevoIdCompra.pdf");
        file_put_contents($pdfFilePath, $dompdf->output());

        Mail::send('tickets.ticket', ['preuTotal' => $preuTotal], function ($message) use ($email_cliente, $pdfFilePath) {
            $message->to($email_cliente->email)
                ->subject('Ticket | Cines Pedralbes')
                ->attach($pdfFilePath, [
                    'as' => 'ticket.pdf',
                    'mime' => 'application/pdf',
                ]);
        });

        unlink($pdfFilePath);
        return response()->json($request, 201);
    }


    public function recaudacio()
    {
        $peliculas = EntradasCompradas::join('peliculas', 'entradas_compradas.pelicula_id', '=', 'peliculas.id')
            ->select('peliculas.id as id_pelicula', 'peliculas.nombre_pelicula as nom_pelicula')
            ->selectRaw('COUNT(*) as total_butacas_compradas')
            ->groupBy('peliculas.id', 'peliculas.nombre_pelicula')
            ->get();

        return response()->json($peliculas);
    }
}
