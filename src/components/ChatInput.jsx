import { Send } from '@mui/icons-material';
import { IconButton, Input, Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
var socket;
const ChatInput = ({ chat, reload, setReload }) => {
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const [msg, setMsg] = useState("");

    const handleSubmit = async () => {
        const response = await fetch("https://social-media-backend-2-dzbo.onrender.com/msgs",{
            method: "POST",
            headers: {Authorization: `Bearer ${token}`, "Content-Type":"application/json"},
            body: JSON.stringify({chatRoomId : chat._id,sender : _id,messageContent : msg})
        });
        const data = await response.json();
        var socket = io("https://social-media-backend-2-dzbo.onrender.com")
        socket.emit("new message", data);
        setMsg("");
        setReload(!reload);
    }
    return (
        <div>
            <Box backgroundColor={neutralLight} sx={{ height: "3rem", width: "70%", position: "fixed", bottom: "0", alignItems: "center" }} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                <Input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type here" style={{ width: "92%", height: "100%"}} />
                <IconButton onClick={handleSubmit} type="submit" style={{ position : "absolute", marginLeft : "2rem", marginRight : "1rem", zIndex : "1"}}>
                    <Send />
                </IconButton>
            </Box>
        </div>
    )
}

export default ChatInput
