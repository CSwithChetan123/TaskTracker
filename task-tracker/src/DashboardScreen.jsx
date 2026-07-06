import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { TaskCard } from './TaskCard';

function DashboardScreen({ }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token === 'null' || token === undefined || token === '') {
            console.error("No token found");
            return;
        }

        axios.get('https://tasktracker-c2f6.onrender.com/api/tasks', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setTasks(response.data);
                alert("Tasks fetched successfully");
            })
            .catch((error) => {
                console.error(error);
                alert("Error fetching tasks");
            });
    }, []);

    return (
        <>
            <h2>DashBoard</h2>
            <p>Welcome Back, here is your Productivity Overview.</p>
            <div className='info-card-container'>
                <div className='Info-Card'>
                    <Card>
                        <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Total Task
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {tasks.length}
                            </Typography>

                        </CardContent>
                    </Card>

                </div>

                <div className='Info-Card'>
                    <Card>
                        <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Completed
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {tasks.filter((task) => task.completed).length}
                            </Typography>

                        </CardContent>
                    </Card>

                </div>
                <div className='Info-Card'>
                    <Card>
                        <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Overdue
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {tasks.filter((task) => task.dueDate < new Date() && !task.completed).length}
                            </Typography>

                        </CardContent>
                    </Card>

                </div>
                <div className='Info-Card'>
                    <Card>
                        <CardContent>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Archived
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {tasks.filter((task) => task.completed).length}
                            </Typography>

                        </CardContent>
                    </Card>

                </div>

            </div>

            <div className='Task-Information-Display'>
                {tasks.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#60a5fa", fontStyle: "italic", fontWeight: "bold", fontSize: "1.5rem", marginTop: "2rem" }}>No Task(s) Found</p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard key={task._id} task={task} setTasks={setTasks} />

                    ))
                )}
            </div>


        </>
    )

}
export { DashboardScreen };