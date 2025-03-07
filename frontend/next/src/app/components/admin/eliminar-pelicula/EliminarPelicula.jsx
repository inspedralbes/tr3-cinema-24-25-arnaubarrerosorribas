'use client';
import Swal from 'sweetalert2';
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { totesPeliculas, eliminarPelicula } from "../../../plugins/communicationManager";

export default function EliminarPeliculaForm() {
    const [loading, setLoading] = useState(true);
    const [peliculas, setPeliculas] = useState("");

    const fetchPeliculas = async () => {
        try {
            const response = await totesPeliculas();
            setPeliculas(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    const eliminarPeliculaFetch = async (index) => {
        try {
            const response = await eliminarPelicula(index);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
        console.log(index)
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
                        {peliculas.map((pelicula, index) => (
                            <div
                                key={index}
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
                                                    <Image src="/check.svg" alt="Trash Icon" width={20} height={20} />
                                                    <span>Available</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-red-500">
                                                    <Image src="/unavailable.svg" alt="Unvailable Icon" width={20} height={20} />
                                                    <span>Not Available</span>
                                                </div>
                                            )}
                                        </div>

                                        <button 
                                            onClick={() => eliminarPeliculaFetch(index)}
                                            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-lg transition-colors duration-200"
                                        >
                                            <Image src="/trash.svg" alt="Trash Icon" width={20} height={20} />
                                            <span>Delete</span>
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