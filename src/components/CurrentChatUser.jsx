import { Box } from '@mui/material';
import React from 'react';
import UserImage from './UserImage';
import { useSelector } from 'react-redux';

const CurrentChatUser = ({ chat }) => {
    const { _id } = useSelector((state) => state.user);
    const user = chat?.users.find(user => user._id !== _id);
    
    return (
        <div style={{ width: "100%" }}>
            <Box sx={{
                display: "flex", gap: "0.9rem", alignItems: "center", padding: "1.3rem 1.3rem", margin: "0rem", bgcolor: "rgb(17 24 39)", '&:hover': {
                    backgroundColor: 'rgb(31 41 55)',
                    transition: 'background-color 0.3s ease',
                    cursor: 'pointer',
                },
                position: "fixed",
                top: "0",
                zIndex: "10",
                width: "100%",
            }}>
                <UserImage image={user?.picturePath} size="55px" />
                <div style={{ justifyContent: "center" }}>
                    <p style={{ margin: "0.2rem 0", fontSize: "1rem" }}>{user ? user.firstName +" "+ user?.lastName: ""}</p>
                    <span>Offline</span>
                </div>
            </Box>
        </div>
    )
}

export default CurrentChatUser
