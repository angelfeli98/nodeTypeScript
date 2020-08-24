import mongoose from 'mongoose';

export default class DataBase{

    private url: any;
    private options: mongoose.ConnectionOptions;

    constructor(){
        this.url = process.env.URL_DB;
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        };
        this.makeConnection();
    }

    private makeConnection = async(): Promise<void> => {
        try {
            await mongoose.connect(this.url, this.options);
            console.log('Database connection ready')
        }catch (error) {
            console.log(error);
        }
    }
}