import React from 'react'
import { Button } from 'semantic-ui-react'

export default class Header extends React.Component {
  render() {
    return (
        <header className="title-bar flex flex-row flex-center">
          <div className="title-wrapper block center-element">
            <img className="logo" src="http://feathersjs.com/img/feathers-logo-wide.png"
              alt="Feathers Logo" />
            <span className="title">Chat</span>
            <a id='fb-button' className="button-primary" href='/auth/facebook'> Facebook </a>
            <Button id='login-button' primary> Regular Login </Button>
            <Button id='logout-button' primary> Logout </Button>
          </div>
        </header>
    )
  }
}