'use client';

export default function Page() {
    return (
        <>
            <form className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="movieName" className="block text-sm font-medium text-gray-700">Nom de la pel·lícula</label>
                    <input type="text" id="movieName" placeholder="Nom de la pel·lícula"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripció</label>
                    <textarea id="description" placeholder="Descripció" rows="4"
                        className="resize-none h-[100px] mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="options" className="block text-sm font-medium text-gray-700">Selecciona una opció</label>
                    <select id="options"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="1">Por</option>
                        <option value="2">Tul</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">Puja una imatge</label>
                    <input type="file" id="file"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                <button type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Enviar
                </button>
            </form>
        </>
    )
}