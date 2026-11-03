import dotenv from 'dotenv';
dotenv.config();

export const env = {
  baseURL: process.env.BASE_URL ?? 'http://localhost:5173',
  adminEmail: process.env.ADMIN_EMAIL ?? '',
  adminPassword: process.env.ADMIN_PASSWORD ?? '',
};