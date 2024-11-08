const ReplyComen = require('../models/reply-komen')

module.exports = {
    listReplyComentar: async (req, res, next) => {
        try {
            const data = await ReplyComen.find({ fruit_id: req.params.id })
                .populate({
                    path: 'replies',
                    populate: {
                        path: 'user_id',
                        select: '-password'
                    }
                })
                .populate('user_id', '-password')

            let indexReplyComen = 0
            let indexComentar = 0
            for (let item of data) {
                indexReplyComen += 1

                for (let index of item.replies) {
                    indexComentar += 1
                }

            }

            const total = indexComentar + indexReplyComen

            res.status(200).json({
                error: false,
                message: 'list data Reply Comentar success',
                index: total,
                data
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    createReplyComentar: async (req, res, next) => {
        try {
            const { fruit_id, comment_content } = req.body

            const data = await ReplyComen.create({ fruit_id, comment_content, user_id: req.user.id })

            res.status(200).json({
                error: true,
                message: 'create data Reply Comentar success',
                data
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}