const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment_id: {
        type: mongoose.Types.ObjectId,
        ref: 'ReplyComen',
        required: [true, 'comment_id harus di isi']
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'user_id harus di isi']
    },
    comment_content: {
        type: String,
        required: [true, 'Content is required']
    }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment