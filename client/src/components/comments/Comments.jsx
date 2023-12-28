import { Link } from "react-router-dom";
import "./comments.scss";
import React, { useContext, useState } from "react";
import {AuthContext} from "../../context/authContext.js"
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import axios from "axios";
import moment from "moment";

const Comments = ({postId}) =>{
    const [desc,setDesc] = useState("");
    //console.log(postId);
    const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const res = await axios.post(`http://localhost:8800/api/comments?postId=${postId}` ,newComment , {withCredentials:true});
      return res.data
    },
    onSuccess: async () => {
        // Invalidate and refetch comments
        await queryClient.invalidateQueries({ queryKey: ['comments'] });
        
        // Invalidate and refetch totalComments
        queryClient.invalidateQueries({ queryKey: ['totalComments', postId] });
      },
  })
  const handleclick = async (e) =>{
    e.preventDefault();
    mutation.mutate({cdesc:desc})
    setDesc("");
  }

    const {currentUser} = useContext(AuthContext);
    const { isPending, error, data:comments } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/comments?postId=${postId}`,{
                    withCredentials:true,
                });
                //console.log(res);
                return res.data;
            } catch (err) {
                console.log(err);
            }
        }
        
      });

      if (isPending) return 'Loading...';
    
      if (error) return 'An error has occurred';
    return(
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input type="text" placeholder="Wrtie a comment" value={desc} onChange={e=>setDesc(e.target.value)}/>
                <button onClick={handleclick}>Post</button>
            </div>
            {comments && comments.map(comment =>(
                <div className="comment">
                    <div className="info">
                    <Link to={`/profile/${comment.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="userInfo">
                        <img src={comment.profilePic} alt="" />
                        <span>{comment.name}</span>
                        </div>
                    </Link>
                        <span className="date">{moment(comment.cdate).fromNow()}</span>
                    </div>
                    <div className="content">
                        <span>{comment.cdesc}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default Comments;