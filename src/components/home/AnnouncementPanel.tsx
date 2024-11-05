import AnnouncementCard from '../../components/announcement/AnnouncementCard';
import { useGetAnnouncements } from '@/api/announcement/hooks';

const AnnouncementPanel: React.FC = () => {
  const { data: announcements, isError, isPending } = useGetAnnouncements();

  if (isError) {
    return <div>Erro ao carregar os anúncios...</div>;
  }

  if (isPending) {
    return <div>Carregando anúncios...</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-24 w-full max-w-7xl px-4">
      {announcements.length === 0 ? (
        <p className="text-center">Nenhum anúncio encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              description={announcement.description}
              contactPhone={announcement.contactPhone}
              contactEmail={announcement.contactEmail}
              animal={announcement.animal}
              images={
                announcement.images
                  ? announcement.images.filter((image) => image.image !== null)
                  : []
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementPanel;
