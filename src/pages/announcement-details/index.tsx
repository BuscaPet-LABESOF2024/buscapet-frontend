import {
  AnimalSize,
  AnnouncementType,
  ImagesResponse,
} from '@/api/announcement';
import AnnoucementDetailsAdoption from '@/components/annoucement-details-adoption/AnnoucementDetailsAdoption';
import AnnoucementDetailsFound from '@/components/annoucement-details-found/AnnoucementDetailsFound';
import AnnoucementDetailsMissing from '@/components/annoucement-details-missing/AnnoucementDetailsMissing';
import MainLayout from '@/components/main-layout/MainLayout';

// Tipando as props corretamente
interface AnnouncementDetailsProps {
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
  address: {
    street: string;
    neighborhood?: string;
    reference?: string;
    complemento?: string;
  };
}

export default function AnnouncementDetailsPage({
  animal,
  title,
  description,
  contactPhone,
  contactEmail,
  images,
  announcementType,
  active,
  address,
}: AnnouncementDetailsProps) {
  const renderAnnouncementDetails = () => {
    switch (announcementType) {
      case 1:
        return (
          <AnnoucementDetailsMissing
            animal={animal}
            title={title}
            description={description}
            contactPhone={contactPhone}
            contactEmail={contactEmail}
            images={images}
            address={address}
            active={active}
          />
        );
      case 2:
        return (
          <AnnoucementDetailsFound
            animal={animal}
            title={title}
            description={description}
            contactPhone={contactPhone}
            contactEmail={contactEmail}
            images={images}
            address={address}
            active={active}
          />
        );
      case 3:
        return (
          <AnnoucementDetailsAdoption
            animal={animal}
            title={title}
            description={description}
            contactPhone={contactPhone}
            contactEmail={contactEmail}
            images={images}
            address={address}
            active={active}
          />
        );
      default:
        return <p>Tipo de anúncio não suportado.</p>;
    }
  };

  return <MainLayout>{renderAnnouncementDetails()}</MainLayout>;
}
