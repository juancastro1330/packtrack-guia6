import { useState } from 'react'

export default function FormularioRastreo({ onSearch, notFound }) {
  const [guia, setGuia] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = guia.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          value={guia}
          onChange={(e) => setGuia(e.target.value)}
          placeholder="Ingrese N° de Guía  (ej: PKG-1000000001)"
          className="flex-1 border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="text-white px-6 py-2.5 rounded font-semibold text-sm transition hover:opacity-90 active:scale-95 whitespace-nowrap"
          style={{ backgroundColor: '#F97316' }}
        >
          Buscar
        </button>
      </form>
      {notFound && (
        <p className="text-red-500 text-sm mt-3">
          No se encontró ningún paquete con ese número de guía. Verifique e intente nuevamente.
        </p>
      )}
    </div>
  )
}
