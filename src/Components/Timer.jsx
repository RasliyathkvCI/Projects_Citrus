import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";


export default function Timer({ gettimeValue }) {

    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [inter, setInter] = useState();
    const [status, setStatus] = useState(0);


    const { ms, s, m, h } = time;


    var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updateH = time.h;

    const start = () => {
        run();
        setInter(setInterval(run, 10));
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
        if (updatedMs === 100) {
            updatedS++;
            updatedMs = 0;
        }
        updatedMs++

        return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updateH });
    }


    const stop = () => {
        clearInterval(inter);
        setStatus(0);
        const isthroughTimer = true;
        const timerStatus = {
            ms: updatedMs,
            s: updatedS,
            m: updatedM,
            h: updateH

        };
        setTime(timerStatus);
        const timertime = (time.h + ":" + time.m + ":" + time.s + ":" + time.ms)
        gettimeValue(timertime, isthroughTimer);
        setTime({ ms: 0, s: 0, m: 0, h: 0 });

    }


    // const reset = () => {
    //     clearInterval(inter);
    //     setTime({ ms: 0, s: 0, m: 0, h: 0 });
    //     setStatus(0);

    // }


    return (

        <div>
            <h3 >Timer</h3>
            <Card sx={{ minWidth: 600 }}>
                <CardContent>
                    <div>

                        <span className="span">

                            {h >= 10 ? h : "0" + h}
                        </span>
                        :
                        <span className="span">

                            {m >= 10 ? m : "0" + m}

                        </span>
                        :
                        <span className="span">

                            {s >= 10 ? s : "0" + s}

                        </span>
                        :
                        <span className="span">

                            {ms >= 10 ? ms : "0" + ms}

                        </span>

                    </div>
                    <br />

                    <div>
                        {/* {status === 0 && <button class="btn_start" onClick={start}>start</button>} */}
                        {status === 0 && <Button variant="contained" color="success" onClick={start}>START</Button>}
                        {status === 1 &&
                            <div>
                                {/* <Button variant="contained" color="secondary" onClick={reset}>RESET</Button> */}

                                <Button variant="contained"
                                    color="error"
                                    onClick={stop}
                                >PAUSE AND ADD</Button>

                            </div>


                        }


                    </div>


                </CardContent>
                <CardActions></CardActions>
            </Card>





        </div>

    )
}