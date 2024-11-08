const Users = require('../models/auth-user')
const OTP = require('../models/otp')
const { generate_otp, verifyOtp } = require('../utils/otp')

module.exports = {
    register: async (req, res, next) => {
        try {

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}