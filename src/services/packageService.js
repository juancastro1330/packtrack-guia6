import { mockPackages, mockRepartidores } from './mockData'

const delay = () => new Promise((resolve) => setTimeout(resolve, 300))

export const getPackages = async () => {
  await delay()
  return [...mockPackages]
}

export const findPackageByGuia = async (guia) => {
  await delay()
  return mockPackages.find((p) => p.guia === guia) ?? null
}

export const addPackage = async (pkg) => {
  await delay()
  mockPackages.push(pkg)
  return pkg
}

export const updatePackageStatus = async (guia, newStatus) => {
  await delay()
  const pkg = mockPackages.find((p) => p.guia === guia)
  if (pkg) pkg.estado = newStatus
  return pkg ?? null
}

export const getRepartidores = async () => {
  await delay()
  return [...mockRepartidores]
}
