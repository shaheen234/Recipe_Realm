import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';  // Import the CSS file

// Sample posts data
const posts = [
  { id: 1, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 2, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 3, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 4, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 5, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 6, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 7, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' },
  { id: 8, title: 'Chili', description: 'This is the first post', imageUrl: '/chili.jpg' }
];

const HomePage = () => {
  return (
    <div className="home-banner">
      <h1>What recipe you want?</h1>
      <div className='par-coursel'>
        <div className='coursel'>
          <div class="bubble-cuisines" role="button" aria-label="American">
            <img alt="" src="https://x.yummlystatic.com/web/bubble/cuisine/american.png" class="bubble-image"/>
            <span class="text micro-caps font-bold bubble-text">American</span>
          </div>
          <div class="bubble-cuisines" role="button" aria-label="American">
            <img alt="" src="https://x.yummlystatic.com/web/bubble/cuisine/american.png" class="bubble-image"/>
            <span class="text micro-caps font-bold bubble-text">American</span>
          </div>
          <div class="bubble-cuisines" role="button" aria-label="American">
            <img alt="" src="https://x.yummlystatic.com/web/bubble/cuisine/american.png" class="bubble-image"/>
            <span class="text micro-caps font-bold bubble-text">American</span>
          </div>
        </div>
      </div>      
      <ul className="posts-grid">
        {posts.map(post => (
          <li key={post.id} className="post-item">
            <Link to={`/post/${post.id}`}>
              <img src={post.imageUrl} alt={post.title} className="post-image"/>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-desc">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;

