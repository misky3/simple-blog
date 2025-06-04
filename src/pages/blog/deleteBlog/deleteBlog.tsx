import { useParams, useNavigate } from "react-router-dom";
import { deletePost } from "../../../redux/postsSlice";
import { useAppDispatch, useAppSelector } from '../../../hooks';


export default function DeleteBlog(){
    const {id} = useParams<{id: string}>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const post = useAppSelector(state => state.posts.posts.find(p => p.id === id));

    if(!post) return <div>Post not Found</div>

    const handleDelete = async () =>{
        try{
            await dispatch(deletePost(id!)).unwrap();
            alert('Post deleted successfully');
            navigate('/home');
        }catch (error){
            alert('Failed to delete blog: ' + (error as Error).message);
        }
    };

    const goBack = async() =>{
    navigate('/home');
  };

    return(
        <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height: '50vh' }}>
            <div style={{ display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height: '50vh', gap: '10px' }}>
                <h2>Are you sure?</h2>
                <h3>{post.title}</h3>
                <button onClick={handleDelete} style={{cursor: 'pointer', color: 'white', backgroundColor: 'red'}}>Yes, Delete this post</button>
                <button style={{cursor: 'pointer'}} onClick={goBack}>Cancel</button>
            </div>
        </div>
    );
}