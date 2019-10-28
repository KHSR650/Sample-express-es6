import mongoose from 'mongoose'

class Database {
    constructor() {
      this._connect()
    }
    _connect() {
        // console.log(config.db.mongo_connection_string)
        mongoose.connect("mongodb+srv://KHSR650CSE:6XLoXjtOa1Ou2T7k@normaldistribution-uqzc6.mongodb.net/test?retryWrites=true&w=majority", { useCreateIndex: true, useNewUrlParser: true })
        .then(() => {
          console.log('Database connection successful')
        })
        .catch(err => {
            console.log(err)
          console.error('Database connection error')
        })
    }
}

export default new Database()
