import React from 'react'
import Header from './header'
import { Button, Input, Form } from 'semantic-ui-react'

export default class App extends React.Component {

  onClickSend(evt) {
    const nameInput = document.querySelector('[name="name"]');
    const textInput = document.querySelector('[name="text"]');
    
    client.service('messages').create({
      text: textInput.value,
      name: nameInput.value
    }).then(() => {
      textInput.value = '';
    });
      evt.preventDefault()
  }

  render() {
    return (
     <div id="app" className="flex flex-column">
      <main className="flex flex-column">
        <Header />

        <div className="flex flex-row flex-1 clear">
          <div className="flex flex-column col col-12">
            <main className="chat flex flex-column flex-1 clear"></main>

            <Form className="flex flex-row flex-space-between" id="send-message">
              <Input type="text" placeholder="Your name" name="name" className="col col-3"/>
              <Input type="text" placeholder="Enter your message" name="text" className="col col-7"/>
              <Button className="button-primary col col-2" type="submit" onClick={(evt)=>this.onClickSend(evt)}>Send</Button>
            </Form>
          </div>
        </div>
      </main>
    </div>
    )
  }
}