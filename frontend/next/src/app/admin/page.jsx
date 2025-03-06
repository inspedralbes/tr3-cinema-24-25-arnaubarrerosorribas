'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import AfegirPeliculaForm from '../components/admin/afegir-pelicula/AfegirPeliculaForm';

export default function Page() {
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
                        <p className="mb-[10px] group flex items-center px-2 py-2 text-base font-medium rounded-md text-white cursor-pointer hover:bg-gray-600 transition-[2s]">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/FFFFFF/plus--v1.png" alt="plus--v1" />
                            <span className="sidebar-text ml-[10px]">Afegir Pel·lícula</span>
                        </p>

                        <p className="mb-[10px] group flex items-center px-2 py-2 text-base font-medium rounded-md text-white cursor-pointer hover:bg-gray-600 transition-[2s]">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/FFFFFF/edit--v1.png" alt="edit--v1" />
                            <span className="sidebar-text ml-[10px]">Modificar Pel·lícula</span>
                        </p>

                        <p className="mb-[10px] group flex items-center px-2 py-2 text-base font-medium rounded-md text-white cursor-pointer hover:bg-gray-600 transition-[2s]">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/FFFFFF/delete-sign--v1.png" alt="delete-sign--v1" />
                            <span className="sidebar-text ml-[10px]">Eliminar Pel·lícula</span>
                        </p>

                        <p className="mb-[10px] group flex items-center px-2 py-2 text-base font-medium rounded-md text-white cursor-pointer hover:bg-gray-600 transition-[2s]">
                            <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/FFFFFF/eye-checked.png" alt="eye-checked" />
                            <span className="sidebar-text ml-[10px]">Modificar Visibilitat</span>
                        </p>
                    </div>
                </nav>
            </aside>

            <div className="flex-grow p-4 h-[100vh] bg-gray-100">
                <AfegirPeliculaForm />
            </div>
        </div>
    );
}