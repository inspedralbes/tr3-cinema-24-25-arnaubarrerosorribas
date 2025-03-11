'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../plugins/communicationManager';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login(email, password);
            localStorage.setItem('User ID', response.user.id)

            if (response.token) {
                router.push('/home')
            }
        } catch (error) {
            alert("Error en la solicitud");
        }
    };

    const reedireccionarRegistro = () => {
        router.push('/user/register');
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-gray-900 p-8 shadow-lg w-full max-w-md">
                <h1 className="font-bold text-3xl text-blue-500 text-center mb-6">
                    Inici de Sessió
                </h1>
                <form className="space-y-6">
                    <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="password" placeholder="Contrasenya" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button onClick={handleLogin} className="w-full bg-blue-500 text-white font-bold py-3 hover:bg-blue-600 transition-colors cursor-pointer" >
                        Iniciar Sessió
                    </button>
                </form>
                <p onClick={reedireccionarRegistro} className="mt-6 text-right text-blue-500 hover:text-blue-400 cursor-pointer transition-colors" >
                    Crear Usuari
                </p>

                <p className="mt-6 text-right text-blue-500 hover:text-blue-400 cursor-pointer transition-colors" >
                    Recuperar la Contrasenya
                </p>
            </div>
        </div>
    );
}