const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    fruit_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Fruit',
        required: [true, 'fruit_id harus di isi']
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'user_id harus di isi']
    },
    comment_content: {
        type: String,
        required: [true, 'Content is required']
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, { timestamps: true })

const ReplyComen = mongoose.model('ReplyComen', replySchema)

module.exports = ReplyComen