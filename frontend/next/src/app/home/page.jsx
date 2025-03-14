'use client';
const VarPelicula = process.env.NEXT_PUBLIC_IMAGES;
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { peliculasDisponiblesAmbCategoria, categoriasCCMM } from '../plugins/communicationManager';

export default function CatalogPelicules() {
    const router = useRouter()
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [nombrePelicula, setNombrePelicula] = useState([]);

    const fetchPeliculas = async () => {
        try {
            const response = await peliculasDisponiblesAmbCategoria();
            setNombrePelicula(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
    };

    const setFiltro = (index) => {
        setFilter(index);
    };

    const eliminarFiltro = () => {
        setFilter('');
    };

    const reedireccionar = (index) => {
        index++;
        router.push(`/home/move/${index}`)
    }

    const peliculasFiltradas = nombrePelicula.filter((pelicula) => {
        if (!filter) return true;
        return pelicula.id_categoria.id === parseInt(filter);
    });

    useEffect(() => {
        const storedParam = localStorage.getItem('Login Token');
        if (storedParam != null) {
            fetchCategorias();
            fetchPeliculas();
        } else (
            router.push('/user/login')
        )
    });

    return (
        <div className="bg-black min-h-screen p-6">
            <h1 className="text-center text-3xl font-bold text-white mb-6">Tauler de cartellera</h1>
            <div className="bg-black p-4 rounded-lg max-w-[1250px] m-auto">
                <Image onClick={() => router.push('/user')} className='fixed bottom-10 right-5 bg-black rounded-[100%]' src="/user.svg" width={60} height={60} alt="User img" />

                <div className='flex items-center'>
                    <select
                        onChange={(e) => setFiltro(e.target.value)}
                        className="w-full p-2 mb-6 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    >
                        {categorias.map((categoria, index) => (
                            <option key={index} value={`${index}`} className="bg-gray-800 text-white">
                                {categoria.categoria}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => eliminarFiltro()}
                        className="ml-2 pt-2 pb-2 pl-3 pr-3 mb-6 text-white rounded-md hover:bg-red-600 transition duration-200 cursor-pointer"
                    >
                        X
                    </button>
                </div>


                {loading ? (
                    <p className="text-blue-400 text-center">Carregant...</p>
                ) : peliculasFiltradas.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {peliculasFiltradas.map((pelicula, index) => (
                                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                                    <img
                                        className="w-full h-[200px] object-cover rounded-lg"
                                        src={`${VarPelicula}${pelicula.imagen}`}
                                        alt={pelicula.nombre_pelicula}
                                    />
                                    <div className="mt-4">
                                        <p className="text-white font-semibold">Nombre Pelicula: {pelicula.nombre_pelicula} </p>
                                        <p className="text-blue-400">Categoria: {pelicula.id_categoria.categoria} </p>
                                        <p className='text-blue-400'>Data: {new Date(pelicula.data).toLocaleDateString('es-ES')}</p>
                                        <button
                                            className="mt-3 w-full bg-blue-400 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300"
                                            onClick={() => reedireccionar(pelicula.id-1)}
                                        >
                                            Comprar una entrada
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-white text-center">No hi ha pel·lícules disponibles.</p>
                )}
            </div>
        </div>
    );
}