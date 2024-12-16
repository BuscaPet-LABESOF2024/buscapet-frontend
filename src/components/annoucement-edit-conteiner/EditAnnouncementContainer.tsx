import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AnnouncementDetails,
  fetchAnnouncementDetails,
} from '@/api/announcement';
import EditAnnouncementPage from '@/pages/announcement-edit/index'; // Página de edição
import { AnnouncementType } from '@/api/announcement';

const EditAnnouncementContainer: React.FC = () => {
  const location = useLocation();
  const { id } = location.state || {};
  console.log('Este é o valor do id dentro do container:', id);

  const [announcementType, setAnnouncementType] =
    useState<AnnouncementType | null>(null);

  const [announcementData, setAnnouncementData] =
    useState<AnnouncementDetails | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        try {
          const data = await fetchAnnouncementDetails(Number(id));
          console.log('Log dentro do container: ', data);
          setAnnouncementType(data.announcementType);
          setAnnouncementData(data);
        } catch {
          setError('Não foi possível carregar os detalhes do anúncio.');
        }
      }
    };

    fetchDetails();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!announcementType || !announcementData) {
    return <p>Carregando...</p>;
  }

  return (
    <EditAnnouncementPage
      id={announcementData.id}
      animal={announcementData.animal}
      title={announcementData.title}
      description={announcementData.description}
      contactPhone={announcementData.contactPhone}
      contactEmail={announcementData.contactEmail}
      images={announcementData.images}
      announcementType={announcementData.announcementType}
      active={announcementData.active}
      address={announcementData.address}
    />
  );
};

export default EditAnnouncementContainer;
