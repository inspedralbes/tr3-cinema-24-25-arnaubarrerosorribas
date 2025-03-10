<?php
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\PeliculasController;
    use App\Http\Controllers\CategoriesController;
    Use App\Http\Controllers\EntradasCompradasController;
    use App\Http\Controllers\auth\LoginRegisterController;

    Route::prefix('autentificacio')->group(function () {
        Route::post('login', [LoginRegisterController::class, 'login']);
        Route::post('register', [LoginRegisterController::class, 'registrar']);
        Route::middleware('auth:sanctum')->post('logout', [LoginRegisterController::class, 'logout']);
        Route::middleware('auth:sanctum')->post('change-password', [LoginRegisterController::class, 'changePassword']);
    });

    Route::get('verify-email/{id}/{hash}', [LoginRegisterController::class, 'verifyEmail'])->name('verify.email');

    Route::prefix('pelicules')->group(function () {
        // ===== GET ==================
        Route::get('cataleg', [PeliculasController::class, 'index']);
        Route::get('totes_pelicules', [PeliculasController::class, 'totesPelicules']);
        Route::get('seleccionada/{id}', [PeliculasController::class, 'seleccionada']);
        Route::get('cateleg-disponibles', [PeliculasController::class, 'peliculesDisponibles']);
        Route::get('cateleg-descatalogades', [PeliculasController::class, 'peliculesDescatalogadas']);
        Route::get('pelicules-disp-categ', [PeliculasController::class, 'peliculesDisponiblesCategorias']);

        // ===== POST =================
        Route::post('/eliminar/{id}', [PeliculasController::class, 'eliminar']);
        Route::post('modificacions', [PeliculasController::class, 'modificacions']);
        Route::post('publicar-pelicula', [PeliculasController::class, 'publicarPelicula']);
    });

    Route::prefix('entradas')->group(function () {
        Route::get('getButacasPelicula/{id}', [EntradasCompradasController::class, 'PeliculasOcupadasPelicula']);
    });

    Route::prefix('categorias')->group(function (){
        Route::get('/', [CategoriesController::class, 'index']);
    });