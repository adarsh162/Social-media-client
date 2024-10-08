import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";

const UserWidget = ({userId, picturePath}) => {
    const dispatch = useDispatch();
    const loggedUser = useSelector((state) => state.user);
    const [user, setUser] = useState(null);
    const {palette} = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const dark = palette.neutral.dark;
    const [isFriend, setIsFriend] = useState(null);
    const isUser = loggedUser._id === userId;

    const sendRequest = async () => {
        const response = await fetch(
            `https://social-media-backend-2-dzbo.onrender.com/users/sendRequest/${loggedUser._id}/${userId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
    }
    const getFriends = async () => {
        const response = await fetch(
            `https://social-media-backend-2-dzbo.onrender.com/users/${loggedUser._id}/friends`,{
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        if(response.ok){
            const data = await response.json();
            setIsFriend(data.find((friend) => friend._id === userId));
        }
    }
    const RemoveFriend = async () => {
        const response = await fetch(
            `https://social-media-backend-2-dzbo.onrender.com/users/removeFriend/${loggedUser._id}/${userId}`,
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
    const getUser = async () => {
        const response = await fetch(
            `https://social-media-backend-2-dzbo.onrender.com/users/${userId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        );
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        getFriends();
        getUser();
    },[]);
    //we can put loading component while doing this
    if(!user){
        return null;
    }
    const {
        firstName,
        lastName,
        location,
        occupation,
        friends,
        viewedProfile,
        impressions,
    } = user;
    return <WidgetWrapper>
        {/*First Row*/}
        <FlexBetween
            gap="0.5rem"
            pb="1.1rem"
            onClick={() => navigate(`/profile/${userId}`)}
        >
            <FlexBetween
                 gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                         variant="h4"
                         color={dark}
                         fontWeight="500"
                         sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                         }}
                         >
                            {firstName} {lastName}
                         </Typography>
                         <Typography color={medium}>{friends?.length} friends</Typography>
                    </Box>
                   
                 </FlexBetween>
                 {isFriend ? (
              <IconButton 
              onClick={() => RemoveFriend()} 
              sx={{ backgroundColor: primaryLight, p: "0.6rem", marginLeft: "6rem"}}
              >
              <PersonRemoveOutlined sx={{color: primaryDark}}/>
          </IconButton>
            ) : (
                <>
                {!isUser && (
                    <IconButton 
                    onClick={() => sendRequest()} 
                    sx={{ backgroundColor: primaryLight, p: "0.6rem", marginLeft: "6rem"}}
                >
                    <PersonAddOutlined sx={{color: primaryDark}}/>
                    </IconButton>
                )}
                </>
            )}
                 <ManageAccountsOutlined/>
                </FlexBetween>
                 <Divider/>
                 {/*Second row*/}
                 <Box p="1rem 0">
                         <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                            <LocationOnOutlined fontSize="large" sx={{color: main}}/>
                            <Typography color={medium}>{location}</Typography>
                         </Box>
                         <Box display="flex" alignItems="center" gap="1rem">
                            <WorkOutlineOutlined fontSize="large" sx={{color: main}}/>
                            <Typography color={medium}>{occupation}</Typography>
                         </Box>
                 </Box>
                 <Divider/>
                {/*Third Row*/}
                <Box p="1rem 0">
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Who's Viewed Your Profile</Typography>
                        <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
                    </FlexBetween>
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Impressions of Your Post</Typography>
                        <Typography color={main} fontWeight="500">{impressions}</Typography>
                    </FlexBetween>
                </Box>
                <Divider/>
                {/*Fourth Row*/}
                <Box p="1rem 0">
                    <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                        Social Profiles
                    </Typography>


                    <FlexBetween gap="1rem" mb="0.9rem">
                        <FlexBetween gap="1rem">
                            <img src="../assets/twitter.png" alt="twitter"/>
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    Twitter
                                </Typography>
                                <Typography color={medium}>Social Network</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}}/>
                    </FlexBetween>


                    <FlexBetween gap="1rem">
                        <FlexBetween gap="1rem">
                            <img src="../assets/linkedin.png" alt="linkedin"/>
                            <Box>
                                <Typography color={main} fontWeight="500">
                                    LinkedIn
                                </Typography>
                                <Typography color={medium}>Network Platform</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color: main}}/>
                    </FlexBetween>
                </Box>

           
    </WidgetWrapper>

}

export default UserWidget;