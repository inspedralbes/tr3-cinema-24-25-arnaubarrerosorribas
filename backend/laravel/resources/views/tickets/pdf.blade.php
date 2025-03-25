<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ticket de Compra</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }

            th,
            td {
                border: 1px solid black;
                padding: 10px;
                text-align: center;
            }

            th {
                background-color: #f2f2f2;
            }
        </style>
    </head>

    <body>
        <h2>Ticket de Compra</h2>

        <h3>Asientos Reservados:</h3>
        <table>
            <tr>
                <th>Fila</th>
                <th>Asiento</th>
            </tr>
            @foreach ($butacas as $butaca)
            <tr>
                <td>{{ $butaca['fila'] }}</td>
                <td>{{ $butaca['columna'] }}</td>
            </tr>
            @endforeach
        </table>

        <p>¡Gracias por su compra!</p>
    </body>
</html>