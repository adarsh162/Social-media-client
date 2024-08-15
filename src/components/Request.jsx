import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setRequests } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";


const Request = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id, friend_requests} = useSelector((state)=>state.user);
    const token = useSelector((state)=>state.token);
    const friends = useSelector((state)=>state.user.friends);
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    //const isFriend = friends.find((friend) => friend._id === friendId);

    const acceptRequest = async () => {
        const response = await fetch(
            `http://localhost:3001/users/acceptRequest/${_id}/${friendId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if(response.ok){
            const data = await response.json();
            dispatch(setFriends({ friends : data}));
            dispatch(setRequests({ requests : friend_requests.filter((request) => request._id !== friendId)}));
        }
    }
    const cancelRequest = async () => {
        const response = await fetch(
            `http://localhost:3001/users/cancelRequest/${_id}/${friendId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if(response.ok){
            const data = await response.json();
            //dispatch(setFriends({ friends : data}));
            dispatch(setRequests({ requests : friend_requests.filter((request) => request._id !== friendId)}));
        }
    }

        return (
            <FlexBetween>
                <FlexBetween gap="1rem">
                    <UserImage  image={userPicturePath} size="55px"/>
                    <Box
                        onClick={() => {
                            navigate(`/profile/${friendId}`);
                            navigate(0);
                        }}>
                            <Typography
                                color={main}
                                variant="h5"
                                fontWeight="500"
                                sx={{
                                    "&:hover":{
                                        color: palette.primary.light,
                                        cursor: "pointer"
                                    }
                                }}
                            >
                                    {name}
                            </Typography>
                            <Typography color={medium} fontSize="0.75rem">{subtitle}</Typography>
                    </Box>
                </FlexBetween>
                <IconButton 
                    onClick={() => acceptRequest()} 
                    sx={{ backgroundColor: primaryLight, p: "0.6rem", marginLeft: "7rem"}}
                >
                    <PersonAddOutlined sx={{color: primaryDark}}/>
                </IconButton>
                <IconButton 
                    onClick={() => cancelRequest()} 
                    sx={{ backgroundColor: primaryLight, p: "0.6rem", marginLeft: "1rem"}}
                >
                    <PersonRemoveOutlined sx={{color: primaryDark}}/>
                </IconButton>
            </FlexBetween>
        );
}

export default Request;