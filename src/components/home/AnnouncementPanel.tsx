import React, { useEffect, useState } from 'react';
import { getAllAnnouncements } from '../../services/AnnouncementService'; // Ajuste o caminho conforme necessário
import { Announcement } from '../../models/Announcement'; // Ajuste o caminho conforme necessário
import AnnouncementCard from '../../components/announcement/AnnouncementCard';

const AnnouncementPanel: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getAllAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        setError('Erro ao carregar anúncios.');
      }
    };

    fetchAnnouncements();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-24">
      {announcements.length === 0 ? (
        <p className="text-center">Nenhum anúncio encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {announcements.map(announcement => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              description={announcement.description}
              contactPhone={announcement.contactPhone}
              contactEmail={announcement.contactEmail}
              animal={{
                name: announcement.animal.name,
                type: announcement.animal.type,
                breed: announcement.animal.breed,
                size: announcement.animal.size,
                weight: announcement.animal.weight,
                age: announcement.animal.age,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementPanel;
