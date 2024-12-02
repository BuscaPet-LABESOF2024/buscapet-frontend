import AnnouncementCard from '../announcement/AnnouncementCard';
import Header from '../home/header/Header';
import FilterForm from './FilterForm';
import Footer from '../home/Footer';
import type { FilterFormSchemaType } from './types';
import { useGetAnnouncementsWithFilter } from '@/api/announcement/hooks';
import { useState } from 'react';
import { LoadingSpinner } from '../loading-spinner/LoadingSpinner';
import { fetchAnnouncementDetails } from '@/api/announcement';
import { useNavigate } from 'react-router-dom';

export default function AllAnnouncements() {
  const [filters, setFilters] = useState<FilterFormSchemaType>({
    announcementType: '',
    animalSize: '',
  });

  const navigate = useNavigate();

  const {
    data: announcements,
    isError,
    isPending,
  } = useGetAnnouncementsWithFilter({
    filters,
  });

  const handleFilterSubmit = (formData: FilterFormSchemaType) => {
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
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col gap-8 mx-auto p-4 mt-24 w-full max-w-7xl px-4">
        <FilterForm onSubmit={handleFilterSubmit} />
        <h2 className="font-bold text-4xl text-center mb-4">
          Últimos anúncios
        </h2>
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
