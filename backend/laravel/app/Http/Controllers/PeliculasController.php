<?php
    namespace App\Http\Controllers;
    use App\Models\peliculas;
    use App\Models\categories;
    use Illuminate\Http\Request;
    use App\Http\Controllers\Controller;
    use Illuminate\Support\Facades\Validator;

    class PeliculasController extends Controller {
        public function index() {
            $peliculas = peliculas::all();
            return response()->json($peliculas);
        }

        public function totesPelicules() {
            $peliculas = peliculas::with('categoria')
                        ->get()
                        ->map(function ($pelicula){
                            return [
                                "id"=>$pelicula->id,
                                "nombre_pelicula"=>$pelicula->nombre_pelicula,
                                "categoria"=>$pelicula->categoria,
                                "disponible"=>$pelicula->disponible
                            ];
                        });
            return response()->json($peliculas);
        }

        public function peliculesDisponibles() {
            $peliculas = peliculas::where('disponible', 1)->get();
            return response()->json($peliculas);
        }

        public function peliculesDescatalogadas() {
            $peliculas = peliculas::where('disponible', 0)->get();
            return response()->json($peliculas);
        }

        public function peliculesDisponiblesCategorias() {
            $peliculas = peliculas::with('categoria')
                        ->where('disponible', 1)
                        ->where('data', '>=', today())
                        ->get()
                        ->map(function ($pelicula){
                            return [
                                "id"=>$pelicula->id,
                                "nombre_pelicula"=>$pelicula->nombre_pelicula,
                                "categoria"=>$pelicula->categoria->categoria, // Nom de la categoria
                                "id_categoria"=>$pelicula->categoria,
                                "imagen"=>$pelicula->imagen,
                                "data"=>$pelicula->data,
                            ];
                        });
            return response()->json($peliculas);
        }

        public function publicarPelicula(Request $request) {
            $peliculaExistent = peliculas::where('nombre_pelicula', $request->nombre_pelicula)->first();
            if ($peliculaExistent) {
                return response()->json([
                    'message' => 'La película ja existeix.'
                ], 409);
            }
        
            $fechaExistente = peliculas::where('data', $request->data)->first();
            if ($fechaExistente) {
                return response()->json([
                    'message' => 'Ja existeix una pel·lícula amb aquesta data'
                ], 409);
            }
        
            $request->validate([
                'imagen' => 'required|image|mimes:jpg,png,jpeg,webp|max:2048',
                'data' => 'required|date|unique:peliculas,data'
            ]);
        
            $rutaImagen = null;
            if ($request->hasFile('imagen')) {
                $rutaImagen = $request->file('imagen')->store('peliculas', 'public');
            }
        
            peliculas::create([
                'nombre_pelicula' => $request->nombre_pelicula,
                'categoria_id' => $request->categoria_id,
                'disponible' => 0,
                'imagen' => $rutaImagen,
                'descripcion' => $request->descripcion,
                'data' => $request->data,
                'preu_entrada' => $request->preu_entrada,
            ]);
        
            return response()->json([
                'Missatge' => 'Pel·lícula creada correctament'
            ], 201);
        }

        public function seleccionada($id) {
            $pelicula = peliculas::with('categoria')
                                ->where('id', $id)
                                ->get()
                                ->map(function($pelicula){
                                    return[
                                        "id"=>$pelicula->id,
                                        "nombre_pelicula"=>$pelicula->nombre_pelicula,
                                        "categoria"=>$pelicula->categoria->categoria,
                                        "imagen"=>$pelicula->imagen,
                                        "descripcion"=>$pelicula->descripcion,
                                        "data"=>$pelicula->data,
                                        "preu_entrada"=>$pelicula->preu_entrada,
                                    ];
                                });
            return response()->json($pelicula);
        }

        public function eliminar($id) {
            $eliminarPelicula = peliculas::where('id',$id)->delete();
            return response()->json("Pel·lícula eliminada correctament");
        }

        public function modificacions(Request $request) {
            $pelicula = peliculas::find($request->id);

            if (!$pelicula) {
                return response()->json([
                    'success' => false,
                    'misatge' => 'Pel·lícula no trobada',
                ], 404);
            }

            $pelicula -> nombre_pelicula = $request -> nombre_pelicula;
            $pelicula -> categoria_id = $request -> categoria_id;
            $pelicula -> disponible = $request -> disponible;

            $pelicula -> save();

            return response()->json([
                'success' => true,
                'misatge' => 'Pel·lícula actualitzada',
                'data' => $pelicula,
            ], 200);
        }
    }