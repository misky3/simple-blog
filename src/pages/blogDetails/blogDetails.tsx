import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function PostDetails(){
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const post = useAppSelector((state) =>
        state.posts.posts.find((p) => p.id === id) //ignore the error
    );

    if (!post){
        return <div>Post not found.</div>
    }

    const goBack = async() =>{
    navigate('/home');
  };

    return(
        <div style={{padding: '2rem' }}>
            <div>
                <button style={{cursor: 'pointer'}} onClick={goBack}>Home</button>
            </div>
            <div>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </div>
        </div>
    );
}