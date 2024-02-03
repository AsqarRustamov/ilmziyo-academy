import { requestLogger } from '@middlewares/index';
import express from 'express'
import cors from 'cors'

import api from '@routes/routes'
import { serverConfig } from '@configs/index'
import prepare from '@configs/prepare';
import helmet from 'helmet'
var cookieSession = require('cookie-session')

const app = express()

app.use(cookieSession({
  name: 'session',
  keys: ["key1", "key2"],
  maxAge: 24 * 60 * 60 * 1000
}))

app.set('view engine', 'ejs');

app.use(function (req, res, next) {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'unsafe-inline'; style-src 'self'; frame-src 'self'"
    );
    next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.use(express.static('static'))
app.use("/public", express.static('files'))

app.use(requestLogger)

app.use('/', api)

app.listen(serverConfig.port, serverConfig.host, 0, () => {
    console.log(`Server running on http://localhost:${serverConfig.port}`)
    prepare()
})