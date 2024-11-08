const crypto = require('crypto');
const OTP = require('../models/otp');

exports.generate_otp = () => {
    let digits = [];

    digits.push(crypto.randomInt(1, 10));

    while (digits.length < 4) {
        let digit = crypto.randomInt(0, 10);

        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }

    const unique4DigitNumber = parseInt(digits.join(''), 10);
    return unique4DigitNumber.toString();
};

exports.verifyOtp = async (kode_otp, user_id) => {
    try {
        const expectedOtp = await OTP.findOne({ user_id, kode_otp });

        return !expectedOtp ? false : true;
    } catch (err) {
        console.error(err);
        next(err);
    }
};
