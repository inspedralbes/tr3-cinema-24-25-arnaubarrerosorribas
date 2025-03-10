'use client';
const varPelicula = process.env.NEXT_PUBLIC_IMAGES;
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { peliculaSeleccionada } from '../../../plugins/communicationManager';

export default function Page() {
    const filas = 12;
    const colum = 10;
    const { slug } = useParams();
    const [mostrarButacas, setMostrarButacas] = useState(false);
    const [varPeliculaSeleccionada, setVarPeliculaSeleccionada] = useState([]);
    const [butacasSeleccionadas, setButacasSeleccionadas] = useState([]); // Estado para almacenar butacas seleccionadas

    const mostrarSeleccionarButaca = () => {
        setMostrarButacas(true);
    };

    const fetchPeliculaConcreta = async () => {
        try {
            const response = await peliculaSeleccionada(slug);
            setVarPeliculaSeleccionada(response);
        } catch (error) {
            console.error(error);
        }
    };

    const seleccionarButaca = (rowIndex, colIndex) => {
        const butaca = `${rowIndex}-${colIndex}`; // Identificado unic de la butaca
        if (butacasSeleccionadas.includes(butaca)) {
            setButacasSeleccionadas(butacasSeleccionadas.filter((b) => b !== butaca)); // Si la butaca ja esta seleccionada es desselecciona
        } else {
            setButacasSeleccionadas([...butacasSeleccionadas, butaca]); // Si no esta seleccionada es selecciona
        }
    };

    useEffect(() => {
        if (slug) {
            fetchPeliculaConcreta(slug);
        }
    }, [slug]);

    return (
        <div className="bg-black min-h-screen p-8">
            {varPeliculaSeleccionada.map((pelicula, index) => (
                <div key={index} className="max-w-4xl mx-auto bg-gray-900 shadow-lg overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <img src={`${varPelicula}${pelicula.imagen}`} alt={pelicula.nombre_pelicula} className="w-full h-96 object-cover border border-solid border-white" />
                    </div>

                    <div id='infoPelicula' className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                        <h1 className="text-3xl font-bold text-blue-500 mb-4">
                            {pelicula.nombre_pelicula}
                        </h1>

                        <p className="text-gray-400 text-lg mb-2">
                            <span className="font-semibold text-blue-500">Categoria:</span> {pelicula.categoria}
                        </p>

                        <p className="text-gray-300 text-lg">
                            <span className="font-semibold text-blue-500">Descripció:</span> {pelicula.descripcion}
                        </p>

                        <button onClick={mostrarSeleccionarButaca} className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 mt-[30px]" >
                            Seleccionar butaques
                        </button>
                    </div>

                    {mostrarButacas && (
                        <div className=" p-4">
                            <p className="text-center text-white p-2 mb-4">
                                <Image src="/screen.svg" width={400} height={50} alt="screen"  />
                            </p>
                            <div className="flex flex-col gap-2">
                                {Array.from({ length: filas }).map((_, rowIndex) => (
                                    <div key={rowIndex} className="flex gap-2 justify-center">
                                        {Array.from({ length: colum }).map((_, colIndex) => {
                                            const butaca = `${rowIndex}-${colIndex}`;
                                            const estaSeleccionada = butacasSeleccionadas.includes(butaca);
                                            return (
                                                <div key={colIndex} className={`cursor-pointer ${estaSeleccionada ? 'filter brightness-50' : ''}`} onClick={() => seleccionarButaca(rowIndex, colIndex)} >
                                                    <Image src="/seat.svg" width={50} height={50} alt="Butaca" className={`${estaSeleccionada ? 'filter brightness-0 invert' : ''}`} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}