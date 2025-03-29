'use client';
import Swal from 'sweetalert2';
import Image from "next/image";
import {Check,CircleOff,Pen} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { categoriasCCMM, totesPeliculas, publicarModificacions } from "../../../plugins/communicationManager";

export default function EliminarPeliculaForm() {
    const [loading, setLoading] = useState(true);
    const [peliculas, setPeliculas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
    const [disponibleSeleccionado, setDisponibleSeleccionado] = useState(1);
    const [categoriaSeleccionadaDesp, setCategoriaDesplagadaDesp] = useState("");

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

    const fetchCategorias = async () => {
        try {
            const response = await categoriasCCMM();
            setCategorias(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleModificarClick = (pelicula) => {
        setPeliculaSeleccionada(pelicula);
        setCategoriaDesplagadaDesp(pelicula.categoria.id);
        setDisponibleSeleccionado(pelicula.disponible);
        setMostrarFormulario(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datosActualizados = { //No he de fer FormData perque unicament paso text i numeros, no paso fitxers
            id: peliculaSeleccionada.id,
            nombre_pelicula: peliculaSeleccionada.nombre_pelicula,
            categoria_id: categoriaSeleccionadaDesp,
            disponible: disponibleSeleccionado,
        };

        try {
            console.log(datosActualizados);
            const response = await publicarModificacions(datosActualizados);
            if (response.success) {
                Swal.fire({
                    title: "Pel·lícula modificada correctament.",
                    icon: "success"
                });
                console.log("Respuesta del servidor:", response);
            } else {
                Swal.fire({
                    title: "Error",
                    text: response.message || "No s'ha pogut modificar la pel·lícula.",
                    icon: "error"
                });
            }
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        fetchPeliculas();
        fetchCategorias();
    }, []);

    return (
        <>
            {loading ? (
                <p className="text-blue-400 text-center">Carregant...</p>
            ) : peliculas.length > 0 ? (
                <>
                    <div className="w-[90%] mx-auto space-y-4">
                        {peliculas.map((pelicula, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4" >
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
                                            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-4 rounded-lg transition-colors duration-200"
                                            onClick={() => handleModificarClick(pelicula)}
                                        >
                                            <Pen size={20} />
                                            <span>Modificar</span>
                                        </button>
                                    </div>
                                </div>

                                {mostrarFormulario && peliculaSeleccionada && peliculaSeleccionada.id === pelicula.id && (
                                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                        <input
                                            type="text"
                                            value={peliculaSeleccionada.nombre_pelicula}
                                            className="border border-solid border-black-900 p-2 w-full"
                                            onChange={(e) => setPeliculaSeleccionada({ ...peliculaSeleccionada, nombre_pelicula: e.target.value, })}
                                        />
                                        <select
                                            value={categoriaSeleccionadaDesp}
                                            onChange={(e) => setCategoriaDesplagadaDesp(parseInt(e.target.value))}
                                            className="border border-solid border-black-900 p-2 w-full"
                                        >
                                            {categorias.map((categoria, index) => (
                                                <option value={categoria.id} key={index}>
                                                    {categoria.categoria}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            value={disponibleSeleccionado}
                                            onChange={(e) => setDisponibleSeleccionado(parseInt(e.target.value))} // He de convertir-ho a numero  ja que el back espera un 
                                            className="border border-solid border-black-900 p-2 w-full"
                                        >
                                            <option value={1}>Disponible</option>
                                            <option value={2}>No Disponible</option>
                                        </select>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                                        >
                                            Guardar Cambios
                                        </button>
                                    </form>
                                )}
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