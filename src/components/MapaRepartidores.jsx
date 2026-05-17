import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const DRIVER_COLOR = {
  Activo: '#22c55e',
  'En descanso': '#f59e0b',
  Inactivo: '#ef4444',
}

export default function MapaRepartidores({ repartidores }) {
  return (
    <MapContainer
      center={[-12.0972, -77.0428]}
      zoom={12}
      style={{ height: '400px', width: '100%', borderRadius: '8px' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {repartidores.map((rep) => (
        <Marker key={rep.id} position={[rep.lat, rep.lng]}>
          <Popup>
            <div style={{ minWidth: '130px' }}>
              <p style={{ fontWeight: '700', marginBottom: '4px', fontSize: '14px' }}>
                {rep.nombre}
              </p>
              <p style={{ fontSize: '13px' }}>
                Estado:{' '}
                <span
                  style={{
                    color: DRIVER_COLOR[rep.estado] ?? '#555',
                    fontWeight: '600',
                  }}
                >
                  {rep.estado}
                </span>
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
