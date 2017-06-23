import React from 'react'
import Header from './Header'
import MessageForm from './MessageForm'

export default class App extends React.Component {

  render() {
    return (
     <div id="app" className="flex flex-column">
      <main className="flex flex-column">
        <Header />

        <div className="flex flex-row flex-1 clear">
          <div className="flex flex-column col col-12">
            <main className="chat flex flex-column flex-1 clear"></main>
            <MessageForm />
          </div>
        </div>
      </main>
    </div>
    )
  }
}