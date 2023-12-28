import "./share.scss";
import Image from "../../assets/addimage.png";
import Map from "../../assets/addplace.png";
import Friend from "../../assets/tagfreinds.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import {useMutation , useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    `New day, new story! What's on your mind, ${currentUser.name}? 🌟`,
    `What's cooking, ${currentUser.name}? 🍳`,
    `Share your latest adventure, ${currentUser.name}! 🌍✈️`,
    `Ready to inspire, ${currentUser.name}? Share something amazing! 📸`,
    `Feeling creative, ${currentUser.name}? Show us your masterpiece! 🎨`,
    `Got a story to tell, ${currentUser.name}? Share it with us! 📖`,
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      // Update placeholder index in a rotating manner
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 5000); // Change placeholder every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [placeholders.length]);

  const upload = async ()=>{
    try{
      const formData = new FormData();
      formData.append("file" , file);
      const res = await axios.post("http://localhost:8800/api/upload" , formData , {withCredentials:true,});
      return res.data;
    }catch(err){
      console.log(err);
    }
  }


  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const res = await axios.post("http://localhost:8800/api/posts" ,newPost , {withCredentials:true});
      return res.data
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })


  const handleclick = async (e) =>{
    e.preventDefault();
    let imgUrl = '';
    if (file) imgUrl  = await upload();
    mutation.mutate({desc:desc , img:imgUrl})
    setDesc('');
    setFile(null);
  }



  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic} alt="" />
            <input
              type="text"
              placeholder={placeholders[placeholderIndex]}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            {desc || file  ? <button onClick={handleclick}>Post</button> : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;