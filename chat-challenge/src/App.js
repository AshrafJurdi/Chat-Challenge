import React, { Component } from "react";
import io from "socket.io-client";
import "./App.css";

class App extends Component {
  state = {
    isConnected: false,
    id: null,
    peeps: [],
    input: "",
    room: []
  };
  socket = null;

  componentWillMount() {
    this.socket = io("https://codi-server.herokuapp.com");

    this.socket.emit("whoami", answer => {
      console.log("yo ===>", answer);
    });

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
      console.log("iddd ===>", answer);
      this.setState({ id: answer.id });
    });

    this.socket.on("next", message_from_server =>
      console.log("this is the message from server ===>", message_from_server)
    );
    this.socket.on("answer", answer => console.log("answer ===>", answer));

    this.socket.on("room_message", roomMessages =>
      // console.log("this is the message from room ===>", roomMessages)
      this.setState({ room: [...this.state.room, roomMessages] })
    );
    /** this will be useful way, way later **/
    this.socket.on("room", old_messages => {
      this.setState({ room: old_messages });
      console.log("heyyyy", this.state.room);
    });
  }

  componentWillUnmount() {
    this.socket.close();
    this.socket = null;
  }

  render() {
    return (
      <div classNameName="App">
        <div classNam e="container-fluid h-100">
          <div className="row justify-content-center h-100">
            <div className="col-md-4 col-xl-3 chat">
              <div className="card mb-sm-3 mb-md-0 contacts_card">
                <div className="card-header">
                  <p Style={"color:white"}>Groups</p>
                </div>
                <div className="card-body contacts_body">
                  <ui className="contacts">
                    <li className="active">
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img
                            src="data:image/png;base64,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"
                            className="rounded-circle user_img"
                          ></img>
                          <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                          <span>Codi Chat Room</span>
                        </div>
                      </div>
                    </li>
                  </ui>
                </div>
                <div className="card-footer"></div>
              </div>
            </div>
            <div className="col-md-8 col-xl-6 chat">
              <div className="card">
                <div className="card-header msg_head">
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img
                        src="data:image/png;base64,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"
                        className="rounded-circle user_img"
                      ></img>
                      <span className="online_icon"></span>
                    </div>
                    <div className="user_info">
                      <span>Codi Chat Room</span>
                      <p>{this.state.room.length} Messages</p>
                    </div>
                  </div>
                </div>

                <div className="card-body msg_card_body">
                  {this.state.room.map(content => {
                    if (content.name === "Ashraf") {
                      return (
                        <div className="d-flex justify-content-end mb-4">
                          <div className="msg_cotainer_send">
                            <p className="name">{content.name}</p>
                            {content.text}
                            <span className="msg_time_send">
                              {content.date}
                            </span>
                          </div>
                          <div className="img_cont_msg">
                            <img
                              src="https://pbs.twimg.com/profile_images/1055582339273838594/Yo1f_Ua0_400x400.jpg"
                              className="rounded-circle user_img_msg"
                            ></img>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="d-flex justify-content-start mb-4">
                          <div className="img_cont_msg">
                            <img
                              src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png"
                              className="rounded-circle user_img_msg"
                            ></img>
                          </div>

                          <div className="msg_cotainer">
                            <p className="name">{content.name}</p>
                            {content.text}
                            <span className="msg_time">{content.date}</span>
                          </div>
                        </div>
                      );
                    }
                  })}

                  <div className="card-footer">
                    <div className="input-group">
                      <textarea
                        name=""
                        className="form-control type_msg"
                        placeholder="Type your message..."
                        value={this.state.input}
                        onChange={e => this.setState({ input: e.target.value })}
                      ></textarea>
                      <div className="input-group-append">
                        <span
                          className="input-group-text send_btn"
                          onClick={() => {
                            this.socket.emit("message", {
                              id: this.state.id,
                              name: "Ashraf",
                              text: this.state.input
                            });
                            {
                              this.setState({ input: "" });
                            }
                          }}
                        >
                          <i className="fas fa-location-arrow"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div>
            status: {this.state.isConnected ? "connected" : "disconnected"}
          </div>
          <div>id: {this.state.id}</div>

          <button onClick={() => this.socket.emit("ping!")}>ping</button>
          <button onClick={() => this.socket.emit("whoami")}>Who am I?</button>

          <input
            onChange={e => this.setState({ input: e.target.value })}
          ></input>
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
          </button> */}
        </div>
      </div>
    );
  }
}

export default App;
