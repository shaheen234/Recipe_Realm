import React from 'react';
import { useParams } from 'react-router-dom';

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
