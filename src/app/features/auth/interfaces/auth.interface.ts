
export interface AuthResponse {
  data: {
    token: string;
    user: {
      id: number;
      username: string;
      role: string;
    };
  };
}