import { useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { addPost } from '../../../redux/postsSlice';
import { useNavigate } from "react-router-dom";
import './createBlog.css';

function CreateBlog() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      dispatch(addPost({ title, content }));
      setTitle('');
      setContent('');
    }
    navigate('/home');
  };

  const goBack = async() =>{
    navigate('/home');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <button style={{cursor: 'pointer'}} onClick={goBack}>Go back to home</button>
      <h1>Start a Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          style={{width: '100%', fontSize: '20px'}}
          placeholder="Enter a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          style={{width: '100%', height: '50vh' }}
          placeholder="Enter Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button style={{cursor: 'pointer',width: '100px', backgroundColor:'yellow', marginTop:'20px'}} type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default CreateBlog;