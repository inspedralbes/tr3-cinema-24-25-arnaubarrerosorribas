const Host = process.env.NEXT_PUBLIC_CM_HOST;

// ========= POST =======================
export const login = async (email, password) => {
    try {
        const response = await fetch(`${Host}/autentificacio/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        localStorage.setItem('Login Token', data.token)
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const register = async (name, apellidos, email, password,password_confirmation) => {
    try {
        const response = await fetch(`${Host}/autentificacio/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, apellidos, email, password, password_confirmation }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const publicarResposta = async (formData) => {
    try {
        const response = await fetch(`${Host}/pelicules/publicar-pelicula`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const eliminarPelicula = async (index) => {
    try {
        const response = await fetch(`${Host}/pelicules/eliminar/${index}`, {
            method: 'POST',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const publicarModificacions = async (formData) => {
    try {
        const response = await fetch(`${Host}/pelicules/modificacions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const CompraEntradas = async (formData) => {
    try {
        const response = await fetch(`${Host}/entradas/fer-compra`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

// ========= GET ========================
export const peliculasDisponibles = async () => {
    try {
        const response = await fetch(`${Host}/pelicules/cateleg-disponibles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const peliculasDisponiblesAmbCategoria = async () => {
    try {
        const response = await fetch(`${Host}/pelicules/pelicules-disp-categ`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const categoriasCCMM = async () => {
    try {
        const response = await fetch(`${Host}/categorias/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const peliculaSeleccionada = async (index) => {
    try {
        const response = await fetch(`${Host}/pelicules/seleccionada/${index}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const peliculas = async () => {
    try {
        const response = await fetch(`${Host}/pelicules/cataleg`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const totesPeliculas = async () => {
    try {
        const response = await fetch(`${Host}/pelicules/totes_pelicules`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const PeliculasOcupadasPelicula = async (id) => {
    try {
        const response = await fetch(`${Host}/entradas/getButacasPelicula/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};

export const userInfo = async (Token) => {
    try {
        const response = await fetch(`${Host}/user/info`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json(); 
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};