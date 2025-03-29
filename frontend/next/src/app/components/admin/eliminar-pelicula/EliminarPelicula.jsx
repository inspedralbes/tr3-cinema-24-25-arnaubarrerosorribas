'use client';
import Swal from 'sweetalert2';
import {Trash, Check, CircleOff} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { totesPeliculas, eliminarPelicula } from "../../../plugins/communicationManager";

export default function EliminarPeliculaForm() {
    const [loading, setLoading] = useState(true);
    const [peliculas, setPeliculas] = useState([]);
    
    const fetchPeliculas = async () => {
        try {
            const response = await totesPeliculas();
            setPeliculas(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const eliminarPeliculaFetch = async (id) => {
        try {
            await eliminarPelicula(id);
            Swal.fire({
                title: "Pel·lícula eliminada correctament.",
                icon: "success"
            });
            await fetchPeliculas();
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error al eliminar la pel·lícula",
                icon: "error"
            });
        }
    }

    useEffect(() => {
        fetchPeliculas();
    }, []);

    return (
        <>
            {loading ? (
                <p className="text-blue-400 text-center">Carregant...</p>
            ) : peliculas.length > 0 ? (
                <>
                    <div className="w-[90%] mx-auto space-y-4">
                        {peliculas.map((pelicula) => (
                            <div
                                key={pelicula.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-blue-900">
                                            {pelicula.nombre_pelicula}
                                        </h2>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center">
                                            <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600">
                                                {pelicula.categoria.categoria}
                                            </span>
                                        </div>

                                        <div className="flex items-center">
                                            {pelicula.disponible === 1 ? (
                                                <div className="flex items-center text-emerald-600">
                                                    <Check size={20} />
                                                    <span>Disponible</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-red-500">
                                                    <CircleOff size={20} />
                                                    <span>No Disponible</span>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => eliminarPeliculaFetch(pelicula.id)}
                                            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-lg transition-colors duration-200"
                                        >
                                            <Trash size={20} />
                                            <span>Eliminar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-white text-center">No hi ha pel·lícules disponibles.</p>
            )}
        </>
    );
}