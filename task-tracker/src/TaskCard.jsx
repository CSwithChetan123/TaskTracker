import { useState, useEffect } from 'react';
import './App.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import axios from 'axios';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function TaskCard({ task, setTasks }) {
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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
        setCategory(task.category);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    let handleDeleteTask = (taskId) => {
        try {
            axios.delete(`https://tasktracker-c2f6.onrender.com/api/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            })
                .then((response) => {
                    console.log(response.data);
                    setTasks((preTask) => preTask.filter((task) => task._id !== taskId));
                });

        } catch (error) {
            console.error(error);
        }
    }


    let handleEditTast = (taskId) => {
        try {
            axios.patch(`https://tasktracker-c2f6.onrender.com/api/tasks/${taskId}`, {
                title,
                description,
                dueDate,
                priority,
                category
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }

            )
                .then((response) => {
                    console.log(response.data);
                    setTasks((preTask) => preTask.map((task) => task._id === taskId ? response.data : task));
                    handleClose();
                });

        } catch (error) {
            console.error(error);
        }
    }

    let handleToggleComplete = (taskId) => {
        try {
            axios.patch(`https://tasktracker-c2f6.onrender.com/api/tasks/${taskId}`, {
                completed: !task.completed
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }
            )
                .then((response) => {
                    console.log(response.data);
                    setTasks((preTask) => preTask.map((task) => task._id === taskId ? response.data : task));
                });

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div className="task-card">
                <Card>
                    <CardContent>
                        <div className='task-card-title-edit-icon-div'>
                            {task.completed ? <CheckBoxOutlinedIcon sx={{ color: 'green' }} onClick={() => handleToggleComplete(task._id)} /> : <CheckBoxOutlineBlankIcon sx={{ color: 'red' }} onClick={() => handleToggleComplete(task._id)} />}
                            <div className='title-description'>
                                <Typography variant="h5" component="div">
                                    {task.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {task.description}
                                </Typography>

                            </div>
                            <div className='task-card-icon-button'>
                                <React.Fragment>
                                    <IconButton onClick={handleClickOpen}>
                                        <EditIcon />
                                    </IconButton>
                                    <BootstrapDialog
                                        onClose={handleClose}
                                        aria-labelledby="customized-dialog-title"
                                        open={open}
                                    >
                                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                            Edit Task
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
                                            <form onSubmit={(e) => { e.preventDefault(); handleEditTast(task._id) }}>
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
                                                <Button variant="contained" type='submit'>Edit Task</Button>
                                            </form>
                                        </DialogContent>
                                    </BootstrapDialog>
                                </React.Fragment>
                                <IconButton>
                                    <DeleteIcon onClick={() => handleDeleteTask(task._id)} />
                                </IconButton>
                            </div>
                        </div>
                        <div className='Task-card-info'>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Due Date'};
                            </Typography>
                            <Button variant="contained">{task.priority}</Button>
                            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                {task.category}
                            </Typography>

                        </div>


                    </CardContent>
                </Card>
            </div>
        </>
    )

}

export { TaskCard };