import mongoose from 'mongoose';

const connectDB = async () => {
    try {
         console.log('Connecting to database...');
        const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;
        
        if (!mongoUri) {
            throw new Error('MONGODB_URI or MONGODB_URL not found in environment variables');
        }
        
        // Add database name if not already in URI
        const dbUri = mongoUri.includes('?') 
            ? mongoUri.replace('?', 'pingup?')
            : mongoUri.endsWith('/') 
                ? `${mongoUri}pingup`
                : `${mongoUri}/pingup`;
        
        console.log('Connecting to:', dbUri.replace(/\/\/([^:]+):([^@]+)@/, '//*****:*****@'));
        await mongoose.connect(dbUri);
        console.log('✓ Connected to database');

    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB
