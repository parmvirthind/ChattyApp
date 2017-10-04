import React, { Component } from 'react';

class ChatBar extends Component {
  render() {

    const sendMsg = this.props.sendMsg;
    const setUser = this.props.setUser

    const onKeyPress = (e) => {
      if (e.which == 13) {
        sendMsg(e.target.value);
        e.target.value = "";
      };
    }

    const userForm = (e) => {
      if (e.which == 13) {
        setUser(e.target.value);
      }
    }

    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" onKeyPress={userForm} />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onKeyPress} />
        </footer>
      </div>
    );
  }
}

export default ChatBar;



// e.target.value