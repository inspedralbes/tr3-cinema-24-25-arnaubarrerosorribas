<?php
    namespace App\Http\Controllers;

    use App\Models\categories;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;

    class CategoriesController extends Controller {
        public function index() {
            $categorias  = categories::all();
            return response()->json($categorias);
        }
    }