import React from 'react'

export default class Header extends React.Component {
  render() {
    return (
        <header className="title-bar flex flex-row flex-center">
          <div className="title-wrapper block center-element">
            <img className="logo" src="http://feathersjs.com/img/feathers-logo-wide.png"
              alt="Feathers Logo" />
            <span className="title">Chat</span>
            <a id='fb-button' className="button-primary" href='/auth/facebook'> Facebook </a>
            <button id='login-button' className="button-primary"> Regular Login </button>
            <button id='logout-button' className="button-primary"> Logout </button>
          </div>
        </header>
    )
  }
}