import React, { Component } from 'react';

class ChatBar extends Component {
  render() {

    const sendMsg = this.props.sendMsg;
    const setUser = this.props.setUser;
    const setNotification = this.props.setNotification;

    // Adding event handler for `enter` on message field
    const onKeyPress = (e) => {
      if (e.which == 13) {
        sendMsg(e.target.value);
        e.target.value = "";
      };
    }

    // Adding event handler for `enter` on user field
    const userForm = (e) => {
      if (e.which == 13) {
        setUser(e.target.value);
        setNotification(e.target.value);
      }
    }

    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" onKeyPress={userForm} placeholder="Your Name (optional)" />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onKeyPress} />
        </footer>
      </div>
    );
  }
}

export default ChatBar;



// e.target.value