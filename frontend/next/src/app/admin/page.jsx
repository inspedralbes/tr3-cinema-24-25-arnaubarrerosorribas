'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminFetch } from '../plugins/communicationManager';
import AfegirPeliculaForm from '../components/admin/afegir-pelicula/AfegirPeliculaForm';
import EliminarPeliculaForm from '../components/admin/eliminar-pelicula/EliminarPelicula';
import ModificarPeliculaForm from '../components/admin/modificar-pelicula/ModificarPelicula';

export default function Page() {
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    const checkAdminStatus = async () => {
        const token = localStorage.getItem('Login Token');
        if (!token) {
            router.push('/user/login');
            return;
        }
    
        try {
            const response = await isAdminFetch(token);
            console.log(response)
            if (response === false) {
                router.push('/user/login');
            } else {
                setIsAdmin(true); 
            }
        } catch (error) {
            console.error('Error al verificar el rol de administrador:', error);
            router.push('/user/login');
        }
    };
    

    const OcultarFuncionalitats = () => {
        document.getElementById("idAfegirPelicula").style.display = "none";
        document.getElementById("idEliminarPelicula").style.display = "none";
        document.getElementById("idModificarPelicula").style.display = "none";
    };

    const mostrarAfegirPelicula = () => {
        OcultarFuncionalitats();
        document.getElementById("idAfegirPelicula").style.display = "block";
    };

    const mostrarEliminarPelicula = () => {
        OcultarFuncionalitats();
        document.getElementById("idEliminarPelicula").style.display = "block";
    };

    const mostrarModificarPelicula = () => {
        OcultarFuncionalitats();
        document.getElementById("idModificarPelicula").style.display = "block";
    };

    useEffect(() => {
        checkAdminStatus();
    }, []);    

    if (!isAdmin) {
        return null; // O un spinner de carga si prefieres
    }

    return (
        <div className="flex h-[100vh]">
            <aside id="sidebar" className="w-64 bg-gray-800">
                <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <span className="ml-2 text-xl font-semibold text-white">Admin</span>
                    </div>
                </div>
                <nav className="mt-5 px-2">
                    <div className="space-y-1 mb-[40px]">
                        <p onClick={mostrarAfegirPelicula} className="mb-[10px] group flex items-center px-2 py-2 text-base font-medium rounded-md text-white cursor-pointer hover:bg-gray-600 transition-[2s]">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/FFFFFF/plus--v1.png" alt="plus--v1" />
                            <span className="sidebar-text ml-[10px]">Afegir Pel·lícula</span>
                        </p>
                        <p onClick={mostrarModificarPelicula} className="mb-[10px] group flex items-center px-2 py-2 text-base font-medium rounded-md text-white cursor-pointer hover:bg-gray-600 transition-[2s]">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/FFFFFF/edit--v1.png" alt="edit--v1" />
                            <span className="sidebar-text ml-[10px]">Modificar Pel·lícula</span>
                        </p>
                        <p onClick={mostrarEliminarPelicula} className="mb-[10px] group flex items-center px-2 py-2 text-base font-medium rounded-md text-white cursor-pointer hover:bg-gray-600 transition-[2s]">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/FFFFFF/delete-sign--v1.png" alt="delete-sign--v1" />
                            <span className="sidebar-text ml-[10px]">Eliminar Pel·lícula</span>
                        </p>
                    </div>
                </nav>
            </aside>

            <div className="flex-grow p-4 h-[100vh] bg-gray-100">
                <div id='idAfegirPelicula' style={{ display: 'none' }}>
                    <AfegirPeliculaForm />
                </div>
                <div id='idModificarPelicula' style={{ display: 'none' }}>
                    <ModificarPeliculaForm />
                </div>
                <div id="idEliminarPelicula" style={{ display: 'none' }}>
                    <EliminarPeliculaForm />
                </div>
            </div>
        </div>
    );
}