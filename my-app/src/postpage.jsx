import React from 'react';
import { useParams } from 'react-router-dom';

// Sample posts data
const posts = [
  { id: 1, title: 'Post 1', description: 'This is the first post', imageUrl: '/images/post1.jpg' },
  { id: 2, title: 'Post 2', description: 'This is the second post', imageUrl: '/images/post2.jpg' },
];

const PostPage = () => {
  const { id } = useParams();
  const post = posts.find(post => post.id === parseInt(id));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.imageUrl} alt={post.title} style={{ width: '300px' }} />
      <p>{post.description}</p>
    </div>
  );
};

export default PostPage;
