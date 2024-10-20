import React from 'react';

interface AnnouncementCardProps {
  title: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  animal: {
    name: string;
    type: string;
    breed: string;
    size: number;
    weight: number;
    age: number;
  };
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  description,
  contactPhone,
  contactEmail,
  animal,
}) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-lg bg-white">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <h3 className="mt-2 font-semibold">Animal:</h3>
      <p>Name: {animal.name}</p>
      <p>Type: {animal.type}</p>
      <p>Breed: {animal.breed}</p>
      <p>Size: {animal.size}</p>
      <p>Weight: {animal.weight} kg</p>
      <p>Age: {animal.age} years</p>
      <div className="mt-2">
        <h3 className="font-semibold">Contact Information:</h3>
        <p>Phone: {contactPhone}</p>
        <p>Email: {contactEmail}</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
