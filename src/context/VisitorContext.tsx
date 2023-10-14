import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { QRCodeInfo } from '../customerTypes';

interface VisitorContextType {
  visitorInfo: QRCodeInfo[];
  generateQRCode: (info: QRCodeInfo[]) => void;
  deleteVisitor: (index: number) => void;
  addVisitor: (visitor: QRCodeInfo) => void;
}

const VisitorContext = createContext<VisitorContextType | undefined>(undefined);

export const useVisitorContext = () => {
  const context = useContext(VisitorContext);
  if (!context) {
    throw new Error('useVisitorContext must be used within a VisitorProvider');
  }
  return context;
};

interface VisitorProviderProps {
  children: ReactNode;
}

export const VisitorProvider: React.FC<VisitorProviderProps> = ({ children }) => {
  const [visitorInfo, setVisitorInfo] = useState<QRCodeInfo[]>([]);

  useEffect(() => {
    fetch('/visitors.json')
      .then((response) => response.json())
      .then((data) => {
        setVisitorInfo(data);
      })
      .catch((error) => {
        console.error('Error fetching visitor data:', error);
      });
  }, []);

  const addVisitor = (visitor: QRCodeInfo) => {
    fetch('/api/add-visitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitor),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add visitor');
        }
        return response.json();
      })
      .then((addedVisitor) => {
        setVisitorInfo([...visitorInfo, addedVisitor]);
      })
      .catch((error) => {
        console.error('Error adding visitor:', error);
      });
  };

  const generateQRCode = (info: QRCodeInfo[]) => {
    setVisitorInfo(info);
  };

  const deleteVisitor = (index: number) => {
    // Ensure the visitor has an 'id' property
    const visitorToDelete = visitorInfo[index];
    if (!visitorToDelete || !visitorToDelete.id) {
      console.error('Visitor does not have an ID or is not in the expected format.');
      return;
    }
  
    // Send a DELETE request to your server with the ID of the visitor to delete
    const visitorId = visitorToDelete.id;
    fetch(`/delete-visitor/${visitorId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Update the state after a successful delete
          const updatedVisitorInfo = [...visitorInfo];
          updatedVisitorInfo.splice(index, 1);
          setVisitorInfo(updatedVisitorInfo);
        } else {
          // Handle any errors
          console.error('Error deleting visitor:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error deleting visitor:', error);
      });
  };
  

  return (
    <VisitorContext.Provider value={{ visitorInfo, generateQRCode, deleteVisitor, addVisitor }}>
      {children}
    </VisitorContext.Provider>
  );
};
