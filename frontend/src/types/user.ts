export interface User {

  id: string;

  email: string;

  firstName: string | null;

  lastName: string | null;

  username: string | null;

  password: string;

  createdAt: Date;

  updatedAt: Date;

}
