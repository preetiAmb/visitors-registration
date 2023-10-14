import React from 'react';
import QRCodeGenerator from '../components/QRCodeGenerator';

const QRCodePage: React.FC = () => {
  return (
    <div>
      <h1>QR Code Page</h1>
      <QRCodeGenerator id={''} firstName={''} lastName={''} personalNumber={''} nationality={''} city={''} organisation={''} recipient={''} />
    </div>
  );
};

export default QRCodePage;
