export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface RegisterRequest {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export interface JwtResponse {
  token: string;
  type: string;
  id: number;
  name: string;
  email: string;
  role: string;
}
