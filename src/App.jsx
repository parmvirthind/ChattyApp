import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous", colorID: "" },
      messages: [],
      userCount: 0
    };
    this.sendMsg = this.sendMsg.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setNotification = this.setNotification.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.exampleSocket = new WebSocket("ws://localhost:3001");
    let theApp = this;

    // Receiving message from server
    this.exampleSocket.onmessage = (function(event) {
      const dataObject = JSON.parse(event.data);
      if(dataObject.type === "counter") {
        let numberOfUsers = dataObject.userCount;
        theApp.setState({userCount: numberOfUsers});
      }
      const messages = theApp.state.messages.concat(dataObject);
      theApp.setState({messages: messages});
    })
    this.exampleSocket.onopen = (function(event) {
      console.log("Connection open");
    })

  }

// Send message to server
sendMsg(content) {
  const newMessage = {type: 'postMessage', 
                      username: this.state.currentUser.name, 
                      colorID: this.state.currentUser.colorID, 
                      content: content
                    };
  this.exampleSocket.send(JSON.stringify(newMessage));
}

// Set updated user info to server
setUser(content) {
  if(!content) {
    this.setState({currentUser: {name: "Anonymous", colorID: "black"}});
  } else {
      this.setState({currentUser: {name: content}});
    }
}

// Set notificatoin sent to server
setNotification(content) {
  if(!content) {
    let updateName = {type: 'postNotification', 
                      username:"", 
                      content: this.state.currentUser.name + " has changed their name to Anonymous "
                    };
    this.exampleSocket.send(JSON.stringify(updateName));
  } else {
      let updateName = {type: 'postNotification', 
                        username:"", 
                        content: this.state.currentUser.name + " has changed their name to " + content
                      };
      this.exampleSocket.send(JSON.stringify(updateName));
    }
}


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">notFacebook</a>
          <p>Number of Users: {this.state.userCount}</p>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar setNotification={this.setNotification} sendMsg={this.sendMsg} setUser={this.setUser} />
      </div>
    );
  }
}
export default App;

