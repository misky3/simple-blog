import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchPosts } from '../../../redux/postsSlice';
import './paignationBlog.css';

export default function Home(){
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const posts = useAppSelector((state) => state.posts.posts);

    const [currentPage, setCurrentpage] = useState(1);
    const postsPerPage = 5;

      useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;

    const reversedPosts = [...posts].reverse();
    const currentPosts = reversedPosts.slice(indexofFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(posts.length / postsPerPage);

    const nextPage = () =>{
        if(currentPage < totalPages) setCurrentpage( currentPage + 1);
    };

    const prevPage = () =>{
        if(currentPage > 1) setCurrentpage(currentPage - 1);
    };

    const createBlog = async () =>{
        navigate('/createBlog');
    };

    const logout = async () =>{
        navigate('/logout');
    };

    return(
        <div className="home">
            <div className="dashboard">
                <h2>Dashboard</h2>
                <div className="buttons">
                    <button onClick={createBlog} style={{cursor: 'pointer',backgroundColor: 'yellow'}}>Create a Blog</button>
                    <button onClick={logout} style={{cursor: 'pointer', backgroundColor: 'red', color: 'white'}}>Logout</button>
                </div>
            </div>
            <hr></hr>
            <div>
                <h2>Blogs</h2>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                        <tr>
                            <th style={{borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px'}}>Title</th>
                            <th style={{borderBottom: '1px solid #ccc', padding: '8px'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map((post) =>(
                            <tr key={post.id} style={{borderBottom: '1px solid #eee'}}>
                                <td
                                    style={{cursor: 'pointer', color: 'blue', padding: '8px'}}
                                    onClick={() => navigate(`/post/${post.id}`)}
                                >
                                    {post.title}
                                </td>
                                <td style={{ padding: '8px', display: 'flex', justifyContent:'center'}}>
                                    <button 
                                        style={{cursor: 'pointer'}}
                                        onClick={()=> navigate(`/edit/${post.id}`)}
                                    >Edit</button>
                                    <button
                                        style={{cursor: 'pointer', marginLeft: '8px', color: 'white', backgroundColor: 'red'}}
                                        onClick={() => navigate(`/delete/${post.id}`)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{marginTop: '16px'}}>
                    <button style={{cursor: 'pointer'}}onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                    <span style={{margin: '0 8px'}}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button style={{cursor: 'pointer'}}onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
}