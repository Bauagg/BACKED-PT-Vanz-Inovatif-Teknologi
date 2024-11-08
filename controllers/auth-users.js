const Users = require('../models/auth-user')
const bcrypt = require('../utils/bcrypt')
const jwt = require('../utils/jwt')

module.exports = {
    register: async (req, res, next) => {
        try {
            const { email, username, password, role } = req.body

            const validateEmail = await Users.findOne({ email })
            if (validateEmail) return res.status(401).json({ error: true, message: 'email sudah terdaftar' })

            if (!password || password.length < 7) return res.status(500).json({ error: true, message: 'password kurang kuat' })

            const data = await Users.create({ email, username, password: await bcrypt.hashPassword(password), role })

            res.status(200).json({
                error: false,
                message: 'register success',
                data
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body

            const newUser = await Users.findOne({ email })
            if (!newUser) return res.status(401).json({ error: true, message: 'Email dan Password salah' })

            const verifyPassword = await bcrypt.verifyPassword(password, newUser.password)
            if (!verifyPassword) return res.status(401).json({ error: true, message: 'Email dan Password salah' })

            const payloadToken = {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }

            const token = await jwt.createToken(payloadToken)

            res.status(200).json({
                error: false,
                message: 'login successfully',
                data: {
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    token: token
                }
            })
        } catch (error) {
            next(error)
        }
    }
}