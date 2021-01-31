import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import './SignupForm.css';
import { createUser } from "../../store/session"


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
        <>
        <div className="signup-container">
            <h2 className="signup-title">Sign Up</h2>
            <form className="signup pure-form-stacked" onSubmit={handleSubmit}>
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
                <label >
                    <input className="file"type="file" onChange={updateFile} />
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
                <button className="signup-button" type="submit">Sign Up</button>
            </form>
        <ul className="errorList-signup">
                    {errors.map((error, idx) =><li className="errors-signup" key={idx}>{error}</li>)}

                </ul>
        </div>
                </>
    );
}

export default SignupForm;
