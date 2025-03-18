'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userInfo, isAdminFetch } from '../plugins/communicationManager';

export default function CatalogPelicules() {
    const router = useRouter();
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [infoUsuari, setInfoUsuari] = useState({});

    const userInfoFetch = async (storedParam) => {
        try {
            const response = await userInfo(storedParam);
            setInfoUsuari(response);
        } catch (error) {
            setError("Error al obtener datos");
        } finally {
            setLoading(false);
        }
    };

    const verificarAdmin = async (storedParam) => {
        try {
            const response = await isAdminFetch(storedParam);
            setAdmin(response === true);
        } catch (error) {
            console.error("Error al verificar si es admin:", error);
        }
    };

    useEffect(() => {
        const storedParam = localStorage.getItem('Login Token');
        if (storedParam) {
            userInfoFetch(storedParam);
            verificarAdmin(storedParam);
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
        <div className="min-h-screen flex flex-col items-center justify-center animate-gradient-x p-4">
            <h1 className="text-3xl font-bold text-center text-white mb-8">Compres realitzades</h1>

            {admin && (
                <div className="mb-6 text-center">
                    <button
                        onClick={() => router.push('/admin')}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Ir al panel de administración
                    </button>
                </div>
            )}

            <div className="w-full max-w-4xl space-y-6">
                {Object.keys(groupedData).map((idCompraConjunta) => (
                    <div key={idCompraConjunta} className="w-full">
                        <div className="space-y-4">
                            {groupedData[idCompraConjunta].map((entrada, index) => (
                                <div key={index} className="bg-gray-700 rounded-lg p-4 shadow-md">
                                    <h3 className="text-xl font-semibold text-white mb-2">Película: {entrada.pelicula}</h3>
                                    <h3 className="text-xl font-semibold text-white mb-2">Preu Total: {entrada.preuTotal}</h3>
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