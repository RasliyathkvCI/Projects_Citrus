import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch } from 'react-redux';
import { saveTodo } from '../features/todoSlice';


const InputTodo = () => {

    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    

    const addTask = () => {
        console.log(`adding ${input}`);

        dispatch(saveTodo({
           
                task: input,
                completed: false,
                timetaken: 0,
                deletedstatus: false,
                updatedon: " ",
                id:Date.now(),

            }
           ))
          
    }
    return (
        <div>
            <Card >
                <CardContent>

                    <TextField
                       
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        placeholder='Enter your task'
                        value={input}
                        onChange={e => setInput(e.target.value)} />
                    <Button
                        sx={{ml: 5 }}
                        variant="contained"
                        onClick={addTask}>Add</Button>
                </CardContent>
            </Card>

        </div>
    )
}

export default InputTodo