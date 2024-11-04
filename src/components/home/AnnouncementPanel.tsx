// import React, { useEffect, useState } from 'react'; 
// import { getAllAnnouncements } from '../../services/AnnouncementService'; // Ajuste o caminho conforme necessário
// import { Announcement } from '../../models/Announcement'; // Ajuste o caminho conforme necessário
// import AnnouncementCard from '../../components/announcement/AnnouncementCard';

// const AnnouncementPanel: React.FC = () => {
//   const [announcements, setAnnouncements] = useState<Announcement[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const data = await getAllAnnouncements();
//         setAnnouncements(data);
//       } catch (err) {
//         setError('Erro ao carregar anúncios.');
//       }
//     };

//     fetchAnnouncements();
//   }, []);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 mt-24 w-full max-w-7xl px-4">
//       {announcements.length === 0 ? (
//         <p className="text-center">Nenhum anúncio encontrado.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {announcements.map((announcement) => (
//             <AnnouncementCard
//               key={announcement.id}
//               title={announcement.title}
//               description={announcement.description}
//               contactPhone={announcement.contactPhone}
//               contactEmail={announcement.contactEmail}
//               animal={announcement.animal}
//               // Removido o objeto animal, já que não está mais presente
//               images={announcement.images.filter(image => image.image !== null)} 
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnnouncementPanel;

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
    <div className="container mx-auto p-4 mt-24 w-full max-w-7xl px-4">
      {announcements.length === 0 ? (
        <p className="text-center">Nenhum anúncio encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              title={announcement.title}
              description={announcement.description}
              contactPhone={announcement.contactPhone}
              contactEmail={announcement.contactEmail}
              animal={announcement.animal}
              images={announcement.images ? announcement.images.filter(image => image.image !== null) : []}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementPanel;

