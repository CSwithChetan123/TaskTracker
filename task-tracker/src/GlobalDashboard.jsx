import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';

import { TaskCard } from './TaskCard';
import { TaskScreen } from './TaskScreen';
import { DashboardScreen } from './DashboardScreen';
import { SignUp } from './SignUp';
import { LogIn } from './LogIn';


function GlobalDashboard({ user }) {
    const [currentView, setCurrentView] = useState("dashboard");
    const userFullName = localStorage.getItem("userFullName") || "User";


    return (
        <>
            <div className="Global-Dashboard">

                <div className="sidebar">
                    <h1>Task Tracker</h1>
                    <div className='Profile-name'>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {userFullName}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Welcome Back
                                </Typography>
                            </CardContent>
                        </Card>

                    </div><br />

                    <div className='Major-Navigation-btn'>
                        <Button variant="outlined" onClick={() => setCurrentView("dashboard")}>Dashboard</Button>
                        <Button variant="outlined" onClick={() => setCurrentView("taskscreen")}>Task</Button>
                    </div>

                    <div className='Quick-Filter'>
                        <p>Quick Filter</p>
                        <div className='Quick-Filter-Options'>
                            <Button variant="outlined">All Task</Button>
                            <Button variant="outlined">Today</Button>
                            <Button variant="outlined">Upcoming</Button>
                            <Button variant="outlined">Completed</Button>


                        </div>

                    </div>

                </div>
                <div className="Dynamic-Main-Content">
                    {currentView === "dashboard" ?
                        <DashboardScreen />
                        :
                        null
                    }

                    {currentView === "taskscreen" ?
                        <TaskScreen />
                        :
                        null
                    }



                </div>

            </div>
        </>
    )
}
export { GlobalDashboard };