import { TaskCard } from './TaskCard';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


function TaskScreen() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('https://tasktracker-c2f6.onrender.com/api/tasks', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error(error);
                alert("Error fetching tasks");
            });
    }, []);

    const [addTask, setAddTask] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [title, setTitle] = useState("");
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const [description, setDescription] = useState("");
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const [dueDate, setDueDate] = useState(null);
    const handleDueDateChange = (newValue) => {
        setDueDate(newValue);
    };

    const [priority, setPriority] = useState("");
    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const [category, setCategory] = useState("");

    const categoryHandleChange = (event) => {
        setCategory(event.target.value);
    };

    const [completed, setComplete] = useState(false);

    let handleSubmitTask = () => {
        try {
            axios.post('https://tasktracker-c2f6.onrender.com/api/tasks', {
                title,
                description,
                dueDate,
                priority,
                category,
                completed

            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
            ).then((response) => {
                console.log(response.data);
                setTasks(preTasks => [...preTasks, response.data]);
                handleClose();

                setTitle("");
                setDescription("");
                setDueDate(null);
                setPriority("");
                setCategory("");
                setComplete(false);
            });
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <>

            <div className='task-screen'>
                <div className='task-screen-header'>
                    <h1>All Tasks</h1>
                    <React.Fragment>
                        <Button variant="contained" onClick={handleClickOpen}>
                            + Add New Task
                        </Button>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                Add New Task
                            </DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={(theme) => ({
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: theme.palette.grey[500],
                                })}
                            >
                                <CloseIcon />
                            </IconButton>
                            <DialogContent dividers>
                                <form onSubmit={(e) => { e.preventDefault(); handleSubmitTask(); }}>
                                    <TextField id="outlined-basic" label="Title" variant="outlined" className='inputField' value={title} onChange={handleTitleChange} required /><br /><br />
                                    <TextField id="outlined-basic" label="Description" variant="outlined" multiline rows={4} className='inputField' value={description} onChange={handleDescriptionChange} required /><br /><br />
                                    <LocalizationProvider dateAdapter={AdapterDayjs} className="inputField">
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker label="Due Date" value={dueDate} onChange={handleDueDateChange} slotProps={{ textField: { required: true } }} />
                                        </DemoContainer>
                                    </LocalizationProvider><br /><br />
                                    <div className="inputField">
                                        <InputLabel id="demo-simple-select-label" >Priority</InputLabel>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={priority}
                                                label="Priority"
                                                onChange={handlePriorityChange}
                                                required
                                            >
                                                <MenuItem value={"low"}>Low</MenuItem>
                                                <MenuItem value={"medium"}>Medium</MenuItem>
                                                <MenuItem value={"high"}>High</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div><br /><br />
                                    <div className='inputField'>
                                        <InputLabel id="demo-simple-select-label" >Category</InputLabel>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={category}
                                                label="Category"
                                                onChange={categoryHandleChange}
                                                required
                                            >
                                                <MenuItem value={"work"}>Work</MenuItem>
                                                <MenuItem value={"personal"}>Personal</MenuItem>
                                                <MenuItem value={"shopping"}>Shopping</MenuItem>
                                                <MenuItem value={"health"}>Health</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div><br /><br />
                                    <Button variant="contained" type='submit'>Add Task</Button>
                                </form>

                            </DialogContent>
                        </BootstrapDialog>
                    </React.Fragment>

                </div>
                <h3 className='task-count'>Total Task(s) : {tasks.length}</h3>
                <div className='Task-Information-Display'>
                    {tasks.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#60a5fa", fontStyle: "italic", fontWeight: "bold", fontSize: "1.5rem", marginTop: "2rem" }}>No Task(s) Found</p>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard key={task._id} task={task} setTasks={setTasks} />

                        ))
                    )}
                </div>

            </div >



        </>
    )
}
export { TaskScreen };