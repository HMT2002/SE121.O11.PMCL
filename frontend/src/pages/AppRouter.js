import React, { useContext } from 'react';

import { BrowserRouter, Routes, Route, Redirect, Navigate } from 'react-router-dom';

import DefaultPage from './DefaultPage/DefaultPage';

import { GoogleOAuthProvider } from '@react-oauth/google';
import SyllabusEditPage from './SyllabusEditPage';
import CourseDetail from './CourseDetail/CourseDetail';
import SyllabusDetail from './SyllabusDetail/SyllabusDetail';
import NewSyllabus from './NewSyllabus/NewSyllabus';
import LoginPage from './LoginPage/LogIn';
import CourseForm from './NewSyllabus/CourseForm';
import RegisterPage from './RegisterPage/RegisterPage';
import AccountPage from './AccountPage/AccountPage';
import AuthenticationPage from './AuthenticationPage/AuthenticationPage';
import AssignmentPage from './AssignmentPage/AssignmentPage';
import CourseEdit from './CourseEdit/CourseEdit';
import AuthContext from '../contexts/auth-context';
import Unauthorized from './Unauthorized/Unauthorized';
const AppRouter = () => {
  const authCtx = useContext(AuthContext);
  return (
    <GoogleOAuthProvider clientId="1031226840176-2hfbvd0am0ea3hcapmapeea1tc4ijn0n.apps.googleusercontent.com">
      <Routes>
        <Route path="/" exact element={authCtx.isAuthorized ? <DefaultPage /> : <Navigate to="/login" />} />
        <Route path="/login" exact element={authCtx.isAuthorized ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" exact element={authCtx.isAuthorized ? <Navigate to="/" /> : <RegisterPage />} />

        <Route path="/course/:id" exact element={authCtx.isAuthorized ? <CourseDetail /> : <LoginPage />} />
        {/* <Route path="/edit/:id" exact element={<SyllabusEditPage />} /> */}
        <Route path="/syllabus/:id" exact element={authCtx.isAuthorized ? <SyllabusDetail /> : <LoginPage />} />
        <Route path="/new" exact element={authCtx.isAuthorized ? <NewSyllabus /> : <Navigate to="/login" />} />
        <Route path="/test" exact element={<CourseForm />} />
        <Route path="/account" exact element={authCtx.isAuthorized ? <AccountPage /> : <Navigate to="/login" />} />
        <Route
          path="/authentication"
          exact
          element={
            authCtx.isAuthorized && authCtx.role === 'admin' ? (
              <AuthenticationPage />
            ) : (
              <Navigate to="/401/unauthorized" />
            )
          }
        />
        <Route
          path="/assignment"
          exact
          element={
            authCtx.isAuthorized && (authCtx.role === 'admin' || authCtx.role === 'chairman') ? (
              <AssignmentPage />
            ) : (
              <Navigate to="/401/unauthorized" />
            )
          }
        />
        <Route
          path="/edit/course/:id"
          exact
          element={
            authCtx.isAuthorized && (authCtx.role === 'admin' || authCtx.role === 'instructor') ? (
              <CourseEdit />
            ) : (
              <Navigate to="/401/unauthorized" />
            )
          }
        />
        <Route path="/401/unauthorized" exact element={<Unauthorized />} />

        <Route path="*" exact element={<DefaultPage />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default AppRouter;
