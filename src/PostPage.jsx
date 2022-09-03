import './App.css';
import React from 'react';
import NewPostHeader from './NewPostHeader';
import PostTypeSelector from './PostTypeSelector';
import Header  from './Header';

function PostPage(){
  return (
    <div className="PostPage">
      <Header />
      <NewPostHeader />
      <PostTypeSelector />
    </div>
  );
}

export default PostPage;
