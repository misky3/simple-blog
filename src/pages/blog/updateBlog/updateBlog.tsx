import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { updatePost } from '../../../redux/postsSlice';
import './updateBlog.css';

export default function UpdateBlog(){
    const { id } = useParams<{id: string}>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const post = useAppSelector((state)=>
        state.posts.posts.find((p) => p.id === id)
    );

    const [title, setTitle] = useState(post?.title ?? "");
    const [content, setContent] = useState(post?.content ?? "");

    if (!post) return <div>Post not found</div>

    const goBack = async() =>{
    navigate('/home');
  };

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
    dispatch(updatePost({ id: post.id, title, content}));
    console.log("update submit");
    navigate(`/post/${post.id}`);
  };

    return(
        <div style={{ padding: '2rem' }}>
            <button style={{cursor: 'pointer'}} onClick={goBack}>Go back</button>
            <div>
              <form onSubmit={handleSubmit}>
                <h2>Edit Post</h2>
                <input
                  style={{width: '100%', fontSize: '20px'}}
                  type="text"
                  value={title}
                  onChange={(e)=> setTitle(e.target.value)}
                  placeholder="Title"
                  required
                />
                <br/>
                <textarea 
                  style={{width: '100%', height: '50vh' }}
                  value={content}
                  onChange={(e)=> setContent(e.target.value)}
                  placeholder="Content"
                  required
                />
                <br/>
                <button style={{ cursor: 'pointer', width: '120px', backgroundColor:'yellow', marginTop:'20px'}} type="submit">Save Changes</button>
              </form>
            </div>
        </div>
    );
}