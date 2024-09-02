import { Search } from "@mui/icons-material";
import { Box, Input, IconButton, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatUserWidget from "../widgets/ChatUserWidget";
import CurrentChatUser from "components/CurrentChatUser";
import Message from "components/Message";
import MessageWidget from "./MessageWidget";
import ChatInput from "components/ChatInput";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const ENDPOINT = "https://social-media-backend-2-dzbo.onrender.com";
var socket, selectedChatCompare;

export const ChatWidget = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const [chat, setChat] = useState(null);
    const [reload, setReload] = useState(false);
    const [search, setSearch] = useState("");
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => {setReload(!reload)});
    }, []);

    useEffect(() => {
        if(chat)
            socket.emit("join room", chat._id);
    }, [chat]);

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "row", height: "100%", marginTop: "0rem" }}>
                <Box sx={{ width: "30%", bgcolor: "black", color: "white" }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <h1 style={{ marginLeft: "2rem", marginTop: "2rem", height: "3%", fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer", maxWidth: "50%"}} onClick={() => setChat(null)}>Chat</h1>
                    <h1 style={{ marginTop: "2rem", marginRight: "2rem", height: "3%", fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer", maxWidth: "50%" }} onClick={() => navigate("/")}>Home</h1>
                    </div>
                    <Box backgroundColor={neutralLight} sx={{ height: "5%", width: "80%", mb: "3rem", mx: "2rem", mt: "2rem" }} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <Input style={{ width: "85%" }} onChange={(e) => { console.log(e.target.value); setSearch(e.target.value) }} aria-label="search" placeholder="Search..." />
                        <IconButton style={{ color: dark, marginLeft: "0rem" }} >
                            <Search />
                        </IconButton>
                    </Box>
                    <hr />
                    <ChatUserWidget user={user} search={search} reload={reload} setReload={setReload} setChat={setChat} />
                </Box>
                <Box sx={{ width: "70%", backgroundImage: "url(https://social-media-backend-2-dzbo.onrender.com/assets/bg.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover", bgcolor: "black", color: "white", overflowY: "auto" }}>
                    {
                        chat ? (
                            <> 
                                <CurrentChatUser chat={chat} />
                                <MessageWidget chat={chat} reload={reload} />
                                <ChatInput chat={chat} reload={reload} setReload={setReload}/>
                            </>
                        ) : (
                            <p style={{ marginLeft: "20%", marginTop: "30%", height: "3%", fontSize: "3.5rem", fontWeight: "bold" }}>Select a user to start chat</p>
                        )
                    }

                </Box>
            </Box>
        </>
    );
}