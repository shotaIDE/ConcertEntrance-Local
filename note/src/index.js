import React from 'react'
import ReactDOM from 'react-dom'
import request from 'superagent'

class ConcertEntranceApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }
  componentWillMount () {
    this.loadLogs()
  }
  loadLogs () {
    request
      .get('/api/getItems')
      .end((err, data) => {
        if (err) {
          console.error(err)
          return
        }
        this.setState({
          items: data.body.data,
          timestamp: data.body.timestamp
        })
      })
  }
  render () {
    const itemsHtml = this.state.items.map(e => (
      <li key={e._id}><a href={e.srcUrl}>{e.title}</a>
        <ul>
          <li>前売開始日: {e.onSaleDate}</li>
          <li>日時: {e.heldDate} {e.heldTime}</li>
          <li>場所: {e.heldPlace}</li>
          <li>{e.description}}</li>
        </ul>
      </li>
    ))
    return (
      <div>
        <h1 style={styles.h1}>クラシックコンサート検索</h1>
        <p style={styles.right}>
          最終更新日時：{this.state.timestamp}
        </p>
        <p style={styles.right}>
          <button onClick={e => this.loadLogs()}>
          Reload</button></p>
        <ul>{itemsHtml}</ul>
      </div>
    )
  }
}

const styles = {
  h1: {
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 24,
    padding: 12
  },
  right: {
    textAlign: 'right'
  }
}

ReactDOM.render(
  <ConcertEntranceApp />,
  document.getElementById('root'))
