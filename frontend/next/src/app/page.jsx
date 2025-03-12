import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
            {/* Header */}
            <header style={{ backgroundColor: '#0070f3', padding: '20px', color: 'white', textAlign: 'center' }}>
                <h1 style={{ margin: 0 }}>Cine Pedralbes</h1>
                <p style={{ margin: 0 }}>Tu destino para las mejores películas</p>
            </header>

            {/* Hero Section */}
            <div style={{ backgroundColor: '#f0f0f0', padding: '50px 20px', textAlign: 'center' }}>
                <h2 style={{ color: '#0070f3', fontSize: '2.5rem', marginBottom: '20px' }}>Bienvenido a Cine Pedralbes</h2>
                <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
                    Disfruta de las últimas películas en la mejor calidad. ¡Reserva tus entradas ahora!
                </p>
                <Link href="/user/login">
                    <button
                        style={{
                            padding: '15px 30px',
                            backgroundColor: '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                        }}
                    >
                        Iniciar Sesión
                    </button>
                </Link>
            </div>

            {/* Películas Destacadas */}
            <section style={{ padding: '40px 20px', textAlign: 'center' }}>
                <h2 style={{ color: '#0070f3', fontSize: '2rem', marginBottom: '20px' }}>Películas Destacadas</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    {/* Película 1 */}
                    <div style={{ width: '200px', textAlign: 'center' }}>
                        <h3 style={{ margin: '10px 0' }}>Película 1</h3>
                        <p style={{ fontSize: '0.9rem' }}>Descripción breve de la película 1.</p>
                    </div>

                    {/* Película 2 */}
                    <div style={{ width: '200px', textAlign: 'center' }}>
                        <h3 style={{ margin: '10px 0' }}>Película 2</h3>
                        <p style={{ fontSize: '0.9rem' }}>Descripción breve de la película 2.</p>
                    </div>

                    {/* Película 3 */}
                    <div style={{ width: '200px', textAlign: 'center' }}>
                        <h3 style={{ margin: '10px 0' }}>Película 3</h3>
                        <p style={{ fontSize: '0.9rem' }}>Descripción breve de la película 3.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ backgroundColor: '#0070f3', padding: '20px', color: 'white', textAlign: 'center' }}>
                <p style={{ margin: 0 }}>© 2023 Cine Pedralbes. Todos los derechos reservados.</p>
                <p style={{ margin: 0 }}>
                    <Link href="/politica-privacidad" style={{ color: 'white', textDecoration: 'underline' }}>
                        Política de Privacidad
                    </Link>
                </p>
            </footer>
        </div>
    );
}