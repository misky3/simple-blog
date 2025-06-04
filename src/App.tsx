// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// import { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from './hooks';
// import { fetchPosts, addPost } from './redux/postsSlice';

// function App() {
//   const dispatch = useAppDispatch();
//   const posts = useAppSelector((state) => state.posts.posts);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   useEffect(() => {
//     dispatch(fetchPosts());
//   }, [dispatch]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (title && content) {
//       dispatch(addPost({ title, content }));
//       setTitle('');
//       setContent('');
//     }
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>My Simple Blog</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <br />
//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <br />
//         <button type="submit">Add Post</button>
//       </form>
//       <h2>Posts</h2>
//       {posts.map((post) => (
//         <div key={post.id} style={{ borderBottom: '1px solid #ccc' }}>
//           <h3>{post.title}</h3>
//           <p>{post.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/login/login';
import Registration from './pages/registration/registration';
import Home from './pages/blog/paignationBlog/paignationBlog';
import Logout from './pages/logout/logout';
import CreateBlog from './pages/blog/createBlog/createBlog';
import UpdateBlog from './pages/blog/updateBlog/updateBlog';
import DeleteBlog from "./pages/blog/deleteBlog/deleteBlog";
import PostDetails from "./pages/blogDetails/blogDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App(){
  return(
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>

      <Route path="/login" element={<Login/>}/>

      <Route path="/registration" element={<Registration/>}/>

      <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>

      <Route path="/logout" element={<Logout/>}/>

      <Route path="/createBlog" element={<ProtectedRoute><CreateBlog/></ProtectedRoute>}/>

      <Route path="/delete/:id" element={<ProtectedRoute><DeleteBlog/></ProtectedRoute>}/>

      <Route path="/post/:id" element={<ProtectedRoute><PostDetails/></ProtectedRoute>}/>

      <Route path="/edit/:id" element={<ProtectedRoute><UpdateBlog/></ProtectedRoute>}/>
    </Routes>
  );
}

export default App;