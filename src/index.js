import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter,  Routes, Route} from "react-router-dom";
import Login from './Login'
import Signup from './Signup'
import PostPage from './PostPage';
import FindQuestions from './FindQuestions';
import Plans from './Plans';
import Themes from './Themes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="post" element={<PostPage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="find_question" element={<FindQuestions />} />
        <Route path="plans" element={<Plans />} />
        <Route path="themes" element={<Themes />} />
      </Routes>
      </BrowserRouter>
    </div>
);