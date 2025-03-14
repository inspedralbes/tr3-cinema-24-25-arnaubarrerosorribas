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
        router.push(`/home/move/${++index}`)
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
    }, []);

    return (
        <div className="bg-black min-h-screen p-6">
            <h1 className="text-center text-4xl font-bold text-blue-200 mb-6">Cartelera de Cine</h1>
            <div className="p-6 max-w-[1250px] m-auto">
                <Image onClick={() => router.push('/user')} className='fixed bottom-10 right-5 cursor-pointer bg-black z-[999] hover:bg-blue-300 transition-[3s] h-[40px] w-[40px] rounded-[100px]' src="/user.svg" width={60} height={60} alt="User img" />

                <div className='flex items-center justify-between mb-6'>
                    <select onChange={(e) => setFiltro(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-gold focus:border-transparent" >
                        <option value="" className="bg-gray-800 text-white">Totes les categories</option>
                        {categorias.map((categoria, index) => (
                            <option key={index} value={`${index}`} className="bg-gray-800 text-white">
                                {categoria.categoria}
                            </option>
                        ))}
                    </select>

                    <button onClick={() => eliminarFiltro()} className="m-0 size-[120px] p-0 text-red-500 cursor-pointer" >
                        X
                    </button>
                </div>

                {loading ? (
                    <p className="text-white-900 text-center">Cargando...</p>
                ) : peliculasFiltradas.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {peliculasFiltradas.map((pelicula, index) => (
                                <div key={index} className="bg-gray-800 p-4 shadow-lg transform transition duration-500 hover:scale-105">
                                    <img className="w-full h-[250px] object-cover rounded-lg" src={`${VarPelicula}${pelicula.imagen}`} alt={pelicula.nombre_pelicula} />
                                    <div className="mt-4">
                                        <p className="text-white font-semibold text-xl">{pelicula.nombre_pelicula}</p>
                                        <p className="text-white">Categoría: {pelicula.id_categoria.categoria}</p>
                                        <p className='text-white'>Fecha: {new Date(pelicula.data).toLocaleDateString('es-ES')}</p>
                                        <button className="mt-3 w-full bg-gold text-black py-2 px-4 hover:bg-blue-400 cursor-pointer transition duration-200" onClick={() => reedireccionar(pelicula.id - 1)} >
                                            Comprar Entrada
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-white text-center">No hay películas disponibles.</p>
                )}
            </div>
        </div>
    );
}