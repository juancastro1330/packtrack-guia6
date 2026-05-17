const STATUS_ORDER = ['Registrado', 'En bodega', 'En ruta', 'Entregado']

const STATUS_BADGE = {
  'En ruta': 'bg-blue-100 text-blue-800',
  'En bodega': 'bg-yellow-100 text-yellow-800',
  Entregado: 'bg-green-100 text-green-800',
  Registrado: 'bg-gray-100 text-gray-700',
}

export default function EstadoPaquete({ pkg }) {
  const currentIdx = STATUS_ORDER.indexOf(pkg.estado)

  return (
    <div className="space-y-5">
      {/* Package details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="flex gap-2">
          <span className="text-gray-500 shrink-0">N° Guía:</span>
          <span className="font-mono font-semibold text-gray-900">{pkg.guia}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-gray-500 shrink-0">Estado:</span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              STATUS_BADGE[pkg.estado] ?? 'bg-gray-100 text-gray-700'
            }`}
          >
            {pkg.estado}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-500 shrink-0">Remitente:</span>
          <span className="font-medium text-gray-800">{pkg.remitente}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-500 shrink-0">Destinatario:</span>
          <span className="font-medium text-gray-800">{pkg.destinatario}</span>
        </div>
        {pkg.direccionDestino && (
          <div className="flex gap-2 sm:col-span-2">
            <span className="text-gray-500 shrink-0">Destino:</span>
            <span className="text-gray-700">{pkg.direccionDestino}</span>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Seguimiento del envío
        </p>
        <div className="flex items-start">
          {STATUS_ORDER.map((step, idx) => {
            const isCompleted = idx <= currentIdx
            const isCurrent = idx === currentIdx

            return (
              <div key={step} className="flex items-start flex-1 last:flex-none">
                {/* Circle + label */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                      isCurrent
                        ? 'border-orange-500 bg-orange-500 text-white scale-110 shadow-md'
                        : isCompleted
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                    }`}
                  >
                    {isCompleted ? (isCurrent ? idx + 1 : '✓') : idx + 1}
                  </div>
                  <span
                    className={`text-xs mt-1.5 text-center leading-tight max-w-[64px] ${
                      isCurrent
                        ? 'text-orange-600 font-semibold'
                        : isCompleted
                        ? 'text-green-600 font-medium'
                        : 'text-gray-400'
                    }`}
                  >
                    {step}
                  </span>
                </div>

                {/* Connector line */}
                {idx < STATUS_ORDER.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mt-4 mx-1 transition-colors duration-300 ${
                      idx < currentIdx ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
