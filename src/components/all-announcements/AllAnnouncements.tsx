import { useGetAnnouncements } from '@/api/announcement/hooks';
import AnnouncementCard from '../announcement/AnnouncementCard';
import Header from '../home/header/Header';

export default function AllAnnouncements() {
  const { data: announcements, isError, isPending } = useGetAnnouncements();

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
        <div>
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
    </>
  );
}
