'use client';
const VarPelicula = process.env.NEXT_PUBLIC_IMAGES;
import Image from 'next/image';
import { User } from 'lucide-react';
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
        <div className="h-[100vh] flex flex-col items-center justify-center animate-gradient-x">
            <h1 className="text-3xl h-[10vh] font-bold">Cinema's DaBaby</h1>

            <div className='shadow-2xl rounded-xl h-[85vh] w-[90%] overflow-y-auto max-w-[1400px]'>
                <div onClick={() => router.push('/user')} className='border border-solid border-black rounded-full bg-blue-200 p-2 fixed bottom-10 right-10 cursor-pointer'>
                    <User />
                </div>

                <div className="p-4">
                    <select className='w-[95%] rounded-xl outline-0 cursor-pointer p-2 bg-white' onChange={(e) => setFiltro(e.target.value)}>
                        <option value="">Totes les categories</option>
                        {categorias.map((categoria, index) => (
                            <option key={index} value={`${index}`}>
                                {categoria.categoria}
                            </option>
                        ))}
                    </select>

                    <button onClick={() => eliminarFiltro()} className='text-red-500 m-auto align-center cursor-pointer w-[5%]'>
                        X
                    </button>
                </div>

                {loading ? (
                    <p className="text-white-900 text-center">Cargando...</p>
                ) : peliculasFiltradas.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {peliculasFiltradas.map((pelicula, index) => (
                            <div key={index} className="border rounded-xl border-solid border-black bg-blue-200">
                                <img
                                    src={`${VarPelicula}${pelicula.imagen}`}
                                    alt={pelicula.nombre_pelicula}
                                    className="w-full rounded-t-xl cover object-cover bg-black h-[250px]"
                                />
                                <div className="mt-2 p-2">
                                    <p className="font-semibold">{pelicula.nombre_pelicula}</p>
                                    <p>Categoría: {pelicula.id_categoria.categoria}</p>
                                    <p>Fecha: {new Date(pelicula.data).toLocaleDateString('es-ES')}</p>
                                    <button
                                        onClick={() => reedireccionar(pelicula.id - 1)}
                                        className="cursor-pointer mt-2 rounded-md w-[100%] bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                                    >
                                        Comprar Entrada
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-white text-center">No hay películas disponibles.</p>
                )}
            </div>
        </div>
    );
}