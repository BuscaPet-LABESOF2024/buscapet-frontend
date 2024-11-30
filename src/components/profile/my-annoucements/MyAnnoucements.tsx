import AnnouncementCard from '../../../components/announcement/AnnouncementCard';
import { useGetMyAnnouncements } from '@/api/announcement/hooks';
import HomeSection from '../../commons/HomeSection';

export default function MyAnnouncements() {
  const { data: myAnnouncements, isError, isPending } = useGetMyAnnouncements();

  if (isError) {
    return <div className="min-h-screen bg-gray-50 flex justify-center items-center">Erro ao carregar seus anúncios...</div>;
  }

  if (isPending) {
    return <div className="min-h-screen bg-gray-50 flex justify-center items-center">Carregando seus anúncios...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeSection id="my-announcements" divClassName="py-8">
        <div className="flex flex-col gap-6 container mx-auto p-4 mt-8 w-full max-w-7xl px-4">
          <h2 className="font text-4xl text-center mb-2">Meus Anúncios</h2>
          <div>
            {myAnnouncements.length === 0 ? (
              <p className="text-center">Você ainda não criou nenhum anúncio.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {myAnnouncements.map((announcement) => (
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
        </div>
      </HomeSection>
    </div>
  );
}

