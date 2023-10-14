// AdminForm.tsx
import React, { useState } from 'react';
import { useVisitorContext } from '../context/VisitorContext';
import { Visitor } from '../customerTypes';

const AdminForm: React.FC = () => {
  const { addVisitor } = useVisitorContext();
  const [visitor, setVisitor] = useState<Visitor>({
    firstName: '',
    lastName: '',
    personalNumber: '',
    nationality: '',
    city: '',
    organisation: '',
    recipient: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVisitor(visitor);

    // Clear the form fields
    setVisitor({
      firstName: '',
      lastName: '',
      personalNumber: '',
      nationality: '',
      city: '',
      organisation: '',
      recipient: '',
    });
  };

  return (
    <div>
      <h2>Admin Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={visitor.firstName}
            onChange={(e) => setVisitor({ ...visitor, firstName: e.target.value })}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={visitor.lastName}
            onChange={(e) => setVisitor({ ...visitor, lastName: e.target.value })}
          />
        </label>
        <label>
          Personal Number:
          <input
            type="text"
            value={visitor.personalNumber}
            onChange={(e) => setVisitor({ ...visitor, personalNumber: e.target.value })}
          />
        </label>
        <label>
          Nationality:
          <input
            type="text"
            value={visitor.nationality}
            onChange={(e) => setVisitor({ ...visitor, nationality: e.target.value })}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={visitor.city}
            onChange={(e) => setVisitor({ ...visitor, city: e.target.value })}
          />
        </label>
        <label>
          Organisation:
          <input
            type="text"
            value={visitor.organisation}
            onChange={(e) => setVisitor({ ...visitor, organisation: e.target.value })}
          />
        </label>
        <label>
          Recipient:
          <input
            type="text"
            value={visitor.recipient}
            onChange={(e) => setVisitor({ ...visitor, recipient: e.target.value })}
          />
        </label>
        <button type="submit">Add Visitor</button>
      </form>
    </div>
  );
};

export default AdminForm;
