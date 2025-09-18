import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AgreeMent from './AgreeMent';
import SignInfo from './SignInfo';

const SignUp = () => {
    return (
        <Routes>
            <Route index element={<AgreeMent/>}/>
            <Route path="/info" element={<SignInfo/>}/>
        </Routes>
    );
};

export default SignUp;