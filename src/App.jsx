import { useEffect, useRef, useState } from "react";
import TimerPomodoro from "../components/TimerPomodoro";
import './App.css';

let disminuidor;
export default function App() {
    //ms
    const pomodoroTime = 60 * 25;
    const restTime = 60 * 5;
    const restLargeTime = 60 * 15;
    const [tiempo, setTiempo] = useState(pomodoroTime);
    const [timeState, setTimeState] = useState(0);
    const [ciclos, setCiclos] = useState(1);// una sesion por default
    const refCicles = useRef(1);//<- aprender mas de esto,lo que hace es que no renderiza pero se tiene que actualizar igual que setstate

    const [active, setActive] = useState(false);
    //personalizados

    function startTimer() {
        if (!active) {
            setActive(true);
        }

    }

    function setCiclosedt(value) {
        setCiclos(value);
        refCicles.current = value;

    }

    function resetTimer() {
        clearTimeout(disminuidor);
        setActive(false);
        setTiempo(pomodoroTime);
        setCiclos(1);
        refCicles.current = 1
        setTimeState(0);
    }

    function changeMode() { // 0 desde el primer cambio
        if (timeState !== 0) {//entonces no es diferente de 0
            if (refCicles.current === 0) { // indica que ciclo llego a 0, entonces terminamos
                setActive(false);
            } else {
                setTiempo(pomodoroTime);
                setTimeState(0); // 0    
            }

        } else { // entramos al rest
            if (refCicles.current === 1) {//si ciclos es 1 entonces entramos al restLarge
                setTiempo(restLargeTime)
                setTimeState(1); //1
            } else {
                setTiempo(restTime)
                setTimeState(1); //1 
            }
            setCiclos(c => c - 1);
            refCicles.current = refCicles.current - 1;
        }
    }
    //renderiza mientras que tiempo al dependencia este activa
    useEffect(() => {
        if (active) {
            disminuidor = setTimeout(() => {
                tiempo > 0 ? setTiempo(t => t - 1) : changeMode()
            }
                , 1000);
        }
    }, [tiempo, active]);
    return (
        <div className="grid-Container">
            <TimerPomodoro
                timePomo={tiempo}
                btnReset={resetTimer}
                btnStart={startTimer}
                restTime={timeState}
                editCycles={setCiclosedt}
                showCycles={ciclos}
            >

            </TimerPomodoro>


        </div >
    );
}