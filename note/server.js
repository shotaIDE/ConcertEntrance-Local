const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'z',
  database: 'concert_entrance'
})
connection.connect((err) => {
  if (err) {
    console.error(err)
    process.exit(1);
  }
  console.log('connected as id ' + connection.threadId)
})

const express = require('express')
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const portNo = 3000
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})

// FIXME: ページが増えるごとに以下を対応する必要がある，なんかいい書き方ないか？
app.use('/', express.static('./public'))
app.use('/info', express.static('./public'))

app.get('/api/v1/getConcerts', (req, res) => {
  connection.query("SELECT `status`, `timestamp` FROM update_info WHERE `content`='concert_list'", (error, results, fields) => {
    if (error) {
      console.error(error)
      sendJSON(res, false, {msg: error})
      return
    }
    const status = results[0]['status']
    if (status !== 'succeed') {
      errorMsg = 'data is not inserted in concert_list'
      console.error(errorMsg)
      sendJSON(res, false, {msg: errorMsg})
      return
    }
    const updateTimestamp = results[0]['timestamp']
    connection.query('SELECT * FROM concert_list', (error, results, fields) => {
      if (error) {
        console.error(error)
        sendJSON(res, false, {msg: error})
        return
      }
      const resultsRes = results.map((e) => {
        return {
          title: e['title'],
          srcUrl: e['src_url'],
          heldDate: e['held_date'],
          heldTime: e['held_time'],
          heldPlace: e['held_place'],
          onSaleDate: e['on_sale_date'],
          payment: e['payment'],
          program: e['program'],
          description: e['description']
        }
      })
      console.log(results)
      sendJSON(res, true, {data: resultsRes, timestamp: updateTimestamp})
    })
  })
})

function sendJSON (res, result, obj) {
  obj['result'] = result
  res.json(obj)
}
