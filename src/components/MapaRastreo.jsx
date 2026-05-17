import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default function MapaRastreo({ pkg }) {
  const { lat, lng } = pkg.coordenadas

  return (
    // key forces remount when tracking a different package so center updates correctly
    <MapContainer
      key={pkg.guia}
      center={[lat, lng]}
      zoom={14}
      style={{ height: '400px', width: '100%', borderRadius: '8px' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          <div style={{ minWidth: '140px' }}>
            <p style={{ fontWeight: '700', marginBottom: '4px', fontFamily: 'monospace', fontSize: '13px' }}>
              {pkg.guia}
            </p>
            <p style={{ fontSize: '13px', marginBottom: '2px' }}>{pkg.estado}</p>
            {pkg.direccionDestino && (
              <p style={{ fontSize: '12px', color: '#666' }}>{pkg.direccionDestino}</p>
            )}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
