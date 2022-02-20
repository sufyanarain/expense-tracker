import React, { Component, useContext, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthContext from '../components/context/AuthContext';
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import useLoader from '../components/customHooks/useLoader';

const Protected = ({  path, component }) => {
    const [loader, showLoader, hideLoader] = useLoader();
    const [getUser, setUser] = useState(false);
    const [protected1, setProtected] = useState('');
    const [pub, setPub] = useState('');
    useEffect(() => {
        showLoader()

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(true);
                setProtected(<Route path={path} component={component} />)
                hideLoader()
            } else {
                setUser(false);
                setPub(<Redirect to='/' />)
                hideLoader()
            }
        })
    }, []);


   return getUser ? protected1  : pub 
    




}



export default Protected