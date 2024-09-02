import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import Request from "components/Request";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setRequests } from "state";

const RequestListWidget = ({ userId}) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state)=>state.token);
    const friend_requests = useSelector((state)=>state.user.friend_requests);

    const getFriends = async () => {
        const response = await fetch(
            `https://social-media-backend-2-dzbo.onrender.com/users/getUserRequests/${userId}`,{
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        if(response.ok){
            const data = await response.json();
            dispatch(setRequests({ requests : data}));
        }
    }
    useEffect(()=>{
        getFriends();
    },[]);
    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{mb: "1.5rem"}}
            >
                Request List
            </Typography>
            <Box display="flex" flexDirection="col" gap="1.5rem">
                {friend_requests.map((friend)=>(
                    <Request 
                        key={friend._id} 
                        friendId={friend._id} 
                        name={`${friend.firstName} ${friend.lastName}`} 
                        subtitle={friend.occupation} 
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    )
}

export default RequestListWidget;