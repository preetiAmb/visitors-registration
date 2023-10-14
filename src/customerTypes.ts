interface Visitor {
  id?: string;
  firstName: string;
  lastName: string;
  personalNumber: string;
  nationality: string;
  city: string;
  organisation: string;
  recipient: string;
};

interface User {
  id?: string;
  password: string;
  role: string;
};

type QRCodeInfo = {
  id?: string;
  firstName: string;
  lastName: string;
  personalNumber: string;
  nationality: string;
  city: string;
  organisation: string;
  recipient: string;
};

export { Visitor, QRCodeInfo, User };
