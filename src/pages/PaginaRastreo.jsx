import { useState } from 'react'
import FormularioRastreo from '../components/FormularioRastreo'
import EstadoPaquete from '../components/EstadoPaquete'
import MapaRastreo from '../components/MapaRastreo'
import { findPackageByGuia } from '../services/packageService'

export default function PaginaRastreo() {
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (guia) => {
    setLoading(true)
    setNotFound(false)
    setResult(null)

    const pkg = await findPackageByGuia(guia)

    setLoading(false)
    if (pkg) {
      setResult(pkg)
    } else {
      setNotFound(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero / search section */}
      <div style={{ backgroundColor: '#1E3A5F' }} className="py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Rastrear Paquete</h1>
          <p className="text-blue-200 mb-7 text-sm">
            Ingresa tu número de guía para conocer el estado actual de tu envío
          </p>
          <div className="bg-white rounded-xl p-5 shadow-xl">
            <FormularioRastreo onSearch={handleSearch} notFound={notFound} />
          </div>
          <p className="text-blue-300 text-xs mt-4">
            Puedes probar con: PKG-1000000001 · PKG-1000000002 · PKG-1000000003
          </p>
        </div>
      </div>

      {/* Results section */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-10 text-gray-500 text-sm">
            Buscando paquete...
          </div>
        )}

        {result && (
          <div className="space-y-5 animate-fade-in">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Estado del Envío
              </h2>
              <EstadoPaquete pkg={result} />
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                Ubicación Actual del Paquete
              </h2>
              <MapaRastreo pkg={result} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
