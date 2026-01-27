import {
    Ref,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { Player } from "../models/Player";
import { formatTime } from "../helpers/helpers";
import { db } from "../firestoreDb";
import { child, get, ref as dbsRef, set, update } from "firebase/database";

export interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

export interface RefType {
    timerStop: () => void;
}

const Timer = (props: TimerProps, ref: Ref<RefType>) => {
    const { currentPlayer, restart } = props;
    const [gameTime, setGameTime] = useState(0);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    const timerStop = () => {
        stopTimer();
    };
    useImperativeHandle(ref, () => ({ timerStop }));

    useEffect(() => {
        startTimer();
    }, []);

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        const callback = incrementTimer;
        timer.current = setInterval(callback, 10);
    }

    async function stopTimer() {
        if (!currentPlayer.stopGame && currentPlayer && timer.current) {
            clearInterval(timer.current);

            currentPlayer.approaches++;
            if (currentPlayer.stopwatch == 0 || currentPlayer.stopwatch > gameTime) {
                currentPlayer.stopwatch = gameTime;
                currentPlayer.date = Date.now();
            }
            set(dbsRef(db, "players/" + currentPlayer.uid), {
                stopwatch: currentPlayer.stopwatch,
                approaches: currentPlayer.approaches | 0,
                date: currentPlayer.date,
                name: currentPlayer.name,
                country: currentPlayer.country,
            });

            if (
                !currentPlayer.inWinnersList &&
                currentPlayer.stopwatch <
                (currentPlayer.winners.length >= 10
                    ? currentPlayer.winners[currentPlayer.winners.length - 1].stopwatch
                    : 999999)
            ) {
                set(dbsRef(db, "top/" + currentPlayer.uid), {
                    stopwatch: currentPlayer.stopwatch,
                    approaches: currentPlayer.approaches | 0,
                    date: currentPlayer.date,
                    name: currentPlayer.name,
                    country: currentPlayer.country,
                });
            }
            if (currentPlayer.inWinnersList)
                update(dbsRef(db, "top/" + currentPlayer.uid), {
                    stopwatch: currentPlayer.stopwatch,
                    approaches: currentPlayer.approaches,
                    date: currentPlayer.date,
                    name: currentPlayer.name,
                    country: currentPlayer.country,
                });

            // await currentPlayer.getWinners();
        }
    }

    function incrementTimer() {
        setGameTime((prev) => prev + 1);
    }

    const handleRestart = () => {
        setGameTime(0);
        currentPlayer.stopGame = false;
        if (timer.current) startTimer();
        restart();
    };

    return (
        <div className="timer">
            <h2 className="timer__clock">{formatTime(gameTime)}</h2>
            <div className="buttons">
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleRestart}>
                    Restart game
                </button>
            </div>
        </div>
    );
};

export default forwardRef(Timer);
