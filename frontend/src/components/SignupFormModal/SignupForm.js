import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import './SignupForm.css';
import {createUser} from "../../store/session"


function SignupForm() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);

    const history = useHistory()
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (password === confirmPassword) {
    //         setErrors([]);
    //         return dispatch(sessionActions.signup({ email, username, password }))
    //             .catch(res => {
    //                 if (res.data && res.data.errors) setErrors(res.data.errors);
    //             });
    //     }
    //     return setErrors(['Confirm Password field must be the same as the Password field']);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = [];
        console.log("submit",image)
        return dispatch(createUser({ username, email, password, image }))
            .then(() => {
                setUsername("");
                setEmail("");
                setPassword("");
                setImage(null);
                history.push("/")
            })
            .catch((res) => {
                if (res.data && res.data.errors) {
                    newErrors = res.data.errors;
                    setErrors(newErrors);
                }
            });

    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    return (
        <form className="pure-form-stacked login" onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Email
        <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Username
        <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>
            <label>
                <input type="file" onChange={updateFile} />
            </label>
            <label>
                Password
        <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Confirm Password
        <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupForm;
