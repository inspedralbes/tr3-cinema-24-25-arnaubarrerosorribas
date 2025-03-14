'use client';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { categoriasCCMM, publicarResposta } from "../../../plugins/communicationManager";

export default function AfegirPeliculaForm() {
    const [categorias, setCategorias] = useState([]);
    const [nombre_pelicula, setNombrePelicula] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagen, setImagen] = useState(null);
    const [data, setdata] = useState("");

    const fetchCategorias = async () => {
        try {
            const response = await categoriasCCMM();
            setCategorias(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre_pelicula", nombre_pelicula);
        formData.append("descripcion", descripcion);
        formData.append("categoria_id", categoria);
        formData.append("data", data);
        if (imagen) {
            formData.append("imagen", imagen);
        }

        try {
            const response = await publicarResposta(formData);
            Swal.fire({
                title: "Pel·lícula creada correctament.",
                icon: "success"
            });
        } catch (error) {
            console.error("Error al crear la pel·lícula:", error);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit} className="w-[90%] mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="movieName" className="block text-sm font-medium text-gray-700">Nom de la pel·lícula</label>
                    <input type="text" id="movieName" placeholder="Nom de la pel·lícula"
                        value={nombre_pelicula} onChange={(e) => setNombrePelicula(e.target.value)} required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripció</label>
                    <textarea id="description" placeholder="Descripció" rows="4"
                        value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required
                        className="resize-none h-[100px] mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="options" className="block text-sm font-medium text-gray-700">Selecciona una opció</label>
                    <select
                        id="options" value={categoria} onChange={(e) => setCategoria(e.target.value)} required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" disabled>Selecciona una categoria</option>
                        {categorias.map((categoria, index) => (
                            <option value={categoria.id} key={index}>
                                {categoria.categoria}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">Puja una imatge</label>
                    <input
                        type="file" id="file"
                        onChange={(e) => setImagen(e.target.files[0])} required
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Selecciona una data</label>
                    <input
                        type="date" id="date" value={data} onChange={(e) => setdata(e.target.value)} required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Enviar
                </button>
            </form>
        </>
    );
}