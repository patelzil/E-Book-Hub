import React from 'react'
import { Card } from 'react-bootstrap'

export default function Message({senderName, message, time}) {
    const currentUser = JSON.parse(localStorage.getItem("userObject")).username;
    return (
        <>
            {
                senderName === currentUser ? (
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <div className="chat-right">
                            <Card.Title>{senderName}</Card.Title>
                            <Card.Text style={{margin: '0px', marginLeft: '8px', fontSize: "14px"}}>{message}</Card.Text>
                            <Card.Text style={{textAlign: 'right', fontSize: "11px"}}>{time}</Card.Text>
                        </div>
                    </div>
                ) : (
                    <div style={{display: "flex", justifyContent: "flex-start"}}>
                        <div className="chat-left">
                            <Card.Title>{senderName}</Card.Title>
                            <Card.Text style={{margin: '0px', marginLeft: '8px', fontSize: "14px"}}>{message}</Card.Text>
                            <Card.Text style={{textAlign: 'right', fontSize: "11px"}}>{time}</Card.Text>
                        </div>
                    </div>
                )
            }
        </>
    )
}
