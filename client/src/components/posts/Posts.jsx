import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import Post from "../post/Post.jsx"

const Posts = ({ userId }) => {
    const { currentUser } = useContext(AuthContext);
    const { isPending, error, data: posts } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            try {
                const response = await axios.get(`http://localhost:8800/api/posts?userId=${userId}`, { withCredentials: true });
                console.log(response.data);
                return response.data; // Return the data fetched from the API
            } catch (err) {
                console.log(err);
                throw new Error('Failed to fetch posts'); // Throw an error to handle it in the error condition
            }
        }
    });

    if (isPending) return 'is Loading ...';
    if (error) return `An error has occurred: ${error.message}`;

    return (
        <div className="posts">
            {posts.map(post => (
                <Post post={post} key={post.postId} />
            ))}
        </div>
    );
};

export default Posts;
