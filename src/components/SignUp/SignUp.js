import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AgreeMent from './AgreeMent';
import SignInfo from './SignInfo';
import SignUpComplete from './SignUpComplete';

const SignUp = () => {
    return (
        <Routes>
            <Route index element={<AgreeMent/>}/>
            <Route path="/info" element={<SignInfo/>}/>
            <Route path="/complete" element={<SignUpComplete/>}/>
        </Routes>
    );
};

export default SignUp;