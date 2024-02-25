import mongoose from 'mongoose';

const ConnectDB = (url) => {
    return mongoose.connect(url, {autoIndex: true})
}

export default ConnectDB;