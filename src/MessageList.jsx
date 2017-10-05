import React, { Component } from 'React';
import Message from './Message.jsx';

class MessageList extends Component {
  handleMessage(msg) {
    console.log("Test 3: ", msg);
    switch(msg.colorID) {
      case 1: 
        return (<span className="message-username firstUser">{msg.username}</span>)
        break;
      case 2:
        return (<span className="message-username secondUser">{msg.username}</span>)
        break;
      case 3:
        return (<span className="message-username thirdUser">{msg.username}</span>)
        break;
      case 4:
        return (<span className="message-username fourthUser">{msg.username}</span>)
        break;
      default:
        return (<span className="message-username">{msg.username}</span>)
    }
  }

  render() {

    const message = this.props.messages.map(msg => {
      return <div key={msg.id} className="message">
        {/* <span className="message-username">{msg.username}</span> */}
        {console.log("Test 1: ", this.props.msg)}
        {console.log("Test 2: ", msg)}
        {this.handleMessage(msg)}
        <span className="message-content">{msg.content}</span>
      </div>
    })

    return (
      <main className="messages">
        <Message uniqueMessage={message} />
      </main>
    );
  }
}

export default MessageList;