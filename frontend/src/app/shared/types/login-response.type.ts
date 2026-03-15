export type LoginResponse = {
  name: string;
  token: string;
};

export type LoginErrorResponse = {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: string;
};
