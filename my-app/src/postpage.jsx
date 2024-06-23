import React, { useState } from 'react';
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
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === '') return;
    
    const newComment = {
      id: comments.length + 1,
      text: commentText,
      date: new Date().toLocaleString()
    };

    setComments([...comments, newComment]);
    setCommentText('');
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.imageUrl} alt={post.title} style={{ width: '300px' }} />
      <p>{post.description}</p>

      <div className="comments-section-container"> {/* Add this container */}
        <div className="comments-section">
          <h2>Comments</h2>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea 
              value={commentText} 
              onChange={(e) => setCommentText(e.target.value)} 
              placeholder="Add a comment" 
              required
            />
            <button type="submit">Submit</button>
          </form>
          <ul className="comments-list">
            {comments.map(comment => (
              <li key={comment.id} className="comment-item">
                <p>{comment.text}</p>
                <span>{comment.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
