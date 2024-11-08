const mongoose = require('mongoose')

const modelAuthUser = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email harus di isi'],
        validate: {
            validator: (value) => {
                const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
                return regex.test(value)
            },
            message: (props) => `${props.value} email tidak valid`
        }
    },
    username: {
        type: String,
        required: [true, 'username harus di isi'],
    },
    password: {
        type: String,
        minlength: [8, 'password harus memiliki minimal 8 karakter'],
        required: [true, 'password harus di isi']
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'user'],
            message: '{VALUE} tidak valid, hanya boleh "admin" atau "user"'
        },
        required: [true, 'role harus di isi']
    }
}, { timestamps: true })

const Users = mongoose.model('User', modelAuthUser)

module.exports = Users