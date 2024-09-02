import { Add, ChatBubbleOutlineOutlined, Delete, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Icon, IconButton, Input, Typography, useTheme } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    createdAt
}) => {

    const [isComments, setIsComments] = useState(false);
    const [addComment, setAddComment] = useState(false);
    const [commentVal, setCommentVal] = useState("");
    const postType = picturePath.includes(".mp4") ? "video" : picturePath.includes(".mp3") ? "audio" : "image";
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const createdAtDate = new Date(createdAt);
    const currentTime = new Date();
    // Calculate the difference in milliseconds
    const differenceInMillis = currentTime - createdAtDate;

    // Convert milliseconds to seconds, minutes, hours, or days as needed
    const differenceInSeconds = Math.floor(differenceInMillis / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);
    const AddCommentSubmit = async (e) => {
        const body = {
            userId: loggedInUserId,
            comment: commentVal
        }
        const response = await fetch(
            `https://social-media-backend-2-dzbo.onrender.com/posts/${postId}/addComment`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }
        );
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setCommentVal("");
        setAddComment(false);
    }
    const handleDelete = async (e) => {
        const body = {
            userId: loggedInUserId
        }
        const response = await fetch(
            `https://social-media-backend-2-dzbo.onrender.com/posts/${postId}/deleteComment`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }
        );
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    }
    const patchLike = async () => {
        const response = await fetch(
            `https://social-media-backend-2-dzbo.onrender.com/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: loggedInUserId
            })
        }
        );
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    }
    return (
        <WidgetWrapper m="2rem 0">

            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
                isPost={true}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && postType === "image" ? (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`https://social-media-backend-2-dzbo.onrender.com/assets/${picturePath}`} />
            ) :

                (
                    <>
                        {postType === "audio" ? (
                            <audio
                                width="100%"
                                height="auto"
                                alt="post"
                                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                                src={`https://social-media-backend-2-dzbo.onrender.com/assets/${picturePath}`}
                                controls />
                        ) : (
                            <video
                                width="100%"
                                height="auto"
                                alt="post"
                                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                                src={`https://social-media-backend-2-dzbo.onrender.com/assets/${picturePath}`}
                                controls />
                        )}


                    </>
                )

            }
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )
                            }
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>


                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => { setIsComments(!isComments); setAddComment(false) }}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments ? Object.keys(comments)?.length : 0}</Typography>
                        <IconButton onClick={() => { setIsComments(!isComments); setAddComment(true) }}>
                            <Add />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {addComment && isComments && (
                <>
                    <Input val={commentVal} onChange={(e) => setCommentVal(e.target.value)} placeholder="Add a comment"></Input>
                    <Button onClick={AddCommentSubmit}>Post</Button>
                </>
            )}
            {isComments && comments && (
                <>
                    <Box mt="0.5rem">
                        {Object.entries(comments).map((comment) => (
                            <>
                                <Divider />
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    my: "0.5rem"
                                }} gap="1rem" key={`${name}`}>
                                    <img
                                        style={{ objectFit: "cover", borderRadius: "50%" }}
                                        width="30px"
                                        height="30px"
                                        src={`https://social-media-backend-2-dzbo.onrender.com/assets/${JSON.parse(comment[1]).picturePath}`}
                                        alt="User"
                                    />
                                    <Typography>
                                        {JSON.parse(comment[1]).firstName} - {JSON.parse(comment[1]).comment} {comment[0] === loggedInUserId && <IconButton sx={{ ml: "5rem", color: "red" }} onClick={handleDelete}><Delete /></IconButton>}
                                    </Typography>
                                </Box>
                            </>
                        ))}

                    </Box>
                </>
            )}
            <Box>
            <Divider />
                {differenceInDays ?
                    <Typography color={main} sx={{ mt: "0.5rem" }}>
                        {differenceInDays} days ago
                    </Typography>
                    :
                    differenceInHours ?
                        <Typography color={main} sx={{ mt: "0.5rem" }}>
                            {differenceInHours} hours ago
                        </Typography> :
                        differenceInMinutes ?
                            <Typography color={main} sx={{ mt: "0.5rem" }}>
                                {differenceInMinutes} minutes ago
                            </Typography> :
                            <Typography color={main} sx={{ mt: "0.5rem" }}>
                                {differenceInSeconds} seconds ago
                            </Typography>
                }
            </Box>
        </WidgetWrapper>
    )
}

export default PostWidget;