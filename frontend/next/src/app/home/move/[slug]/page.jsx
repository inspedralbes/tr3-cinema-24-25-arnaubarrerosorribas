'use client';
const varPelicula = process.env.NEXT_PUBLIC_IMAGES;
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
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (slug){
            fetchPeliculaConcreta(slug);
        }
    }, [slug]); // Activar el useEffect cuando haya un cambio en "slug"

    return (
        <>
            {varPeliculaSeleccionada.map((pelicula, index) => (
                <div key={index}>
                    <img src={`${varPelicula}${pelicula.imagen}`} alt="" />
                    <p>
                        Pelicula: {pelicula.nombre_pelicula}
                    </p>
                    <p>
                        Categoria: {pelicula.categoria}
                    </p>
                    <p>
                        Descripcion: {pelicula.descripcion}
                    </p>
                </div>
            ))}
        </>
    )
}