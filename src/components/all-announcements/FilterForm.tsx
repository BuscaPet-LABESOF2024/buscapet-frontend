'use client'

import React from 'react'
import { useGetAnnouncementTypes, useGetNeighborhoods, useGetBreeds } from '../../api/Filters/hooks'

export interface FilterFormData {
  announcementType: string
  neighborhood: string
  animalBreed: string
}

interface FilterFormProps {
  onSubmit: (data: FilterFormData) => void
}

export default function FilterForm({ onSubmit }: FilterFormProps) {
  const { data: announcementTypes } = useGetAnnouncementTypes()
  const { data: neighborhoods } = useGetNeighborhoods()
  const { data: breeds } = useGetBreeds()

  const [formData, setFormData] = React.useState<FilterFormData>({
    announcementType: '',
    neighborhood: '',
    animalBreed: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="announcementType" className="block text-sm font-medium text-gray-700">Tipo de Anúncio</label>
        <select
          id="announcementType"
          name="announcementType"
          value={formData.announcementType}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Selecione o tipo de anúncio</option>
          {announcementTypes?.map(type => (
            <option key={type.id} value={type.id.toString()}>{type.description}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Bairro</label>
        <select
          id="neighborhood"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Selecione o bairro</option>
          {neighborhoods?.map(neighborhood => (
            <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="animalBreed" className="block text-sm font-medium text-gray-700">Raça</label>
        <select
          id="animalBreed"
          name="animalBreed"
          value={formData.animalBreed}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Selecione a raça</option>
          {breeds?.map(breed => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Filtrar
      </button>
    </form>
  )
}