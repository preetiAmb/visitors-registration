import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVisitorContext } from '../context/VisitorContext';
import QRCodeGenerator from './QRCodeGenerator';

const VisitorForm: React.FC = () => {
  const { generateQRCode, addVisitor } = useVisitorContext(); // Include addVisitor
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [personalNumber, setPersonalNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [city, setCity] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [recipient, setRecipient] = useState('');
  const [expiryDate, setExpiryDate] = useState(getDefaultExpiryDate());
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); 
  const navigate = useNavigate();

  function getDefaultExpiryDate() {
    const oneDayFromNow = new Date();
    oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);
    return oneDayFromNow.toISOString().slice(0, 16);
  }
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const visitorInfo = {
      firstName,
      lastName,
      personalNumber,
      nationality,
      city,
      organisation,
      recipient,
      expiryDate,
    };

    const queryParams = new URLSearchParams(visitorInfo);
    const queryString = queryParams.toString();
    const url = `/qr-code-page?${queryString}`;

    setGeneratedUrl(url);
    setShowQRCode(true);
    generateQRCode([visitorInfo]);
    addVisitor(visitorInfo);
    setFormSubmitted(true);
  };

  return (
    <>
    {formSubmitted ? ( 
        <p>Form submitted successfully!</p>
      ) : (
  
      <form onSubmit={handleSubmit}>
        <label>
          Namn:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Personnummer:
          <input type="personalNumber" value={personalNumber} onChange={(e) => setPersonalNumber(e.target.value)} />
        </label>
        <label>
          Nationalitet:
          <input type="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} />
        </label>
        <label>
          Ort/Stad:
          <input type="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label>
          Organisation:
          <input type="organisation" value={organisation} onChange={(e) => setOrganisation(e.target.value)} />
        </label>
        <label>
          Besöksmottagare:
          <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </label>
        <label>
          Tid in:
          <input
            type="datetime-local"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
       )}
      {/* {showQRCode && (
        <div>
          <QRCodeGenerator /> 
        </div>
      )} */}
    </>
  );
};

export default VisitorForm;
