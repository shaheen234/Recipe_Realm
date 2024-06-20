import React from 'react';
import { Link } from 'react-router-dom';

// Sample posts data
const posts = [
  { id: 1, title: 'Post 1', description: 'This is the first post', imageUrl: '/images/post1.jpg' },
  { id: 2, title: 'Post 2', description: 'This is the second post', imageUrl: '/images/post2.jpg' },
];

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
