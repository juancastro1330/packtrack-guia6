import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const linkClass = (path) =>
    `px-4 py-2 rounded text-sm font-medium transition-colors ${
      pathname === path
        ? 'text-white'
        : 'text-blue-200 hover:text-white hover:bg-blue-800'
    }`

  const activeStyle = { backgroundColor: '#F97316' }

  return (
    <nav style={{ backgroundColor: '#1E3A5F' }} className="shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-white tracking-wide select-none">
          PackTrack
        </Link>
        <div className="flex gap-2">
          <Link
            to="/"
            className={linkClass('/')}
            style={pathname === '/' ? activeStyle : {}}
          >
            Rastrear Paquete
          </Link>
          <Link
            to="/admin"
            className={linkClass('/admin')}
            style={pathname === '/admin' ? activeStyle : {}}
          >
            Panel Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}
