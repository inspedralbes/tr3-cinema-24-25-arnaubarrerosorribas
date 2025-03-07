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
                        ->get()
                        ->map(function ($pelicula){
                            return [
                                "id"=>$pelicula->id,
                                "nombre_pelicula"=>$pelicula->nombre_pelicula,
                                "categoria"=>$pelicula->categoria->categoria, // Nom de la categoria
                                "id_categoria"=>$pelicula->categoria,
                                "imagen"=>$pelicula->imagen,
                            ];
                        });
            return response()->json($peliculas);
        }

        public function publicarPelicula(Request $request) {
            $peliculaExistent = peliculas::where('nombre_pelicula', $request->nombre_pelicula)->first();
            if($peliculaExistent){
                return response()->json([
                    'message' => 'La pelicula ja existeix.'
                ], 409);
            }

            $request->validate([ 'imagen' => // Validar el que s'ha compartit
                'required|image|mimes:jpg,png,jpeg,webp|max:2048',
            ]);

            $rutaImagen = null;  // Variable per assignar la ruta de l'imatge
            if ($request->hasFile('imagen')){ // Assignar la ruta de l'imatge
                $rutaImagen = $request->file('imagen')->store('peliculas', 'public');
            }

            peliculas::create([
                'nombre_pelicula' => $request->nombre_pelicula,
                'categoria_id' => $request->categoria_id,
                'disponible' => 0,
                'imagen' => $rutaImagen,
                'descripcion' => $request->descripcion,
            ]);

            return response()->json([
                'Missatge' => 'Pel·licula creada correctament.',
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
                                    ];
                                });
            return response()->json($pelicula);
        }

        public function eliminar($id) {
            $eliminarPelicula = peliculas::where('id',$id)->delete();
            return response()->json("Pel·lícula eliminada correctament");
        }
    }