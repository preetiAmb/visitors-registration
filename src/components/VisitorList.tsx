import React from 'react';
import { useVisitorContext } from '../context/VisitorContext';
import { QRCodeInfo, Visitor } from '../customerTypes';


const VisitorList: React.FC = () => {
  const { visitorInfo, deleteVisitor } = useVisitorContext();

  console.log(visitorInfo)

  const handleDelete = (index: number) => {
    deleteVisitor(index);
  };

  // const handleNotify = (visitor: QRCodeInfo) => {
  //   console.log(`Notifying ${visitor.name} (${visitor.personalNumber})`);
  // };

  return (
    <div>
      <h2>Visitor List</h2>
      <ul>
        {visitorInfo && visitorInfo.length > 0 ? (
          <ul>
            {visitorInfo.map((visitor, index) => (
              <li key={index}>
                {visitor.firstName}   {visitor.lastName}   {visitor.recipient} ({visitor.personalNumber})
                <button onClick={() => handleDelete(index)}>Delete</button>
                {/* <button onClick={() => handleNotify(visitor)}>Notify</button> */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No visitors found.</p>
        )}
      </ul>
    </div>
  );
};

export default VisitorList;
