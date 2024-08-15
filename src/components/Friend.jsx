import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";


const Friend = ({ friendId, name, subtitle, userPicturePath, isPost = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id} = useSelector((state)=>state.user);
    const token = useSelector((state)=>state.token);
    const friends = useSelector((state)=>state.user.friends);
    console.log("is post",isPost);
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const isFriend = friends.find((friend) => friend._id === friendId);

    const sendRequest = async () => {
        const response = await fetch(
            `http://localhost:3001/users/sendRequest/${_id}/${friendId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
    }
    const RemoveFriend = async () => {
        const response = await fetch(
            `http://localhost:3001/users/removeFriend/${_id}/${friendId}`,
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
                {!isPost && (<>
                    {(isFriend) ? (
                    <IconButton 
                    onClick={() => RemoveFriend()} 
                    sx={{ backgroundColor: primaryLight, p: "0.6rem", marginLeft: "6rem"}}
                >
                    <PersonRemoveOutlined sx={{color: primaryDark}}/>
                </IconButton>
                ) : (
                    <IconButton 
                    onClick={() => sendRequest()} 
                    sx={{ backgroundColor: primaryLight, p: "0.6rem", marginLeft: "6rem"}}
                >
                    <PersonAddOutlined sx={{color: primaryDark}}/>
                </IconButton>
                )
            }
                </>)}
                
            </FlexBetween>
        );
    
}

export default Friend;