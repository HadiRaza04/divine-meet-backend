import 'dotenv/config';

export const port = process.env.PORT;
export const mongodb_uri = process.env.mongoDB_URI;

export const jwt_secret = process.env.JWT_SECRET;
export const salt_rounds = Number(process.env.SALT_ROUNDS);
export const jwt_expires_in = String(process.env.JWT_EXPIRES_IN);

export const email_user = process.env.EMAIL_USER;
export const email_pass = process.env.EMAIL_PASS;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;