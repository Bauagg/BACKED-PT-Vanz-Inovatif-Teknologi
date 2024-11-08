const Comment = require('../models/komentar')
const ReplyComen = require('../models/reply-komen')

module.exports = {
    createComentar: async (req, res, next) => {
        try {
            const { comment_id, comment_content } = req.body

            const data = await Comment.create({ comment_id, comment_content, user_id: req.user.id })

            // If there's a comment_id (meaning it's a reply), update the parent comment's replies array
            if (comment_id) {
                await ReplyComen.findByIdAndUpdate(
                    comment_id,
                    { $push: { replies: data._id } },
                    { new: true }
                );
            }

            res.status(200).json({
                error: false,
                message: "create data coment success",
                data
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}