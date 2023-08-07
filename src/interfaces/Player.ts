export default interface Player {
  id: string;
  name: string;
  lastName: string;
  rank: number;
  wins: number;
  tel?: string;
  selected?: boolean
}

export default interface User {
  id: string;
  login: string;
  password: string;
  role: Role
}

enum Role {
  USER,
  ADMIN
}