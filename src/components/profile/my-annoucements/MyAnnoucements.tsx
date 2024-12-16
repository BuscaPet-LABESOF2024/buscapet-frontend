import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyAnnouncements } from '@/api/announcement/hooks';
import {
  deleteAnnouncement,
  fetchAnnouncementDetails,
} from '@/api/announcement';
import HomeSection from '../../commons/HomeSection';
import UserAnnouncementCard from '@/components/user-annoucement-card/UserAnnouncementCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function MyAnnouncements() {
  const { data: myAnnouncements, isError, isPending } = useGetMyAnnouncements();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [announcementToDeactivate, setAnnouncementToDeactivate] = useState<
    number | null
  >(null);
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
    try {
      const announcementDetails = await fetchAnnouncementDetails(id);
      navigate(`/announcement-details/${id}`, {
        state: { announcementDetails },
      });
    } catch (error) {
      console.error('Erro ao buscar os detalhes do anúncio:', error);
    }
  };

  const handleEdit = (id: number) => {
    navigate('/announcement-edit', { state: { id } });
    console.log('Editando anúncio com ID:', id);
  };

  const handleDeactivateAnnouncement = (id: number) => {
    setAnnouncementToDeactivate(id);
    setIsDialogOpen(true);
  };

  const confirmDeactivation = async () => {
    if (announcementToDeactivate !== null) {
      try {
        await deleteAnnouncement(announcementToDeactivate);
        setIsDialogOpen(false);
        window.location.reload(); // Recarrega a página para refletir a mudança
      } catch (error) {
        console.error('Erro ao inativar o anúncio:', error);
      }
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
                  <UserAnnouncementCard
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
                    onEdit={handleEdit}
                    onDelete={handleDeactivateAnnouncement}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </HomeSection>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Inativação</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja inativar este anúncio? Esta ação não
              pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDeactivation}>
              Inativar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
