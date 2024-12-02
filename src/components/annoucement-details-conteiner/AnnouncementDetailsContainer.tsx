import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Para capturar o ID da URL
import {
  AnnouncementDetails,
  fetchAnnouncementDetails,
} from '@/api/announcement';
import AnnouncementDetailsPage from '@/pages/announcement-details/index'; // Página de detalhes
import { AnnouncementType } from '@/api/announcement';

const AnnouncementDetailsContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Captura o ID do anúncio da URL
  const [announcementType, setAnnouncementType] =
    useState<AnnouncementType | null>(null);
  const [announcementData, setAnnouncementData] =
    useState<AnnouncementDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        // Verifica se o ID foi capturado corretamente
        try {
          const data = await fetchAnnouncementDetails(Number(id)); // Converte o ID para número
          setAnnouncementType(data.announcementType);
          setAnnouncementData(data);
        } catch {
          setError('Não foi possível carregar os detalhes do anúncio.');
        }
      }
    };

    fetchDetails();
  }, [id]); // O useEffect é acionado toda vez que o ID muda

  if (error) {
    return <p>{error}</p>;
  }

  if (!announcementType || !announcementData) {
    return <p>Carregando...</p>;
  }

  return (
    <AnnouncementDetailsPage
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

export default AnnouncementDetailsContainer;
