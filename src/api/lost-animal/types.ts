export interface CreateLostAnnouncementPayload {
    title: string;
    description: string;
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
    address: {
      street: string;
      number: number;
      neighborhod: string;
      cep: string;
    };
    data: Date
  }
  