import { useState, useEffect } from 'react'
import { getPackages, addPackage, updatePackageStatus } from '../services/packageService'

const STATUS_CYCLE = ['En ruta', 'En bodega', 'Entregado']

export default function usePackages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPackages().then((data) => {
      setPackages(data)
      setLoading(false)
    })
  }, [])

  const addNewPackage = async (pkg) => {
    const added = await addPackage(pkg)
    setPackages((prev) => [...prev, added])
    return added
  }

  const cycleStatus = async (guia) => {
    const pkg = packages.find((p) => p.guia === guia)
    if (!pkg) return
    const currentIdx = STATUS_CYCLE.indexOf(pkg.estado)
    // If status not in cycle (e.g. "Registrado"), start from index 0
    const nextStatus = STATUS_CYCLE[(currentIdx + 1) % STATUS_CYCLE.length]
    await updatePackageStatus(guia, nextStatus)
    setPackages((prev) =>
      prev.map((p) => (p.guia === guia ? { ...p, estado: nextStatus } : p))
    )
  }

  return { packages, loading, addNewPackage, cycleStatus }
}
