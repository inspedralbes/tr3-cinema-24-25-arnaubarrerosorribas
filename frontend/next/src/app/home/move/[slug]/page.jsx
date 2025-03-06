'use client';
const varPelicula = process.env.NEXT_PUBLIC_IMAGES;
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { peliculaSeleccionada } from '../../../plugins/communicationManager';


export default function Page() {
    const { slug } = useParams();
    const [varPeliculaSeleccionada, setVarPeliculaSeleccionada] = useState([]);

    const fetchPeliculaConcreta = async () => {
        try {
            const response = await peliculaSeleccionada(slug);
            setVarPeliculaSeleccionada(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (slug) {
            fetchPeliculaConcreta(slug);
        }
    }, [slug]); // Activar el useEffect cuando haya un cambio en "slug"

    return (
        <div className="bg-black min-h-screen p-8">
            {varPeliculaSeleccionada.map((pelicula, index) => (
                <div
                    key={index}
                    className="max-w-4xl mx-auto bg-gray-900 shadow-lg overflow-hidden flex flex-col md:flex-row"
                >
                    <div className="w-full md:w-1/2">
                        <img
                            src={`${varPelicula}${pelicula.imagen}`}
                            alt={pelicula.nombre_pelicula}
                            className="w-full h-96 object-cover border border-solid border-white"
                        />
                    </div>

                    <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                        <h1 className="text-3xl font-bold text-blue-500 mb-4">
                            {pelicula.nombre_pelicula}
                        </h1>

                        <p className="text-gray-400 text-lg mb-2">
                            <span className="font-semibold text-blue-500">Categoría:</span> {pelicula.categoria}
                        </p>

                        <p className="text-gray-300 text-lg">
                            <span className="font-semibold text-blue-500">Descripción:</span> {pelicula.descripcion}
                        </p>

                        <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 mt-[30px]">
                            Seleccionar butaques
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}