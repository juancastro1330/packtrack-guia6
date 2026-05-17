const STATUS_BADGE = {
  'En ruta': 'bg-blue-100 text-blue-800',
  'En bodega': 'bg-yellow-100 text-yellow-800',
  Entregado: 'bg-green-100 text-green-800',
  Registrado: 'bg-gray-100 text-gray-700',
}

const HEADERS = ['N° Guía', 'Remitente', 'Destinatario', 'Estado', 'Acciones']

export default function PaquetesTable({ packages, onCycleStatus }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead style={{ backgroundColor: '#1E3A5F' }}>
          <tr>
            {HEADERS.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {packages.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                No hay paquetes registrados aún.
              </td>
            </tr>
          ) : (
            packages.map((pkg) => (
              <tr key={pkg.guia} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-mono text-gray-800 whitespace-nowrap">
                  {pkg.guia}
                </td>
                <td className="px-4 py-3 text-gray-700">{pkg.remitente}</td>
                <td className="px-4 py-3 text-gray-700">{pkg.destinatario}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      STATUS_BADGE[pkg.estado] ?? 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {pkg.estado}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onCycleStatus(pkg.guia)}
                    className="px-3 py-1 rounded border border-gray-300 text-gray-600 text-xs hover:bg-gray-100 hover:border-gray-400 transition-colors"
                  >
                    Cambiar estado
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
