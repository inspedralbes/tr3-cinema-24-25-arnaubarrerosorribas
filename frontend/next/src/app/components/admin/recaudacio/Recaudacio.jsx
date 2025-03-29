'use client';

import { useEffect, useState } from 'react';
import { Check, CircleOff, Loader2 } from 'lucide-react';
import { recaudacio } from '../../../plugins/communicationManager';

export default function ButacasPorPelicula() {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchButacas() {
            try {
                const response = await recaudacio('/butacas-por-pelicula');
                setPeliculas(response);
                setError(null);
            } catch (error) {
                console.error('Error al obtener datos:', error);
                setError('No se pudieron cargar los datos. Por favor, inténtelo más tarde.');
            } finally {
                setLoading(false);
            }
        }
        fetchButacas();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recaudación por Película</h2>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-3" />
                    <p className="text-gray-600">Cargando datos...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-red-500">
                    <CircleOff className="h-8 w-8 mb-3" />
                    <p className="text-center">{error}</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Película
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Recaudación
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {peliculas.map((pelicula, index) => (
                                <tr key={`${pelicula.id_pelicula}-${index}`} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{pelicula.nom_pelicula}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 font-semibold">
                                            {(pelicula.total_butacas_compradas * 6).toLocaleString('es-ES', {
                                                style: 'currency',
                                                currency: 'EUR'
                                            })}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && !error && peliculas.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <CircleOff className="h-8 w-8 mb-3" />
                    <p>No hay datos disponibles</p>
                </div>
            )}
        </div>
    );
}