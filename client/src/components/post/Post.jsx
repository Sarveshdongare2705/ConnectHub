import React, { useContext, useState } from "react";
import "./post.scss";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CommentsDisabledRoundedIcon from '@mui/icons-material/CommentsDisabledRounded';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import Comments from "../comments/Comments.jsx";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../context/authContext.js";
import { makeRequest } from "../../axios.js";

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const Post = ({ post }) => {
    const {currentUser} = useContext(AuthContext);

    //getting count of comments and likes

    const [commentOpen , setCommentOpen] = useState(false);

    //likes
    const { isPending, error, data} = useQuery({
        queryKey: ['likes' , post.postId],
        queryFn: async  () => {
            try {
                const res = await   axios.get(`http://localhost:8800/api/likes?postId=${post.postId}/`,{
                    withCredentials:true,
                });
                //console.log(res);
                return res.data;
            } catch (err) {
                console.log(err);
            }
        }
        
      });
      //comments
      const { isPending1, error1, data:totalComments } = useQuery({
        queryKey: ['totalComments' , post.postId],
        queryFn: async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/comments/total?postId=${post.postId}`,{
                    withCredentials:true,
                });
                return res.data[0];
            } catch (err) {
                console.log(err);
            }
        }
        
      });


      //handleLike
      const queryClient = useQueryClient()
      const mutation = useMutation({
        mutationFn: async (liked) => {
            if(liked) return  await axios.delete(`http://localhost:8800/api/likes?postId=${post.postId}`,{withCredentials:true});
            return await makeRequest.post(`http://localhost:8800/api/likes?postId=${post.postId}`);
        },
        onSuccess: async () => {
            // Invalidate and refetch comments
            await queryClient.invalidateQueries({ queryKey: ['likes' , post.postId] });
          },
      })
      


      const handleLike = (e) =>{
        e.preventDefault()

        //true or false
        mutation.mutate(data.includes(currentUser.id))
      }

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className="name">{post.name}</span>
                            </Link>
                            <span className="date">{moment(post.postdate).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizOutlinedIcon />
                </div>
                <div className="content">
                    <p>{post.pdesc}</p>
                    {post.pimg ? <img src={`upload/${post.pimg}`} alt="Error loading image!" /> : ''}
                </div>
                <div className="Info">
                    <div className="item">
                    {isPending ? ("..") : data.includes(currentUser.id) ? (
                    <FavoriteOutlinedIcon style={{color:"red"}} onClick={handleLike}/>
                    ) : (
                    <FavoriteBorderOutlinedIcon onClick={handleLike}/>
                    )}
                    <span>{data?.length || 0} {data && data.length === 1 ? 'Like' : 'Likes'}</span> 
                    </div>
                    <div className="item" onClick={()=>{setCommentOpen(!commentOpen)}}>
                        {commentOpen ?<CommentsDisabledRoundedIcon /> :<TextsmsOutlinedIcon />}
                        <span>{totalComments && totalComments.totalComments}{totalComments && totalComments.totalComments == 1 ? ' Comment' : ' Comments'}</span>



                    </div>
                    <div className="item">
                        <ReplyOutlinedIcon />
                        <span>Share</span>
                    </div>
                </div>
                {commentOpen?<Comments postId={post.postId} key={post.postId}/>:<></>}
            </div>
        </div>
    )
}

export default Post;
