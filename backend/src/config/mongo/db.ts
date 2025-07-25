import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await connect('mongodb://localhost:27017/allfunds_test');
        console.log('Connected');
    } catch (error: any) {
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;
