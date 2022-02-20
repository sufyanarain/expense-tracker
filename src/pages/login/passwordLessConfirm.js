import React, { useState, useEffect, useRef } from 'react'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import useLoader from '../../components/customHooks/useLoader';


const PasswordLessConfirm = () => {
    const [loader, showLoader, hideLoader] = useLoader();
    const history = useHistory();
    const auth = getAuth();
    const db = getFirestore();

    const setUserDataToFirestore = async (user) => { // set users data to firestore
        const db = getFirestore();

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            const userRef = await addDoc(collection(db, "users_profile"), {
                name: user.displayName,
                email: user.email,
                categories: [],
                expenses: [],
                createdAt: serverTimestamp(),
            })
            console.log("user_profile added to firestore")

            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                userRef: doc(db, "users_profile", userRef.id),
                uid: user.uid,
                createdAt: serverTimestamp(),
            });
            console.log("user added to firestore");
        } else {
            history.push('/dashboard');
            console.log("user already exists");
        }
        history.push('/dashboard');
        hideLoader()
    }


    let email = window.localStorage.getItem('emailForSignIn');
    useEffect(() => {
        showLoader()
        if (isSignInWithEmailLink(auth, window.location.href)) { // check if user is signed in with email link
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
                hideLoader()
            }
            signInWithEmailLink(auth, email, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');   // remove email from local storage

                    setUserDataToFirestore(result.user); // set user data to firestore
                    console.log('data sent to firestore function');
                    

                })
                .catch((error) => {
                    // setIsAuthenticated(true)
                    alert(error.message)
                    hideLoader()
                });
        }
        return () => {
            // cleanup
        }
    }, []);

    return (
        <div className='login-main-div'>
            {loader}
           {!email && <div className='login-right-sec'>
                <p className='login-heading'>Wrong Email ! Please Input Correct Email !</p>
                <button className='passwordless-error-btn' onClick={() => { window.location.reload(); }}>Input again</button>
            </div>}
            



        </div>
    )
}

export default PasswordLessConfirm