'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userInfo } from '../plugins/communicationManager';

export default function CatalogPelicules() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [infoUsuari, setInfoUsuari] = useState([]);
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
        return data.reduce((acc, entrada) => {
            const key = entrada.id_compra_conjunta || 'sin_id';
            if (!acc[key]) acc[key] = [];
            acc[key].push(entrada);
            return acc;
        }, {});
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <p className="text-blue-500 text-2xl">Cargando...</p>
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

    return (
        <>
        </>
    );
}