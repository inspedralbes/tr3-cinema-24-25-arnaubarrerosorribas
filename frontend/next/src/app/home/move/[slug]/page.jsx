'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { peliculaSeleccionada } from '../../../plugins/communicationManager';


export default function Page() {
    const {slug} = useParams();
    const [varPeliculaSeleccionada, setVarPeliculaSeleccionada] = useState([]);

    const fetchPeliculaConcreta = async() => { 
        try {
            const response = await peliculaSeleccionada(slug);
            setVarPeliculaSeleccionada(response);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (slug){
            fetchPeliculaConcreta(slug);
        }
    }, [slug]); // Activar el useEffect cuando haya un cambio en "slug"

    return <h1>varPeliculaSeleccionada</h1>
}