'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'; // Ou outro método de navegação
import {
  AnnouncementApi,
  AnnouncementResponse,
  fetchAnnouncementDetails,
} from '../../api/announcement';
import AnnouncementCard from '../announcement/AnnouncementCard';
import Header from '../home/header/Header';
import FilterForm, { FilterFormData } from './FilterForm';
import Footer from '../home/Footer';

export default function AllAnnouncements() {
  const [filters, setFilters] = useState<FilterFormData>({
    announcementType: '',
    neighborhood: '',
    animalBreed: '',
  });

  const navigate = useNavigate();

  const {
    data: announcements,
    isError,
    isPending,
  } = useQuery<AnnouncementResponse[]>({
    queryKey: ['announcements', filters],
    queryFn: () => AnnouncementApi.getAnnouncementsWithFilter(filters),
  });

  const handleFilterSubmit = (formData: FilterFormData) => {
    setFilters(formData);
  };

  const handleViewDetails = async (id: number) => {
    console.log(id);
    try {
      // Chama o backend para buscar os detalhes do anúncio
      const announcementDetails = await fetchAnnouncementDetails(id);

      // Navega para a página de detalhes e passa os dados como estado
      navigate(`/announcement-details/${id}`, {
        state: { announcementDetails },
      });
    } catch (error) {
      console.error('Erro ao buscar os detalhes do anúncio:', error);
    }
  };

  if (isError) {
    return <div>Erro ao carregar os anúncios...</div>;
  }

  if (isPending) {
    return <div>Carregando anúncios...</div>;
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
              {announcements &&
                announcements.map((announcement) => (
                  <AnnouncementCard
                    key={announcement.id}
                    id={announcement.id} // Passa o id do anúncio
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
                    onViewDetails={handleViewDetails}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
