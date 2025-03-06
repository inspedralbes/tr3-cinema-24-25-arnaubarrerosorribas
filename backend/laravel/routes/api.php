<?php
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\PeliculasController;
    use App\Http\Controllers\CategoriesController;
    use App\Http\Controllers\auth\LoginRegisterController;

    Route::prefix('autentificacio')->group(function () {
        Route::post('login', [LoginRegisterController::class, 'login']);
        Route::post('register', [LoginRegisterController::class, 'registrar']);
        Route::middleware('auth:sanctum')->post('logout', [LoginRegisterController::class, 'logout']);
        Route::middleware('auth:sanctum')->post('change-password', [LoginRegisterController::class, 'changePassword']);
    });

    Route::get('verify-email/{id}/{hash}', [LoginRegisterController::class, 'verifyEmail'])->name('verify.email');

    Route::prefix('pelicules')->group(function () {
        Route::get('cataleg', [PeliculasController::class, 'index']);
        Route::get('seleccionada/{id}', [PeliculasController::class, 'seleccionada']);
        Route::post('publicar-pelicula', [PeliculasController::class, 'publicarPelicula']);
        Route::get('cateleg-disponibles', [PeliculasController::class, 'peliculesDisponibles']);
        Route::get('cateleg-descatalogades', [PeliculasController::class, 'peliculesDescatalogadas']);
        Route::get('pelicules-disp-categ', [PeliculasController::class, 'peliculesDisponiblesCategorias']);
    });

    Route::prefix('categorias')->group(function (){
        Route::get('/', [CategoriesController::class, 'index']);
    });