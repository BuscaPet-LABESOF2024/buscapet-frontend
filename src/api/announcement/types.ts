export interface CreateAdoptionAnnouncementPayload {
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
  };
  announcementType: {
    id: number;
  };
  contactPhone: string;
  userId: number;
  imageAnnouncement?: {
    image: string;
  };
}

export interface CreateLostAnnouncementPayload {
  title: string;
  description: string;
  data: Date;
  endereco: {
    rua: string;
    number: number;
    neighborhood: string;
    cep: string;
    street: string;
    referencia: string;
    complemento: string;
  };
  animal: {
    name: string;
    statusAnimal: number;
    type: string;
    breed: string;
    size: number;
    weight: number;
    age: number;
  };
  announcementType: {
    id: number;
  };
  contactPhone: string;
  userId: number;
  imageAnnouncement?: {
    image: string;
  };
}
