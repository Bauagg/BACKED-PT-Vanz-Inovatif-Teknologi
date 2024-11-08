const mongoose = require('mongoose')

const modelFruit = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: [true, 'User_id is required'],
        ref: 'User'
    },
    fruit_name: {
        type: String,
        required: [true, 'fruit_name harus di isi'],
    },
    stock: {
        type: Number,
        required: [true, 'stock harus di isi'],
    },
    fruit_type: {
        type: String,
        enum: {
            values: ['IMPORT', 'LOCAL'],
            message: '{VALUE} tidak valid, hanya boleh "IMPORT" atau "LOCAL"'
        },
        required: [true, 'fruit_type harus di isi']
    },
    images: {
        type: String,
        required: [true, 'images harus di isi'],
    }
}, { timestamps: true })

const Fruit = mongoose.model("Fruit", modelFruit)

module.exports = Fruit