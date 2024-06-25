import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [owner, setOwner] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/get_recipe_detail/${id}/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const postData = await response.json();
        console.log(postData)
        setPost(postData.recipe);
        setOwner(postData.owner);
      } catch (error) {
        console.error('Error fetching post:', error);
        // Handle error, show a message, etc.
      }
    };

    fetchPost();
  }, [id]); // Fetch whenever the `id` parameter changes

  if (!post) {
    return <div>Loading...</div>; //Hello, You can render a loading indicator
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
      <img src={`http://127.0.0.1:8000${post.image}`} alt={post.title} style={{ width: '300px' }} />
      <p>{post.description}</p>
      <p>Time to Cook: {post.minutes_to_cook}</p>
      <p>Owner: {owner.name}</p>
      

      <div className="comments-section-container">
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
