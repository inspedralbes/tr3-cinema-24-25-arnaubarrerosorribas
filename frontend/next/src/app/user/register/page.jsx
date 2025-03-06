'use client'
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '../../plugins/communicationManager';

export default function RegisterForm() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password == password_confirmation) {
            try {
                const response = await register(name, apellidos, email, password, password_confirmation);

                Swal.fire({
                    title: "Usuari registrar correctament! Revisa el teu email.",
                    background: "#111827",
                    icon: "success",
                    color: "white",
                });
            } catch (error) {
                if (error.message == 'Error 409: Conflict') {
                    Swal.fire({
                        icon: "error",
                        color: "white",
                        background: "#111827",
                        title: "L'usuari ja existeix.",
                    });
                }
            }
        } else {
            Swal.fire({
                title: "Les contrasenyes han de coincidir.",
                background: "#111827",
                icon: "question",
                color: "white",
            });
            return
        }
    }

    const reefireccionarLogin = () => {
        router.push('/user/login');
    }
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-gray-900 p-8 shadow-lg w-full max-w-md">
                <h1 className="font-bold text-3xl text-blue-500 text-center mb-6">
                    Registre d'usuari
                </h1>
                <form className="space-y-6">
                    <input
                        type="text"
                        placeholder="Nom"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder='Cognoms'
                        required
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Contrasenya"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder='Confirma la contrasenya'
                        required
                        value={password_confirmation}
                        onChange={(e) => setPassword_confirmation(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleRegister}
                        className="w-full bg-blue-500 text-white font-bold py-3 hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                        Crear Usuari
                    </button>
                </form>
                <p
                    onClick={reefireccionarLogin}
                    className="mt-6 text-right text-blue-500 hover:text-blue-400 cursor-pointer transition-colors"
                >
                    Iniciar Sessió
                </p>
            </div>
        </div>
    )
}