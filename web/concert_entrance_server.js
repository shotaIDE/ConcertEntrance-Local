const NeDB = require('nedb')

const db = new NeDB({
  filename: '/home/node/concerts.db',
  autoload: true
})

const express = require('express')
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const portNo = 3001
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})

app.use('/public', express.static('./public'))
app.get('/', (req, res) => {
  res.redirect(302, '/public')
})

app.get('/api/getItems', (req, res) => {
  db.find({}).sort({heldTimestamp: 1}).exec((err, data) => {
    if (err) {
      sendJSON(res, false, {logs: [], msg: err})
      return
    }
    console.log(data)
    sendJSON(res, true, {data: data})
  })
})

app.post('/api/write', upload.array(), (req, res) => {
  const body = req.body
  let data = {
    title: body.title,
    srcUrl: body.srcUrl,
    heldDate: body.heldDate,
    heldTime: body.heldTime,
    onSaleDate: body.onSaleDate,
    heldPlace: body.heldPlace,
    description: body.description,
    stime: (new Date()).getTime()
  }
  if (body.heldTimestamp) {
    data.heldTimestamp = body.heldTimestamp
  }
  db.insert(data, (err, doc) => {
    if (err) {
      console.error(err)
      sendJSON(res, false, {msg: err})
      return
    }
    sendJSON(res, true, {id: doc._id})
  })
})

app.get('/api/delete', (req, res) => {
  db.remove({}, {multi: true}, (err, n) => {
    if (err) {
      console.error(err)
      sendJSON(res, false, {msg: err})
      return
    }
    sendJSON(res, true, {num: n})
  })
})

function sendJSON (res, result, obj) {
  obj['result'] = result
  res.json(obj)
}
