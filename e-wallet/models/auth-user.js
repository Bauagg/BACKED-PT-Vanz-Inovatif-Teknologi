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
        default: null
    },
    pin: {
        type: String,
        default: null
    }
}, { timestamps: true })

const Users = mongoose.model('User', modelAuthUser)

module.exports = Users