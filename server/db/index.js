const mongoose = require('mongoose')

let connection = async () => { 
    await mongoose
        .connect('mongodb://127.0.0.1:27017/cinema', { useNewUrlParser: true })
        .catch(e => {
            console.error('Connection error', e.message)
        })
}
connection();

const db = mongoose.connection

module.exports = db

const Schema = mongoose.Schema

const Movie = new Schema(
    {
        name: { type: String, required: true },
        time: { type: [String], required: true },
        rating: { type: Number, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('movies', Movie)