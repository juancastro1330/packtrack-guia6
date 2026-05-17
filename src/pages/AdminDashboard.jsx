import { useState, useEffect } from 'react'
import PaqueteForm from '../components/PaqueteForm'
import PaquetesTable from '../components/PaquetesTable'
import MapaRepartidores from '../components/MapaRepartidores'
import usePackages from '../hooks/usePackages'
import { getRepartidores } from '../services/packageService'

const TABS = [
  { label: 'Registrar Paquete', icon: '📦' },
  { label: 'Lista de Paquetes', icon: '📋' },
  { label: 'Mapa de Repartidores', icon: '🗺️' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const [repartidores, setRepartidores] = useState([])
  const { packages, loading, addNewPackage, cycleStatus } = usePackages()

  useEffect(() => {
    getRepartidores().then(setRepartidores)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page header */}
      <div style={{ backgroundColor: '#1E3A5F' }} className="py-7">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
          <p className="text-blue-200 text-sm mt-1">
            Gestión de paquetes y repartidores en tiempo real
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 gap-1">
          {TABS.map((tab, idx) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors rounded-t ${
                activeTab === idx
                  ? 'border-orange-500 text-orange-600 bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-1.5">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {activeTab === 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Registrar Nuevo Paquete
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                Complete los datos del envío. El N° de guía se genera automáticamente.
              </p>
              <PaqueteForm onAddPackage={addNewPackage} />
            </div>
          )}

          {activeTab === 1 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Lista de Paquetes
                </h2>
                <span className="text-sm text-gray-400">
                  {packages.length} registro{packages.length !== 1 ? 's' : ''}
                </span>
              </div>
              {loading ? (
                <div className="py-10 text-center text-gray-400 text-sm">
                  Cargando paquetes...
                </div>
              ) : (
                <PaquetesTable packages={packages} onCycleStatus={cycleStatus} />
              )}
            </div>
          )}

          {activeTab === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                Mapa de Repartidores
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                Ubicación actual de los {repartidores.length} repartidores activos.
              </p>
              <MapaRepartidores repartidores={repartidores} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
