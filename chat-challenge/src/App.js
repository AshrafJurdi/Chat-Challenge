import React, { Component } from "react";
import io from "socket.io-client";

class App extends Component {
  state = {
    isConnected: false,
    id: null,
    peeps: [],
    input: {}
  };
  socket = null;

  componentWillMount() {
    this.socket = io("https://codi-server.herokuapp.com");

    this.socket.on("connect", () => {
      this.setState({ isConnected: true });
    });

    this.socket.on("pong!", () => {
      console.log("the server answered!");
    });

    this.socket.on("pong!", additionalStuff => {
      console.log("server answered!", additionalStuff);
    });

    this.socket.on("disconnect", () => {
      this.setState({ isConnected: false });
    });

    this.socket.on("youare", answer => {
      this.setState({ id: answer.id });
    });

    this.socket.on("next", message_from_server =>
      console.log("this is the message from server ===>", message_from_server)
    );
    this.socket.on("answer", answer => console.log("answer ===>", answer));

    this.socket.on("room_message", roomMessages =>
      console.log("this is the message from room ===>", roomMessages)
    );
    /** this will be useful way, way later **/
    this.socket.on("room", old_messages => console.log(old_messages));
  }

  componentWillUnmount() {
    this.socket.close();
    this.socket = null;
  }

  render() {
    return (
      <div className="App">
        <div>
          status: {this.state.isConnected ? "connected" : "disconnected"}
        </div>
        <div>id: {this.state.id}</div>

        <button onClick={() => this.socket.emit("ping!")}>ping</button>
        <button onClick={() => this.socket.emit("whoami")}>Who am I?</button>

        <input onChange={e => this.setState({ input: e.target.value })}></input>
        <button
          onClick={() =>
            this.socket.emit(
              "message",
              { id: this.state.id, name: "Ashraf", text: this.state.input },
              event => {
                event.preventDefault();
              }
            )
          }
        >
          submit
        </button>
      </div>
    );
  }
}

export default App;
