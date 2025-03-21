'use client';
const varPelicula = process.env.NEXT_PUBLIC_IMAGES;
import Image from 'next/image';
import { useEffect, useState } from 'react';
import socket from '../../../../services/socket';
import { useParams, useRouter } from 'next/navigation';
import { peliculaSeleccionada, PeliculasOcupadasPelicula, CompraEntradas } from '../../../plugins/communicationManager';

export default function Page() {
    const filas = 12;
    const colum = 10;
    const router = useRouter();
    const { slug } = useParams();
    const Swal = require('sweetalert2');

    const [preuTotal, setPreuTotal] = useState(0);
    const [NombrePelicula, setNombrePelicula] = useState('');
    const [mostrarButacas, setMostrarButacas] = useState(false);
    const [varButacasOcupadas, setVarButacasOcupadas] = useState([]);
    const [butacasSeleccionadas, setButacasSeleccionadas] = useState([]);
    const [varPeliculaSeleccionada, setVarPeliculaSeleccionada] = useState([]);

    // Veure si hi han tickets en temps real
    useEffect(() => {
        socket.on('newTicket', (ticket) => {
            console.log("Nuevo ticket recibido:", ticket);
            setVarButacasOcupadas((prevButacas) => [...prevButacas, ...ticket.butacas]);
        });

        return () => {
            socket.off('newTicket');
        };
    }, []);

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
            setNombrePelicula(response[0].nombre_pelicula);
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
        const idUser = localStorage.getItem('User ID');
        const data = {
            idUser,
            pelicula: slug,
            preuTotal: preuTotal,
            butacas: butacasSeleccionadas.map(butaca => {
                const [fila, columna] = butaca.split('-').map(Number);
                return { fila, columna };
            })
        };

        try {
            const response = await CompraEntradas(data);
            console.log("Compra exitosa:", response);

            // Emitir event per actualitzar als altres usuaris
            socket.emit('newTicket', { pelicula: slug, butacas: data.butacas });

            Swal.fire({
                title: "Compra realizada",
                icon: "success"
            });
            router.push('/user');
        } catch (error) {
            console.log(error);
        }
    };

    const seleccionarButaca = (fila, columna) => {
        const butaca = `${fila}-${columna}`;
        const precioBase = varPeliculaSeleccionada[0]?.preu_entrada || 0;
        const precioFinal = fila === 5 ? precioBase + 2 : precioBase;

        if (butacasSeleccionadas.includes(butaca)) {
            setButacasSeleccionadas(butacasSeleccionadas.filter((b) => b !== butaca));
            setPreuTotal((prevTotal) => prevTotal - precioFinal);
        } else {
            setButacasSeleccionadas([...butacasSeleccionadas, butaca]);
            setPreuTotal((prevTotal) => prevTotal + precioFinal);
        }
    };

    const estaOcupada = (fila, columna) => {
        return varButacasOcupadas.some(
            (butaca) => butaca.fila === fila && butaca.columna === columna
        );
    };

    useEffect(() => {
        const storedParam = localStorage.getItem('Login Token');
        if (slug && storedParam != null) {
            fetchPeliculaConcreta();
            fetchButacasOcupadas();
        } else {
            router.push('/user/login');
        }
    }, [slug]);

    return (
        <div className='h-[100vh] flex flex-col items-center justify-center animate-gradient-x'>
            {varPeliculaSeleccionada.map((pelicula, index) => (
                <div key={index} className='flex flex-col md:flex-row h-[80vh] w-[90%] border-2 border-gray-300 shadow-xl mb-4'>
                    <div className='w-full md:w-[40%] flex items-center justify-center'>
                        <img
                            src={`${varPelicula}${pelicula.imagen}`}
                            alt={pelicula.nombre_pelicula}
                            className="h-[300px] w-[80%] object-cover bg-black"
                        />
                    </div>

                    <div className='w-full md:w-[60%] p-4 flex items-center justify-center'>
                        <div className='flex flex-col w-[90%]'>
                            <h1 className='text-2xl font-bold'>{ NombrePelicula }</h1>
                            
                            <p className='mt-2'>
                                <span className='font-semibold'>Categoría:</span> {pelicula.categoria}
                            </p>
                            <p className='mt-2'>
                                <span className='font-semibold'>Fecha:</span> {new Date(pelicula.data).toLocaleDateString('es-ES')}
                            </p>
                            <p className='mt-2'>
                                <span className='font-semibold'>Descripció:</span> {pelicula.descripcion}
                            </p>
                            <button className='mt-4 mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                                onClick={mostrarSeleccionarButaca}>
                                {pelicula.data}
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {mostrarButacas && (
                <div className='fixed top-0 left-0 w-[100vw] h-[100vh] animate-gradient-x flex items-center justify-center p-4'>
                    <div className='flex flex-col md:flex-row w-full max-w-6xl'>
                        <div className="flex flex-col gap-2 w-full md:w-[50%] shadow-xl p-4">
                            <div className="text-center mb-6">
                                <Image src="/screen.svg" width={350} height={50} alt="Pantalla" className="mx-auto" />
                            </div>
                            {Array.from({ length: filas }).map((_, rowIndex) => (
                                <div key={rowIndex} className="flex gap-2 justify-center">
                                    {Array.from({ length: colum }).map((_, colIndex) => {
                                        const fila = rowIndex + 1;
                                        const columna = colIndex + 1;
                                        const butaca = `${fila}-${columna}`;
                                        const estaSeleccionada = butacasSeleccionadas.includes(butaca);
                                        const esOcupada = estaOcupada(fila, columna);

                                        return (
                                            <div
                                                key={columna}
                                                className={`cursor-pointer ${esOcupada ? 'opacity-10 cursor-not-allowed' : 'hover:scale-110 transition transform duration-200'}`}
                                                onClick={() => !esOcupada && seleccionarButaca(fila, columna)}
                                            >
                                                <Image
                                                    src="/seat.svg"
                                                    width={25}
                                                    height={25}
                                                    alt="Butaca"
                                                    style={{
                                                        filter: esOcupada
                                                            ? 'grayscale(1000%)'
                                                            : estaSeleccionada
                                                                ? 'invert(70%) sepia(99%) saturate(9000%)'
                                                                : fila === 5
                                                                    ? 'invert(100%) sepia() saturate(10000%) hue-rotate(0deg)'
                                                                    : 'none',
                                                    }}
                                                />
                                            </div>

                                        );

                                    })}
                                </div>
                            ))}
                        </div>
                        <div className='w-full md:w-[50%] p-4 flex flex-col gap-4 items-center justify-center'>
                            <h1>Nom Pel·lícula: {NombrePelicula} </h1>
                            <h1>{ preuTotal }€</h1>
                            <button onClick={cerrarSala} className='bg-red-500 w-[100%] text-white px-4 py-1 font-semibold hover:bg-red-600'>
                                X Cancelar Compra
                            </button>
                            <button onClick={ferReserva} className='bg-blue-500 w-[100%] text-white px-4 py-1 font-semibold hover:bg-blue-600'>
                                ✔ Finalizar y comprar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
