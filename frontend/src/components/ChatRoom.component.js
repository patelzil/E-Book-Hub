import React from "react";
import io from 'socket.io-client'
import NavBar from "./navbar.component";
import { Button, Form } from "react-bootstrap";
import {TextField} from "@mui/material";

export default class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            data: null,
            messages: [],
            text: "",
            username:"",
            bookClub: 23
        }
        this.socket =  io('http://localhost:3005', {
            transports: ['websocket'],
        });
    }

    componentDidMount() {
        this.socket.on('connect', () => {
            console.log("frontend - connect")
            this.setState({isConnected: true});
        });

        this.socket.on('chat message', (message) => {
            // add the message to the database here
            const newMsg = {
                senderID: 12,
                text: message,
                time: Date().toLocaleString()
            }
            this.setState({messages: [...this.state.messages, newMsg]})
            console.log(this.state.messages)
        });
    }

    onChangeText = (e) =>{
        this.setState({ text: e});
    }

    onSend = (event) =>{
        event.preventDefault();
        this.socket.emit('chat message', this.state.text)
        this.setState({text:''})
    }

    render(){
        return (
            <>
                <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}>
                    <NavBar/>
                </div>
                <div>
                    connection: {this.state.isConnected ? "connected" : "not connected"}<br/>
                    message:<br/>
                    <div>{this.state.messages.map(msg => <p key={msg.time}>{msg.text}</p>)}</div>
                    data: {this.state.data}<br/>
                    text: {this.state.text}
                </div>
                <div className="form-div">
                    <Form
                        className="form"
                    >
                        <Form.Group className="mb-3 input-div" controlId="formFirstName" title="firstName">
                            <TextField
                                id="textMessage"
                                hiddenLabel
                                value={this.state.text}
                                autoComplete={"off"}
                                type = "text"
                                size="small"
                                style={{ width: "100%"}}
                                placeholder="Message..."
                                onChange={ e => {this.onChangeText(e.target.value)}}
                            />
                        </Form.Group>

                        <Button
                            className="submit-button input-div"
                            style={{width: "350px"}}
                            variant="primary"
                            type="submit"
                            title= "registerButton"
                            onClick={this.onSend}
                        >
                            Submit
                        </Button>
                    </Form>
                </div>
            </>
        )
    }
}
