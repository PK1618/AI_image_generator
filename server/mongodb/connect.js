import mongoose from 'mongoose'; //To interact with MongoDB, structuring and managing data effectively.

const connectDB = (url) => {
        mongoose.set('strictQuery', true);

        mongoose.connect(url)
                .then(() => console.log('MongoDB Connected...'))
                .catch((err) => console.log('MongoDB connection error', err.message));
}

export default connectDB;