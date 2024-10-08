import { React, useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Badge,
  Input
} from '@mui/material';

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from 'state';
import FlexBetween from 'components/FlexBetween';
import { useNavigate } from 'react-router-dom';


const Navbar = ({setIsSearch, setSearch}) => {
  //for toggling in the mobile screens
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [val, setVal] = useState("");
  const user = useSelector((state) => state.user);
  const isNoneMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const handleChange = (event) => {
    setVal(event.target.value);
  };
  const handleSubmit = (event) => {
    setSearch(val);
    setIsSearch(true);
  }

  const fullName = user ?`${user.firstName} ${user.lastName}`:'fake person';
  return <FlexBetween padding="1rem 6%" backgroundColor={alt}>
    <FlexBetween gap="1.75rem">
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem, 2.5rem)"
        color="primary"
        onClick={() => {
          navigate("/home");
          if(setIsSearch)setIsSearch(false);
          }
        }
        sx={{
          "&:hover": {
            color: primaryLight,
            cursor: "pointer"
          }
        }}>
        Sociopedia
      </Typography>
      {isNoneMobileScreens && (
        <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
          <Input onChange={handleChange} aria-label="search" placeholder="Search..." />
            <IconButton onClick={handleSubmit}>
              <Search />
            </IconButton>
        </FlexBetween>
      )}
      </FlexBetween>

      {/*Desktop screens*/}
      {isNoneMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton onClick={() => navigate("/chat")}>
          <Message sx={{ fontSize: "25px" }} />
          </IconButton>
          <IconButton onClick={() => navigate("/notification")} sx={{ fontSize: "25px" }}>

            <Badge badgeContent={user.friend_requests.length} color="error">
            <Notifications sx={{ fontSize: "25px" }} />
            </Badge>
            
          </IconButton>
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem"
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      )}
      {/*Mobile Nav*/}
      {!isNoneMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/*Close Icon*/}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close />
            </IconButton>
          </Box>

          {/*Menu Items*/}
          <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
          <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <IconButton onClick={() => navigate("/notification")} sx={{ fontSize: "25px" }}>
          <Badge badgeContent={user.friend_requests.length} color="error">
            <Notifications sx={{ fontSize: "25px" }} />
            </Badge>
          </IconButton>
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem"
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>
          </FlexBetween>
        </Box>
      )}
    
  </FlexBetween>
}

export default Navbar;
