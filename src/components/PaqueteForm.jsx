import { useState } from 'react'

const INITIAL_FORM = {
  remitente: '',
  destinatario: '',
  alto: '',
  ancho: '',
  peso: '',
  direccionDestino: '',
}

function validate(form) {
  const errors = {}
  if (!form.remitente.trim()) errors.remitente = 'El remitente es requerido'
  if (!form.destinatario.trim()) errors.destinatario = 'El destinatario es requerido'
  if (!form.alto || isNaN(form.alto) || Number(form.alto) <= 0)
    errors.alto = 'Alto inválido'
  if (!form.ancho || isNaN(form.ancho) || Number(form.ancho) <= 0)
    errors.ancho = 'Ancho inválido'
  if (!form.peso || isNaN(form.peso) || Number(form.peso) <= 0)
    errors.peso = 'Peso inválido'
  if (!form.direccionDestino.trim())
    errors.direccionDestino = 'La dirección de destino es requerida'
  return errors
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

function Input({ name, value, onChange, errors, ...rest }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
        errors[name] ? 'border-red-400' : 'border-gray-300'
      }`}
      {...rest}
    />
  )
}

export default function PaqueteForm({ onAddPackage }) {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})

    const newPkg = {
      guia: `PKG-${Date.now()}`,
      remitente: form.remitente.trim(),
      destinatario: form.destinatario.trim(),
      estado: 'En ruta',
      coordenadas: {
        lat: -12.0464 + (Math.random() - 0.5) * 0.12,
        lng: -77.0428 + (Math.random() - 0.5) * 0.12,
      },
      dimensiones: {
        alto: parseFloat(form.alto),
        ancho: parseFloat(form.ancho),
        peso: parseFloat(form.peso),
      },
      direccionDestino: form.direccionDestino.trim(),
    }

    await onAddPackage(newPkg)
    setForm(INITIAL_FORM)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      {success && (
        <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-2 rounded text-sm">
          Paquete registrado exitosamente. N° de guía generado automáticamente.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Remitente" error={errors.remitente}>
          <Input
            name="remitente"
            value={form.remitente}
            onChange={handleChange}
            errors={errors}
            placeholder="Nombre completo del remitente"
          />
        </Field>
        <Field label="Destinatario" error={errors.destinatario}>
          <Input
            name="destinatario"
            value={form.destinatario}
            onChange={handleChange}
            errors={errors}
            placeholder="Nombre completo del destinatario"
          />
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Alto (cm)" error={errors.alto}>
          <Input
            name="alto"
            type="number"
            min="0"
            step="0.1"
            value={form.alto}
            onChange={handleChange}
            errors={errors}
            placeholder="0"
          />
        </Field>
        <Field label="Ancho (cm)" error={errors.ancho}>
          <Input
            name="ancho"
            type="number"
            min="0"
            step="0.1"
            value={form.ancho}
            onChange={handleChange}
            errors={errors}
            placeholder="0"
          />
        </Field>
        <Field label="Peso (kg)" error={errors.peso}>
          <Input
            name="peso"
            type="number"
            min="0"
            step="0.01"
            value={form.peso}
            onChange={handleChange}
            errors={errors}
            placeholder="0.00"
          />
        </Field>
      </div>

      <Field label="Dirección de Destino" error={errors.direccionDestino}>
        <Input
          name="direccionDestino"
          value={form.direccionDestino}
          onChange={handleChange}
          errors={errors}
          placeholder="Av. Ejemplo 123, Distrito, Ciudad"
        />
      </Field>

      <button
        type="submit"
        className="w-full text-white py-2.5 px-4 rounded font-semibold text-sm transition hover:opacity-90 active:scale-95"
        style={{ backgroundColor: '#F97316' }}
      >
        Registrar Paquete
      </button>
    </form>
  )
}
