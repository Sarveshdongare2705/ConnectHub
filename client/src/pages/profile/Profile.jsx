import React, { useContext } from "react";
import "./profile.scss";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { AuthContext } from "../../context/authContext";
import Posts from "../../components/posts/Posts"
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import Update from "../../components/update/Update";


const Profile =() =>{
    const {currentUser} = useContext(AuthContext);

    //get profile
    //to get id from url use useLocation hook
    const userId = parseInt(useLocation().pathname.split("/")[2])
    const { isPending, error, data:profile } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            try {       
                const res = await makeRequest.get(`http://localhost:8800/api/users?userId=${userId}`);
                //console.log(res);
                return res.data
            } catch (err) {
                console.log(err);
            }
        }
        
      });

      const { isLoading:risLoading,data:relationshipData } = useQuery({
        queryKey: ['relationshipfollower'],
        queryFn: async () => {
            try {       
                const res = await makeRequest.get(`http://localhost:8800/api/relationships/followers?followeduserId=${userId}`);
                //console.log(res);
                return res.data
            } catch (err) {
                console.log(err);
            }
        }
        
      });
      //total followers
      const followerCount = relationshipData ? relationshipData.length : 0;

      //total following
      const { isLoading:fisLoading,data:followingData } = useQuery({
        queryKey: ['relationshipfollowing'],
        queryFn: async () => {
            try {       
                const res = await makeRequest.get(`http://localhost:8800/api/relationships/following?followeduserId=${userId}`);
                //console.log(res);
                return res.data
            } catch (err) {
                console.log(err);
            }
        }
        
      });
      //total following
      const followingCount = followingData ? followingData.length : 0;



            //handleLike
            const queryClient = useQueryClient()
            const mutation = useMutation({
              mutationFn: async (following) => {
                  if(following) {
                    const res = await axios.delete(`http://localhost:8800/api/relationships?userId=${userId}`,{withCredentials:true});
                    console.log(res);
                    return res} 
                  return await makeRequest.post(`http://localhost:8800/api/relationships?userId=${userId}` , {withCredentials:true});
              },
              onSuccess: async () => {
                  // Invalidate and refetch comments
                  await queryClient.invalidateQueries({ queryKey: ['relationshipfollower'] });
                  await queryClient.invalidateQueries({ queryKey: ['relationshipfollowing'] });
                },
            })
            
      
      
            const handleFollow = (e) =>{
              e.preventDefault()
              //true or false
              mutation.mutate(relationshipData.includes(currentUser.id))
            }

      if(isPending) return 'is Loading .....'
      if(error) return 'An error occured . '


    return(
        <div className="profile">
            <div className="images">
                <img src={profile.coverPic} alt="" className="cover" />
                <img src={profile.profilePic} alt="" className="profile" />
                <div className="profileContainer">
                    <div className="userInfo">
                        <div className="left">
                            <a href="http://facebook.com">
                                <FacebookOutlinedIcon  fontSize="small"/>
                            </a>
                            <a href="http://instagram.com">
                                <InstagramIcon  fontSize="small"/>
                            </a>
                            <a href="http://Pinterest.com">
                                <PinterestIcon  fontSize="small"/>
                            </a>
                            <a href="http://twitter.com">
                                <TwitterIcon  fontSize="small"/>
                            </a>
                            <a href="http://youtube.com">
                                <YouTubeIcon  fontSize="small"/>
                            </a>
                        </div>
                        <div className="center">
                            <span>{profile.name}</span>
                            <div className="info">
                                <div className="item">
                                    <PlaceIcon />
                                    <span>{profile.city}</span>
                                </div>
                                <div className="item">
                                    <LanguageIcon />
                                    <span>{profile.country}</span>
                                </div>
                                <div className="item">
                                    <PersonOutlineOutlinedIcon />
                                    <span>{profile.username}</span>
                                </div>
                            </div>
                            { risLoading ? '' :profile.id == currentUser.id ?<button>Edit profile</button> 
                            :
                            relationshipData.includes(currentUser.id) ? <button onClick={handleFollow}>Following</button>: <button onClick={handleFollow}>Follow</button>
                            }
                        </div>
                        <div className="right">
                            <div className="item">
                                <span className="value">{followerCount}</span>
                                <span className="name"> Followers</span>
                            </div>
                            <div className="item">
                                <span className="value">{followingCount}</span>
                                <span className="name"> Following</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Posts userId = {userId} key={userId} />
            </div>
            <Update />
        </div>
    )
}

export default Profile