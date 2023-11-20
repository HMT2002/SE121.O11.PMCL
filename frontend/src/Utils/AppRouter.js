import React from "react";

import SignInPage from "../UIComponents/Pages/SignInPage";
import SignUpPage from "../UIComponents/Pages/SignUpPage";
import HomePage from "../UIComponents/Pages/HomePage";

import { Routes, Route } from "react-router-dom";

const AppRouter = (props) => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
        </Routes>
    );
}

export default AppRouter;