    import { useContext } from "react"
    import "./stories.scss"
    import {AuthContext} from "../../context/authContext.js";

    const Stories =() =>{
        const {currentUser} = useContext(AuthContext);
        //dummy data
        const stories = [
            {
                id:1,
                name:"Thomas Shelby",
                img:"https://images.pexels.com/photos/2127789/pexels-photo-2127789.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
            {
                id:2,
                name:"Thomas Shelby",
                img:"https://images.pexels.com/photos/119777/pexels-photo-119777.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
            {
                id:3,
                name:"Thomas Shelby",
                img:"https://images.pexels.com/photos/2074109/pexels-photo-2074109.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
            {
                id:4,
                name:"Thomas Shelby",
                img:"https://images.pexels.com/photos/1232594/pexels-photo-1232594.jpeg?auto=compress&cs=tinysrgb&w=600",
            },
        ]
        return(
            
            <div className="stories">
                <div className="scrollcontainer">
                <div className="story" key={currentUser.id}>
                    <img src={currentUser.profilePic} alt="" />
                    <span>Your Story</span>
                    <button>+</button>
                </div>
                {stories.map(story =>(
                    <div className="story">
                        <img src={story.img} alt="" />
                        <span>{story.name}</span>
                    </div>
                ))}
                </div>
            </div>
        )
    }

    export default Stories;