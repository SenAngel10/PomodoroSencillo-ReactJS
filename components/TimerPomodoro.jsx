import { useState } from "react";

export default function TimerPomodoro({ timePomo, btnStart, btnReset, restTime, editCycles, showCycles }) {
    //ms paso a min
    let min = Math.floor(timePomo / 60);
    let seg = (timePomo % 60);
    const [input, setInput] = useState('');
    const [start, setStart] = useState(false);
    const [active, setActive] = useState(true);

    function handlerEvents(value) {
        if (value !== '') {
            setActive(false)
        } else {
            setActive(true);
        }
        setInput(value)

    }

    return (


        <div className="container-timer">
            <section>
                <div className="sesionesTxt">
                    Sessions : {showCycles !== 0 ? showCycles : '🎉 Done!'}
                    <br />
                    {restTime === 0 ? (<p style={{
                        margin: 10,
                        color: 'rgb(233, 152, 0)'
                    }}>FOCUS</p>) : (<p style={{
                        margin: 10,
                        color: 'rgb(1, 111, 73)'
                    }}>REST</p>)}
                </div>
                {
                    restTime === 0 ?
                        (<div className="timer-circle" style={
                            {
                                borderRadius: `${50}%`,
                                width: 400, height: 400,
                                background: 'rgb(233, 152, 0)',
                                color: 'white',
                            }}>
                            {min > 9 ? min : `0${min}`} : {seg > 9 ? seg : `0${seg}`}
                        </div>)
                        :
                        (<div className="timer-circle" style={
                            {
                                borderRadius: `${50}%`,
                                width: 400, height: 400,
                                color: 'rgb(1, 111, 73)',
                                background: 'rgb(112, 228, 183)'
                            }}>
                            {min > 9 ? min : `0${min}`} : {seg > 9 ? seg : `0${seg}`}
                        </div>)
                }

            </section>

            <section className="btn-section">
                {/* {min > 9 ? min : `0${min}`} : {seg > 9 ? seg : `0${seg}`} */}
                <input
                    type="number"
                    value={input}
                    placeholder="Nº"
                    onChange={(e) => {
                        handlerEvents(e.target.value);
                    }
                    }
                />

                <button className="btn-sesiones"
                    onClick={() => {
                        editCycles(input);
                        setInput('');
                        setActive(true);
                    }
                    }
                    disabled={active}
                >
                    Set
                </button>

                <button className="btn-reset"
                    onClick={() => {
                        btnReset();
                        setStart(false)
                    }
                    } >
                    Reset
                </button>
                <button className="btn-start"
                    onClick={() => {
                        btnStart();
                        setStart(!start)
                    }
                    }
                    disabled={start}>
                    Start
                </button>
            </section>
        </div >
    );
}