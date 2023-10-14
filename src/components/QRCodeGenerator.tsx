import React from 'react';
import QRCode from 'qrcode.react';
import { useVisitorContext } from '../context/VisitorContext';
import { QRCodeInfo  } from '../customerTypes';

const QRCodeGenerator: React.FC<QRCodeInfo> = () => {
  const { visitorInfo } = useVisitorContext();

  const isQRCodeValid = () => {
    return visitorInfo && visitorInfo.length > 0;
  };

  const text = JSON.stringify(visitorInfo);

  return (
    <div>
      <h2>QR Code:</h2>
      {isQRCodeValid() ? (
        <>
          <QRCode value={text} />
          <p>This is a QR Code.</p>
        </>
      ) : (
        <p>QR Code is no longer valid.</p> 
      )}
    </div>
  );
};

export default QRCodeGenerator;
