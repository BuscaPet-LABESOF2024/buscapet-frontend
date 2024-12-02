import AnnouncementCard from '../../components/announcement/AnnouncementCard';
import { useGetLastAnnouncements } from '@/api/announcement/hooks';
import { Button } from '../ui/button';
import HomeSection from '../commons/HomeSection';
import { useNavigate } from 'react-router-dom';
import { fetchAnnouncementDetails } from '@/api/announcement';

const AnnouncementPanel = () => {
  const { data: announcements, isError, isPending } = useGetLastAnnouncements();
  const navigate = useNavigate();

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
    <HomeSection id="announcements" divClassName="py-8">
      <div className="flex flex-col gap-6 container mx-auto p-4 mt-8 w-full max-w-7xl px-4">
        <h2 className="font-bold text-4xl text-center mb-8">
          Últimos anúncios
        </h2>
        <div>
          {announcements.length === 0 ? (
            <p className="text-center">Nenhum anúncio encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {announcements.map((announcement, index) =>
                index < 4 ? (
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
                ) : null
              )}
            </div>
          )}
        </div>
        {announcements.length > 0 && (
          <Button
            onClick={() => navigate('/all-announcements')}
            className="w-fit self-end bg-green-400 hover:bg-green-500 mt-4"
          >
            Ver mais anúncios
          </Button>
        )}
      </div>
    </HomeSection>
  );
};

export default AnnouncementPanel;
