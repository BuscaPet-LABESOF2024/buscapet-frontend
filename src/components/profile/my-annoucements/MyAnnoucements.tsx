import AnnouncementCard from '../../../components/announcement/AnnouncementCard';
import { useGetMyAnnouncements } from '@/api/announcement/hooks';
import HomeSection from '../../commons/HomeSection';
import { fetchAnnouncementDetails } from '@/api/announcement';
import { useNavigate } from 'react-router-dom';

export default function MyAnnouncements() {
  const { data: myAnnouncements, isError, isPending } = useGetMyAnnouncements();

  const navigate = useNavigate();

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        Erro ao carregar seus anúncios...
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        Carregando seus anúncios...
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeSection id="my-announcements" divClassName="py-8">
        <div className="flex flex-col gap-6 container mx-auto p-4 mt-8 w-full max-w-7xl px-4">
          <h2 className="font text-4xl text-center mb-2">Meus Anúncios</h2>
          <div>
            {myAnnouncements.length === 0 ? (
              <p className="text-center">
                Você ainda não criou nenhum anúncio.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {myAnnouncements.map((announcement) => (
                  <AnnouncementCard
                    key={announcement.id}
                    id={announcement.id}
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
      </HomeSection>
    </div>
  );
}
