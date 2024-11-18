export interface CreateLostAnnouncementPayload {
    title: string;
    description: string;
    endereco: {
      rua: string;
      number: number;
      neighborhood: string;
      cep: string;
    };
    animal: {
      name: string;
      statusAnimal: number;
      type: string;
      breed: string;
      size: number;
      weight: number;
      age: number;
    },
    announcementType: {
      id: number;
    },
    contactPhone: string;
    userId: number;
    imageAnnouncement?: {
      image: string;
    };
  }
  