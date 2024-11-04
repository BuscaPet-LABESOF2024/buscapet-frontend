import React from 'react';

const PowerBIEmbedPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <iframe
        title="Power BI Report"
        width="1140"
        height="541.25"
        src="https://app.powerbi.com/reportEmbed?reportId=afc5ae76-1ec1-4d95-adaa-480f568fe46f&autoAuth=true&ctid=83ba45b3-10ad-4452-a401-7bfd07b74688"
        frameBorder="0"
        allowFullScreen
        className="w-full max-w-4xl h-[541px] shadow-lg border-2 border-gray-300"
      ></iframe>
    </div>
  );
};

export default PowerBIEmbedPage;
