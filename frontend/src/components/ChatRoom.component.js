import React from "react";
import io from 'socket.io-client'
import NavBar from "./navbar.component";
import { Button, Form, FormControl } from "react-bootstrap";
import {TextField} from "@mui/material";
import Message from './message.component';

export default class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false,
            messages: [{
                senderName: "Zil",
                message: "message 1",
                time: 78
            },{
                senderName: "Ayush",
                message: "message 2",
                time: 78
            },{
                senderName: "Zil",
                message: "message 3",
                time: 78
            }],
            message: "",
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

        this.socket.on('message', (message) => {
            const getFullTime = () => {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
                const date = new Date();
                const month = months[date.getMonth()];
                const hour = (date.getHours() > 12) ? date.getHours() - 12 : date.getHours;
                const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                const am_pm = (date.getHours() > 12) ? " p.m." : " a.m.";
                return (month + " " + date.getDate() + "," + date.getFullYear() + " " + hour + ':' + minutes + am_pm)
            }
            // add the message to the database here
            const newMsg = {
                senderName: "Zil",
                message: message,
                time: getFullTime()
            }

            this.setState({messages: [...this.state.messages, newMsg]})
            console.log(this.state.messages)
        });
    }

    onChangeMsg = (e) =>{
        this.setState({ message: e});
    }

    onSend = (event) =>{
        event.preventDefault();
        if(this.state.message.length > 0) {
            this.socket.emit('message', this.state.message)
            this.setState({text: ''})
        }
    }

    render(){
        return (
            <>
                <div style={{ zIndex: 1000, top: 0, position: 'sticky', background: 'black' }}>
                    <NavBar/>
                </div>
                <div style={{}}>
                    <div style={{display: 'flex', flexDirection: "column", paddingRight: '7%', marginBottom: "10px"}}>
                        {this.state.messages.map(msg =>
                            <Message key={msg.time} message={msg.message} time={msg.time} senderName={msg.senderName}>
                                {msg.text}
                            </Message>
                        )}
                    </div>
                    <div style={{position: 'fixed', bottom: "0px", width: '100%'}}>
                        <Form style={{display: 'flex', flexDirection: "row", paddingLeft: '5%', paddingRight: '5%'}}>
                            <input
                                value={this.state.text}
                                autoComplete={"off"}
                                placeholder="Message..."
                                style={{ width: '80%', height: '34px', margin: "5px", padding: '9px', borderRadius: "10px", borderColor: "1px black", borderWidth: "1px"}}
                                onChange={ e => {this.onChangeMsg(e.target.value)}}
                            />
                            <Button
                                className="button"
                                variant="primary"
                                type="submit"
                                style={{width: "10%", height: "34px", margin: '5px'}}
                                onClick={this.onSend}
                            >
                                Send
                            </Button>
                        </Form>
                    </div>
                </div>
            </>
        )
    }
}
