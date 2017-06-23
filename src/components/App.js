import React from 'react'
import Header from './header'

export default class App extends React.Component {
  render() {
    return (
     <div id="app" className="flex flex-column">
      <main className="flex flex-column">
        <Header />

        <div className="flex flex-row flex-1 clear">
          <div className="flex flex-column col col-12">
            <main className="chat flex flex-column flex-1 clear"></main>

            <form className="flex flex-row flex-space-between" id="send-message">
              <input type="text" placeholder="Your name" name="name" className="col col-3"/>
              <input type="text" placeholder="Enter your message" name="text" className="col col-7"/>
              <button className="button-primary col col-2" type="submit">Send</button>
            </form>
          </div>
        </div>
      </main>
    </div>
    )
  }
}