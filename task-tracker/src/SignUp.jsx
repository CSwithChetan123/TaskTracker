import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./App.css";
import { LogIn } from "./LogIn";



function SignUp({ changeView, setIsLoggedIn }) {
    const [currentView, setCurrentView] = useState("dashboard");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(fullName, email, password);
        axios.post("http://localhost:5000/api/auth/register", { fullName, email, password })
            .then((response) => {
                console.log(response.data);
                if (response.data && response.data.token) {
                    localStorage.setItem("authToken", response.data.token);
                }
                localStorage.setItem("userFullName", response.data.user.fullName);
                setIsLoggedIn(true);
                changeView("dashboard");

            })
            .catch((error) => {
                console.error(error);
                alert("Error registering user");
            });

    };

    return (
        <>
            {
                currentView === "login" ?
                    <LogIn />
                    :
                    <div className="sign-up-container">
                        <h2>Create your account</h2>
                        <form onSubmit={handleSubmit}>
                            <TextField id="outlined-basic" label="Full Name" variant="outlined" value={fullName} onChange={handleFullNameChange} className="inputField" required /><br /><br />
                            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={handleEmailChange} className="inputField" required /><br /><br />
                            <TextField id="outlined-basic" label="Password" variant="outlined" value={password} onChange={handlePasswordChange} className="inputField" required /><br /><br />
                            <Button variant="contained" type="submit">Sign Up</Button>
                        </form><br /><br />
                        <p>Already have an account? <Button sx={{ textDecoration: "underline", fontWeight: "bolder", fontSize: "14px" }} onClick={() => setCurrentView("login")}>Login here</Button></p>
                    </div>
            }
        </>

    );
}

export { SignUp };


