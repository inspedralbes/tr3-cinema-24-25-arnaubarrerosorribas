'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userInfo } from '../plugins/communicationManager';

export default function CatalogPelicules() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [infoUsuari, setInfoUsuari] = useState([]);

    const userInfoFetch = async (storedParam) => {
        try {
            const response = await userInfo(storedParam);
            setInfoUsuari(response);
            setLoading(false); // Desactivar el estado de carga
        } catch (error) {
            alert("Error al obtener datos");
            setLoading(false); // Desactivar el estado de carga incluso si hay un error
        }
    };

    useEffect(() => {
        const storedParam = localStorage.getItem('Login Token');
        if (storedParam) {
            userInfoFetch(storedParam);
        } else {
            router.push('/user/login');
        }
    }, [router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <p className="text-blue-500 text-2xl">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-blue-500 mb-6">Informació d'usuari</h1>
                <h2 className="text-2xl font-semibold text-white mb-6">Llistat d'entrades</h2>

                {infoUsuari.length > 0 ? (
                    <div className="space-y-6">
                        {infoUsuari.map((entrada, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold text-blue-400 mb-2">
                                    Pel·lícula: {entrada.pelicula}
                                </h3>
                                <p className="text-gray-300">
                                    Butaca: Fila {entrada.butaca.fila}, Columna {entrada.butaca.columna}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-300">No se encontraron entradas.</p>
                )}
            </div>
        </div>
    );
}