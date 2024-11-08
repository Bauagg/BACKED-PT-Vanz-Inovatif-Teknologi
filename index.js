require('./db/db')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(fileUpload())

// Router User
app.use(require('./routers/auth-users'))

// Router Fruit
app.use(require('./routers/fruit'))

// Router Reply Komentar
app.use(require('./routers/reply-komen'))

app.use(require('./middlewares/midelware-error'))

app.listen(8080, () => console.log('Listening on port: 8080'))