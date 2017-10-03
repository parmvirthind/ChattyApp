import React, {Component} from 'react';

class ChatBar extends Component {
    render() {

        const sendMsg = this.props.sendMsg;

        const onKeyPress = (e) => {
           if(e.which == 13) {
               sendMsg(e.target.value);
               e.target.value = "";
           };
       }
 
        return (
            <div>
                <footer className="chatbar">
                    <input className="chatbar-username" value={this.props.username} />
                    <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onKeyPress} />
                </footer>
            </div>
        );
    }
}

export default ChatBar;



// e.target.value