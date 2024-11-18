'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AnnouncementApi, AnnouncementResponse } from '../../api/announcement'
import AnnouncementCard from '../announcement/AnnouncementCard'
import Header from '../home/header/Header'
import FilterForm, { FilterFormData } from './FilterForm'
import Footer from '../home/Footer'

export default function AllAnnouncements() {
  const [filters, setFilters] = useState<FilterFormData>({
    announcementType: '',
    neighborhood: '',
    animalBreed: ''
  })

  const { data: announcements, isError, isPending } = useQuery<AnnouncementResponse[]>({
    queryKey: ['announcements', filters],
    queryFn: () => AnnouncementApi.getAnnouncementsWithFilter(filters)
  })

  const handleFilterSubmit = (formData: FilterFormData) => {
    setFilters(formData)
  }

  if (isError) {
    return <div>Erro ao carregar os anúncios...</div>
  }

  if (isPending) {
    return <div>Carregando anúncios...</div>
  }

  return (
    <>
      <Header />
      <div className="flex flex-col gap-6 container mx-auto p-4 mt-8 w-full max-w-7xl px-4">
        <h2 className="font-bold text-4xl text-center mb-8">
          Últimos anúncios
        </h2>
        <FilterForm onSubmit={handleFilterSubmit} />
        <div>
          {announcements && announcements.length === 0 ? (
            <p className="text-center">Nenhum anúncio encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {announcements && announcements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  title={announcement.title}
                  description={announcement.description}
                  contactPhone={announcement.contactPhone}
                  contactEmail={announcement.contactEmail}
                  animal={announcement.animal}
                  images={
                    announcement.images
                      ? announcement.images.filter(
                          (image) => image.image !== null
                        )
                      : []
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}