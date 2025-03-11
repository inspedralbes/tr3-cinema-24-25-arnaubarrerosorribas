'use client';
const varPelicula = process.env.NEXT_PUBLIC_IMAGES;
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { peliculaSeleccionada,PeliculasOcupadasPelicula,CompraEntradas } from '../../../plugins/communicationManager';

export default function Page() {
    const filas = 12;
    const colum = 10;
    const { slug } = useParams();
    const [mostrarButacas, setMostrarButacas] = useState(false);
    const [varButacasOcupadas, setVarButacasOcupadas] = useState([]);
    const [butacasSeleccionadas, setButacasSeleccionadas] = useState([]);
    const [varPeliculaSeleccionada, setVarPeliculaSeleccionada] = useState([]);

    const mostrarSeleccionarButaca = () => {
        setMostrarButacas(true);
    };

    const cerrarSala = () => {
        setMostrarButacas(false);
    };

    const fetchPeliculaConcreta = async () => {
        try {
            const response = await peliculaSeleccionada(slug);
            setVarPeliculaSeleccionada(response);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchButacasOcupadas = async () => {
        try {
            const response = await PeliculasOcupadasPelicula(slug);
            setVarButacasOcupadas(response);
        } catch (error) {
            console.log(error);
        }
    };

    const ferReserva = async () => {
        const idUser = localStorage.getItem('user ID');
        const data = {
            idUser,
            pelicula: slug,
            butacas: butacasSeleccionadas.map(butaca => {
                const [fila,columna]=butaca.split('-').map(Number); // Contruir el format de l'array per enviar
                return {fila,columna}
            })
        }; console.log(data);

        try {
            const response = await CompraEntradas(data);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    const seleccionarButaca = (fila, columna) => {
        const butaca = `${fila}-${columna}`;
        if (butacasSeleccionadas.includes(butaca)) {
            setButacasSeleccionadas(butacasSeleccionadas.filter((b) => b !== butaca));
        } else {
            setButacasSeleccionadas([...butacasSeleccionadas, butaca]);
        }
    };    

    // Verificar si la butaca esta ocupada
    const estaOcupada = (fila, columna) => {
        return varButacasOcupadas.some(
            (butaca) => butaca.fila === fila && butaca.columna === columna
        );
    };    

    useEffect(() => {
        if (slug) {
            fetchPeliculaConcreta(slug);
            fetchButacasOcupadas(slug);
        }
    }, [slug]);

    return (
        <div className="bg-black min-h-screen p-8">
            {varPeliculaSeleccionada.map((pelicula, index) => (
                <div key={index} className="max-w-4xl mx-auto bg-gray-900 shadow-lg overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <img
                            src={`${varPelicula}${pelicula.imagen}`}
                            alt={pelicula.nombre_pelicula}
                            className="w-full h-96 object-cover border border-solid border-white"
                        />
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

                        <button
                            onClick={mostrarSeleccionarButaca}
                            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 mt-[30px]"
                        >
                            Seleccionar butaques
                        </button>
                    </div>
                </div>
            ))}

            {mostrarButacas && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl overflow-y-auto">
                        <button onClick={cerrarSala} className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 mb-4">
                            X
                        </button>

                        <div className="text-center mb-6">
                            <Image src="/screen.svg" width={800} height={100} alt="Pantalla" className="mx-auto" />
                            <p className='border border-white border-solid color-white-900 mt-[100px]' onClick={() => ferReserva()}>
                                Finalitzar i comprar
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            {Array.from({ length: filas }).map((_, rowIndex) => (
                                <div key={rowIndex} className="flex gap-2 justify-center">
                                    {Array.from({ length: colum }).map((_, colIndex) => {
                                        const fila = rowIndex + 1;
                                        const columna = colIndex + 1;
                                        const butaca = `${fila}-${columna}`;
                                        const estaSeleccionada = butacasSeleccionadas.includes(butaca);
                                        const esOcupada = estaOcupada(fila, columna);

                                        return (
                                            <div key={columna} className={`cursor-pointer ${esOcupada ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => !esOcupada && seleccionarButaca(fila, columna)} >
                                                <Image src="/seat.svg" width={40} height={40} alt="Butaca"
                                                    style={{ filter: esOcupada ? 'invert(10%) sepia(10%) saturate(9000%)' : estaSeleccionada ? 'invert(70%) sepia(99%) saturate(9000%)' : 'none', }}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}