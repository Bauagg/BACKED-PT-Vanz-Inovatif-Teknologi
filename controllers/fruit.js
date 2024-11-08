const Fruit = require('../models/fruit')
const path = require('path')
const fs = require('fs')

module.exports = {
    listFruit: async (req, res, next) => {
        try {
            const { fruit_type, fruit_name } = req.query
            let query = {}

            let admin = {}

            if (req.user.role === 'admin') {
                query.user_id = req.user.id
                admin.user_id = req.user.id
            }

            if (fruit_type) {
                query.fruit_type = { $regex: new RegExp(`^${fruit_type}$`, 'i') }
            }

            if (fruit_name) {
                query.fruit_name = { $regex: new RegExp(fruit_name, 'i') };
            }

            const dataIndex = await Fruit.find(admin)
            const data = await Fruit.find(query)

            let indexImport = 0
            let indexLocal = 0

            for (let item of dataIndex) {
                if (item.fruit_type === 'IMPORT') {
                    indexImport += 1
                } else if (item.fruit_type === 'LOCAL') {
                    indexLocal += 1
                }
            }

            res.status(200).json({
                error: false,
                message: "list data fruit success",
                index_import: indexImport,
                index_local: indexLocal,
                data
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    detailFruit: async (req, res, next) => {
        try {
            const data = await Fruit.findById(req.params.id)
            if (!data) return res.status(404).json({
                error: true,
                message: 'data Fruit not Found'
            })

            res.status(200).json({
                error: false,
                message: "detail data fruit success",
                data
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    createFruit: async (req, res, next) => {
        try {
            const { fruit_name, stock, fruit_type } = req.body
            const files = req.files
            const image = files ? files.image : null

            if (!image) return res.status(400).json({ message: 'Kamu gagal masukan image Fruit' })

            const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i
            if (!allowedExtensions.test(image.name)) {
                return res.status(400).json({ message: 'Hanya file tipe gambar (jpg, jpeg, png, gif) yang diizinkan' })
            }


            if (req.user.role !== 'admin') return res.status(401).json({ error: true, message: `${req.user.role} anda tidak memiliki izin akses ini ` })

            const imageData = `${Date.now()}${path.extname(image.name)}`
            const file = path.join(__dirname, '../public/images', imageData)

            image.mv(file, (err) => {
                if (err) {
                    return res.status(500).json({ message: "Failed to upload NIB file", error: err });
                }
            });

            const data = await Fruit.create({
                fruit_name,
                stock,
                fruit_type, images: `${req.protocol}://${req.get('host')}/public/images/${imageData}`,
                user_id: req.user.id
            })

            res.status(200).json({
                error: false,
                message: "create data fruit success",
                data
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    updateFruit: async (req, res, next) => {
        try {
            const { fruit_name, stock, fruit_type } = req.body
            const files = req.files
            const image = files ? files.image : null

            if (!image) return res.status(400).json({ message: 'Kamu gagal masukan image Fruit' })

            const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i
            if (!allowedExtensions.test(image.name)) {
                return res.status(400).json({ message: 'Hanya file tipe gambar (jpg, jpeg, png, gif) yang diizinkan' })
            }

            if (req.user.role !== 'admin') return res.status(401).json({ error: true, message: `${req.user.role} anda tidak memiliki izin akses ini ` })

            const validateData = await Fruit.findOne({ _id: req.params.id, user_id: req.user.id })
            if (!validateData) return res.status(404).json({ error: true, message: 'data Fruit Not Found' })

            // delete images
            const fileImage = validateData.images.substring(validateData.images.lastIndexOf('/') + 1);
            const deleteImage = path.join(__dirname, '../public', 'images', fileImage);
            if (fs.existsSync(deleteImage)) {
                fs.unlinkSync(deleteImage);
            }

            // create images baru
            const imageData = `${Date.now()}${path.extname(image.name)}`
            const file = path.join(__dirname, '../public/images', imageData)

            image.mv(file, (err) => {
                if (err) {
                    return res.status(500).json({ message: "Failed to upload NIB file", error: err });
                }
            });

            const data = await Fruit.findOneAndUpdate({ _id: req.params.id, user_id: req.user.id }, {
                fruit_name,
                stock,
                fruit_type, images: `${req.protocol}://${req.get('host')}/public/images/${imageData}`,
                user_id: req.user.id
            }, { new: true })

            res.status(200).json({
                error: false,
                message: "update data fruit success",
                data
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    deleteFruit: async (req, res, next) => {
        try {
            if (req.user.role !== 'admin') return res.status(401).json({ error: true, message: `${req.user.role} anda tidak memiliki izin akses ini ` })

            const validateData = await Fruit.findOne({ _id: req.params.id, user_id: req.user.id })
            if (!validateData) return res.status(404).json({ error: true, message: 'data Fruit Not Found' })

            // delete images
            const fileImage = validateData.images.substring(validateData.images.lastIndexOf('/') + 1);
            const deleteImage = path.join(__dirname, '../public', 'images', fileImage);
            if (fs.existsSync(deleteImage)) {
                fs.unlinkSync(deleteImage);
            }

            await Fruit.deleteOne({ _id: req.params.id, user_id: req.user.id })

            res.status(200).json({
                error: false,
                message: "delete data fruit success"
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}