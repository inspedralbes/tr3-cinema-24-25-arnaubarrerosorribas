"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Film, Calendar, MapPin, Play, Mail, LogIn } from "lucide-react";

export default function Home() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const movies = [
        {
            title: "El lobo de Wall Street",
            description: "La tan esperada seqüela de ciència-ficció.",
            image: "https://imgs.search.brave.com/43i_v97Bbibaq2X7cQ1t6_P8Le-Qk_cbN3Fxs3I8a3w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzkxbTJNQjJsWUZM/LmpwZw"
        },
        {
            title: "El Correo",
            description: "La història del pare de la bomba atòmica.",
            image: "https://imgs.search.brave.com/ISxLp2lqKXW0h9wgsc8mBe6zDz6ar8IsqEgbMq38H-s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9lbC1j/b3JyZW8tcG9zdGVy/LTY1YWU4OTFmNDgz/YjguanBnP3Jlc2l6/ZT05ODA6Kg"
        },
        {
            title: "Top Boy",
            description: "La icònica nina en una aventura èpica.",
            image: "https://imgs.search.brave.com/sF73a2caKYurQiSrdHlzC6fjR5ikIDWyGS2HIQazKIY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waWNz/LmZpbG1hZmZpbml0/eS5jb20vdG9wX2Jv/eS04NDIzMjc0OTQt/bW1lZC5qcGc"
        }
    ];

    const fakeCalendar = [
        { date: "2025-03-15", event: "Estrena El lobo de Wall Street" },
        { date: "2025-03-22", event: "Preestrena El Correo" },
        { date: "2025-03-29", event: "Marató Top Boy" }
    ];

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="relative h-screen">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')"
                    }}
                />
                <nav className="relative z-20 px-6 py-8">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Film className="w-8 h-8 text-blue-500" />
                            <span className="text-2xl font-bold">Cine Pedralbes</span>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            <a href="#cartellera" className="hover:text-blue-500 transition-colors">Cartellera</a>
                            <a href="#horaris" className="hover:text-blue-500 transition-colors">Horaris</a>
                            <a href="#ubicacio" className="hover:text-blue-500 transition-colors">Ubicació</a>
                            <button onClick={() => { router.push('/user/login'); }} className="hover:text-blue-500 transition-colors flex" >
                                <LogIn className="w-5 h-5 mr-[20px]" />
                                Iniciar Sessió
                            </button>

                        </div>
                    </div>
                </nav>

                <div className="relative z-20 h-full flex items-center">
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6">
                                La millor experiència
                                <span className="block text-blue-500">cinematogràfica</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                                Gaudeix del setè art a les nostres sales equipades amb la darrera tecnologia i el màxim confort.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <section id="cartellera" className="py-20 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center">Cartellera</h2>
                    <div className="grid md:grid-cols-3 gap-12 place-items-center">
                        {movies.map((movie, index) => (
                            <div key={index} className="text-center">
                                <img src={movie.image} alt={movie.title} className="mb-4 h-[300px] rounded-lg" />
                                <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                                <p className="text-gray-400">{movie.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="horaris" className="py-20 bg-black text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center">Calendari</h2>
                    <ul className="text-gray-400 text-center space-y-4">
                        {fakeCalendar.map((item, index) => (
                            <li key={index} className="text-lg">{item.date} - {item.event}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
