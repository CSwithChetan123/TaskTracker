import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./App.css";
import { SignUp } from "./SignUp";

function LogIn({ setIsLoggedIn, setCurrentView }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email, password);
        axios.post("http://localhost:5000/api/auth/login", { email, password })
            .then((response) => {
                localStorage.setItem("authToken", response.data.token);

                const nameToShow = response.data.user.fullName;
                if (nameToShow) {
                    localStorage.setItem("userFullName", nameToShow);
                } else {
                    localStorage.setItem("userFullName", "User");
                }

                setIsLoggedIn(true);
                setCurrentView("dashboard");
                alert("User logged in successfully");
            })
            .catch((error) => {
                console.error(error);
                alert("Error logging in user");
            });

    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <>
            {setCurrentView === "signup" ?
                <SignUp />
                :
                <div className="sign-up-container">
                    <h2>Login to your account</h2>
                    <p>Sign in to your TaskTracker account</p><br />
                    <form onSubmit={handleSubmit}>
                        <TextField id="outlined-basic" label="Email" variant="outlined" className="inputField" onChange={handleEmailChange} value={email} required /><br /><br />
                        <TextField id="outlined-basic" label="Password" variant="outlined" className="inputField" onChange={handlePasswordChange} value={password} required /><br /><br />
                        <Button variant="contained" type="submit">Login</Button>
                    </form><br /><br />
                    <p>Don't have an account? <Button sx={{ textDecoration: "underline", fontWeight: "bolder", fontSize: "14px" }} onClick={() => setCurrentView("signup")}>Sign Up here</Button></p>
                </div>
            }
        </>
    )
}

export { LogIn };