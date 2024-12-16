import EditAnnouncementFound from '@/components/edit-announcement-found/EditAnnouncementFound';
import EditAnnouncementMissing from '@/components/edit-announcement-missing/EditAnnouncementMissing';
import EditAnnouncementAdoption from '@/components/annoucement-edit-adoption/EditAnnouncementAdoption';
import {
  AnimalSize,
  AnnouncementType,
  ImagesResponse,
} from '@/api/announcement';
import MainLayout from '@/components/main-layout/MainLayout';

interface AnnouncementEditProps {
  id: number;
  animal: {
    name: string;
    type: string;
    breed: string;
    size: AnimalSize;
    weight?: number;
    age?: number;
  };
  title: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  images: ImagesResponse[];
  announcementType: AnnouncementType;
  active: boolean;
  address?: {
    street?: string;
    cep?: string;
    neighborhood?: string;
    reference?: string;
    complemento?: string;
  };
}

export default function EditAnnouncementPage({
  id,
  animal,
  title,
  description,
  contactPhone,
  contactEmail,
  images,
  announcementType,
  active,
  address,
}: AnnouncementEditProps) {
  const renderAnnouncementDetails = () => {
    switch (announcementType) {
      case 1:
        return (
          <EditAnnouncementMissing
            id={id}
            animal={animal}
            title={title}
            description={description}
            contactPhone={contactPhone}
            contactEmail={contactEmail}
            images={images}
            address={address}
            active={active}
            annoucementType={announcementType}
          />
        );
      case 2:
        return (
          <EditAnnouncementFound
            id={id}
            animal={animal}
            title={title}
            description={description}
            contactPhone={contactPhone}
            contactEmail={contactEmail}
            images={images}
            address={address}
            active={active}
            annoucementType={announcementType}
          />
        );
      case 3:
        return (
          <EditAnnouncementAdoption
            id={id}
            animal={animal}
            title={title}
            description={description}
            contactPhone={contactPhone}
            contactEmail={contactEmail}
            images={images}
            address={address}
            active={active}
            annoucementType={announcementType}
          />
        );
      default:
        return <p>Tipo de anúncio não suportado.</p>;
    }
  };

  return <MainLayout>{renderAnnouncementDetails()}</MainLayout>;
}
