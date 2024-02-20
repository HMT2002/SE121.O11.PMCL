import React, { useContext } from 'react';

import { BrowserRouter, Routes, Route, Redirect, Navigate } from 'react-router-dom';

import DefaultPage from './DefaultPage/DefaultPage';

import { GoogleOAuthProvider } from '@react-oauth/google';
import SyllabusEditPage from './SyllabusEditPage';
import CourseDetail from './CourseDetail/CourseDetail';
import SyllabusDetail from './SyllabusDetail/SyllabusDetail';
import NewSyllabus from './NewSyllabus/NewSyllabus';
import LoginPage from './LoginPage/LogIn';
import RegisterPage from './RegisterPage/RegisterPage';
import AccountPage from './AccountPage/AccountPage';
import AuthenticationPage from './AuthenticationPage/AuthenticationPage';
import AssignmentPage from './AssignmentPage/AssignmentPage';
import CourseEdit from './CourseEdit/CourseEdit';
import AuthContext, { useAuth } from '../contexts/auth-context';
import Unauthorized from './Unauthorized/Unauthorized';
import NewCourse from './NewCourse/NewCourse';
import { RequireAuth } from '../components/RequireAuth/RequireAuth';
import { RequireRole } from '../components/RequireRole/RequireRole';
import SyllabusInputForm from '../components/SyllabusInputForm/SyllabusInputForm';
import SyllabusInputPage from '../components/SyllabusInputPage/SyllabusInputPage';
import SyllabusPreview from './SyllabusPreview/SyllabusPreview';
const AppRouter = () => {
  return (
    <GoogleOAuthProvider clientId="1031226840176-2hfbvd0am0ea3hcapmapeea1tc4ijn0n.apps.googleusercontent.com">
      <Routes>
        <Route
          path="/"
          exact
          element={
            <RequireAuth>
              <DefaultPage />
            </RequireAuth>
          }
        />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/signup" exact element={<RegisterPage />} />

        <Route
          path="/course/:id"
          exact
          element={
            <RequireAuth>
              <CourseDetail />
            </RequireAuth>
          }
        />
        {/* <Route path="/edit/:id" exact element={<SyllabusEditPage />} /> */}
        <Route
          path="/syllabus/:id"
          exact
          element={
            <RequireAuth>
              <SyllabusDetail />
            </RequireAuth>
          }
        />
        <Route
          path="/new"
          exact
          element={
            <RequireAuth>
              <NewSyllabus />
            </RequireAuth>
          }
        />
        <Route
          path="/account"
          exact
          element={
            <RequireAuth>
              <AccountPage />
            </RequireAuth>
          }
        />
        <Route
          path="/authentication"
          exact
          element={
            <RequireRole roles={['admin', 'chairman']}>
              <AuthenticationPage />
            </RequireRole>
          }
        />
        <Route
          path="/assignment"
          exact
          element={
            <RequireRole roles={['admin', 'chairman']}>
              <AssignmentPage />
            </RequireRole>
          }
        />
        <Route
          path="/courses"
          exact
          element={
            <RequireRole roles={['admin', 'chairman']}>
              <NewCourse />
            </RequireRole>
          }
        />
        <Route
          path="/edit/course/:id"
          exact
          element={
            <RequireRole roles={['admin', 'chairman', 'instructor']}>
              <CourseEdit />
            </RequireRole>
          }
        />
        <Route path="/syllabus-input/:courseId" exact element={<SyllabusInputPage />} />
        <Route path="/syllabus-preview/:id" exact element={<SyllabusPreview />} />

        <Route path="/401/unauthorized" exact element={<Unauthorized />} />
        <Route path="*" exact element={<Navigate to="/" replace />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default AppRouter;
