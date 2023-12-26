import React from 'react';

import { Routes, Route } from 'react-router-dom';

import DefaultPage from './DefaultPage/DefaultPage';

import { GoogleOAuthProvider } from '@react-oauth/google';
import SyllabusEditPage from './SyllabusEditPage';
import CourseDetail from './CourseDetail/CourseDetail';
import SyllabusDetail from './SyllabusDetail/SyllabusDetail';
import NewSyllabus from './NewSyllabus/NewSyllabus';
import LoginPage from './LoginPage/LogIn';
import CourseForm from './NewSyllabus/CourseForm';
import RegisterPage from './RegisterPage/RegisterPage';

const AppRouter = () => {
  return (
    <GoogleOAuthProvider clientId="1031226840176-2hfbvd0am0ea3hcapmapeea1tc4ijn0n.apps.googleusercontent.com">
      <Routes>
        <Route path="/" exact element={<DefaultPage />} />
        <Route path="/default" exact element={<DefaultPage />} />
        <Route path="/course/:id" exact element={<CourseDetail />} />
        <Route path="/edit/:id" exact element={<SyllabusEditPage />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/syllabus/:id" exact element={<SyllabusDetail />} />
        <Route path="/new" exact element={<NewSyllabus />} />
        <Route path="/test" exact element={<CourseForm />} />
        <Route path="/create-new-account" exact element={<RegisterPage />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default AppRouter;
