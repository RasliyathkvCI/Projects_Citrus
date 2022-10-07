import * as React from "react";
import "./Timer.css"
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import StopIcon from '@mui/icons-material/Stop';


export default function Timer({ gettimeValue }) {

    const [time, setTime] = useState({s: 0, m: 0, h: 0 });
    const [inter, setInter] = useState();
    const [status, setStatus] = useState(0);

    let newh,newm,news;
    const { s, m, h } = time;


    var updatedS = time.s, updatedM = time.m, updateH = time.h;

    const start = () => {
        run();
        setInter(setInterval(run, 1000));
        setStatus(1);

    }

    const run = () => {
        if (updatedM === 60) {
            updateH++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedS = 0;
            updatedM++;

        }
        updatedS++
        

        return setTime({s: updatedS, m: updatedM, h: updateH });
    }

    const stop = () => {
        clearInterval(inter);
        setStatus(2);
        const isthroughTimer = true;
        const timerStatus = {
            s: updatedS,
            m: updatedM,
            h: updateH

        };
        setTime(timerStatus);
        if(h >= 10 ){
             newh = h ;
        }
        else {
            newh = "0" + h
        }
        if(m >= 10 ){
             newm = m ;
        }
        else {
            newm = "0" + m
        }
        if(s >= 10 ){
             news = s ;
        }
        else {
            news = "0" + s
        }

        const timertime = (newh + ":" + newm + ":" + news );
        gettimeValue(timertime, isthroughTimer);
    }

    const reset =() =>{
        clearInterval(inter);
        setTime({s : 0 , m : 0, h : 0 })
        setStatus(0);
    }

    return (

        <div className="card_container">
            
            <Card  className="timercard">
            <h2 className="timer_head">Timer</h2>
                <CardContent>
                    <div>
                        <span className="span">

                            {h >= 10 ? h : "0" + h}
                        </span>
                        :
                        <span className="span" >

                            {m >= 10 ? m : "0" + m}

                        </span>
                        :
                        <span className="span">

                            {s >= 10 ? s : "0" + s}

                        </span>
                        
                    </div>

                    <br />

                    <div>
                        {status === 0 && status !== 2 &&
                            <div>
                                 <PlayCircleOutlineIcon variant="contained" color="success"sx={{ fontSize: 50 }} onClick={start}></PlayCircleOutlineIcon>
                            </div>
                        }
                        {status === 1 &&
                            <div>
                                <StopIcon variant="contained" color="error"sx={{ fontSize: 50 }} onClick={reset}></StopIcon>
                                <PauseOutlinedIcon variant="contained"color="secondary"sx={{ fontSize: 50 }}onClick={stop}></PauseOutlinedIcon>
                            </div>
                        }
                        {status === 2 &&
                          <div>
                             <StopIcon variant="contained" color="error" sx={{ fontSize: 50 }}onClick={reset}></StopIcon>
                             <RestartAltOutlinedIcon variant="contained" color="success" sx={{ fontSize: 50 }}onClick={start}></RestartAltOutlinedIcon>     
                          </div>
                        }
                    </div>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </div>
    )
}