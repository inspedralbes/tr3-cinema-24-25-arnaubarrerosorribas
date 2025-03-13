'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userInfo } from '../plugins/communicationManager';

export default function CatalogPelicules() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [infoUsuari, setInfoUsuari] = useState({});
    const [error, setError] = useState(null);

    const userInfoFetch = async (storedParam) => {
        try {
            const response = await userInfo(storedParam);
            setInfoUsuari(response);
            console.log(response);
        } catch (error) {
            setError("Error al obtener datos");
        } finally {
            setLoading(false);
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

    const groupByCompraConjunta = (data) => {
        const result = {};

        Object.keys(data).forEach((key) => {
            const entrada = data[key];
            const idCompraConjunta = entrada.id_compra_conjunta || 'sin_id';

            if (!result[idCompraConjunta]) {
                result[idCompraConjunta] = [];
            }

            result[idCompraConjunta].push(entrada);
        });

        return result;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <p className="text-blue-500 text-2xl animate-pulse">Cargando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    const groupedData = groupByCompraConjunta(infoUsuari);

    return (
        <div className="bg-gray-900 min-h-screen p-8">
            <h1 className="text-3xl font-bold text-center text-white mb-8">Compres realitzades</h1>
            <div className="space-y-6">
                {Object.keys(groupedData).map((idCompraConjunta) => (
                    <div key={idCompraConjunta} className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="space-y-4">
                            {groupedData[idCompraConjunta].map((entrada, index) => (
                                <div key={index} className="bg-gray-700 rounded-lg p-4 shadow-md">
                                    <h3 className="text-xl font-semibold text-white mb-2">Película: {entrada.pelicula}</h3>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-300 mb-2">Butacas:</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {entrada.butacas.map((butaca, idx) => (
                                                <div key={idx} className="bg-gray-600 rounded p-2 text-center text-white">
                                                    Fila: {butaca.fila}, Columna: {butaca.columna}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}