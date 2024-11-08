const mongoose = require('mongoose')

const modelOtp = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: [true, 'user_id harus di isi']
    },
    kode_otp: {
        type: String,
        length: 4,
        required: [true, 'Missing fields!'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 30
    }
})

const OTP = mongoose.model('OTP', modelOtp)

module.exports = OTP