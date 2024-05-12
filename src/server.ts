import express from 'express';
import dotenvSafe from 'dotenv-safe';
import prisma from './config/prisma.ts';

const app = express();

// Configure environment variables before anything else is done
dotenvSafe.config({
    allowEmptyValues: true,
    path: `.env.${process.env.NODE_ENV}`  // Adjust path to match file naming
});

try {
    await prisma.$connect();
    console.log('Connected to the database');
    await prisma.$disconnect();

} catch (error) {
    console.error('Could not connect to the database');
    console.error(error);
}

// Start the server
const PORT = process.env.PORT || 3000;

console.log('The environment is: ', process.env.NODE_ENV);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});