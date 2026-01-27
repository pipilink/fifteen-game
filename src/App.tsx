import { useEffect, useMemo, useRef, useState } from "react";
import countryList from "react-select-country-list";
import { db } from "./firestoreDb";
import {
    child,
    get,
    onValue,
    ref as dbsRef,
    set,
    update,
    remove,
} from "firebase/database";

import "./App.scss";
import BoardComponent from "./components/BoardComponent";
import TimerComponent, { RefType } from "./components/TimerComponent";
import PlayerComponent from "./components/PlayerComponent";
import StatsComponent from "./components/StatsComponent";
import WinnersComponent from "./components/WinnersComponent";

import { Board } from "./models/Board";
import { Player, PlayerRec } from "./models/Player";

export const App = () => {
    const [board, setBoard] = useState<Board>(new Board());
    const [winners, setWinners] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(
        new Player()
    );
    const childRef = useRef<RefType>(null);
    const options: any = useMemo(() => countryList().getData(), []);

    const getTop = async () => {
        const topRef = await dbsRef(db, "top/");

        onValue(topRef, (snapshot) => {
            if (snapshot.exists) {
                const res = snapshot.val();
                const list: PlayerRec[] = Object.keys(res).map((key) => ({
                    uid: key,
                    name: res[key].name,
                    stopwatch: res[key].stopwatch,
                    approaches: res[key].approaches,
                    country: res[key].country,
                    date: res[key].date,
                    inWinnersList: true,
                }));

                currentPlayer.winners = [];
                list.forEach((item: PlayerRec) => {
                    if (item.uid == currentPlayer.uid) currentPlayer.inWinnersList = true;
                    currentPlayer.winners.push(item);
                });
                currentPlayer.winners.sort((a, b) => a.stopwatch - b.stopwatch);

                setWinners(currentPlayer.winners);

                //... и взять первые 10, а остальные удалить из top/
                if (currentPlayer.winners.length > 10) {
                    currentPlayer.winners
                        .filter(
                            (value) => value.stopwatch > currentPlayer.winners[9].stopwatch
                        )
                        .forEach((data) => {
                            if (data) remove(dbsRef(db, "top/" + data.uid)).then(() => { });
                        });
                    currentPlayer.winners = currentPlayer.winners.slice(0, 10);
                }
                setCurrentPlayer(currentPlayer);
            }
        });
    };

    useEffect(() => {
        restart();
        async function datesInit() {
            await getTop();
            await getPlayers();
        }
        setTimeout(() => datesInit(), 500);
    }, []);

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        setBoard(newBoard);
    }

    async function getPlayers() {
        const player: Player = new Player();
        setCurrentPlayer(player);
    }

    async function updateStats() {
        const statsRef = dbsRef(db);

        await get(child(statsRef, "stats")).then((snapshot) => {
            if (snapshot.exists) {
                const res = snapshot.val();
                update(dbsRef(db, "stats/"), {
                    games: res.games + 1,
                    limit:
                        currentPlayer.winners.length == 10
                            ? currentPlayer.winners[currentPlayer.winners.length - 1]
                                .stopwatch
                            : 999999,
                    players:
                        currentPlayer.approaches == 1 ? res.players + 1 : res.players,
                });
            }
        });
    }

    function stopTimer(): void {
        if (childRef.current) {
            childRef.current.timerStop();

            if (!currentPlayer.stopGame && currentPlayer) {
                updateStats();
                currentPlayer.stopGame = true;
            }
        }
    }

    return (
        <>
            <div>
                <nav className="navbar bg-primary">
                    <div className="tittle">
                        <a
                            className="navbar-brand tittle"
                            target="_blank"
                            href="https://en.wikipedia.org/wiki/15_Puzzle">
                            World Cup on tag game
                        </a>
                    </div>
                    {currentPlayer ? (
                        <PlayerComponent
                            key={currentPlayer.uid}
                            player={currentPlayer}
                            options={options}
                        />
                    ) : (
                        ""
                    )}
                </nav>
            </div>

            <div className="timer">
                <TimerComponent
                    restart={restart}
                    currentPlayer={currentPlayer}
                    ref={childRef}
                />
            </div>

            <div className="app">
                <BoardComponent
                    board={board}
                    setBoard={setBoard}
                    stopTimer={stopTimer}
                />
            </div>
            <div className="winnrec"></div>
            <div>
                <h2 className="winnlist">Top Players</h2>
                <div className="winnrec">
                    <div className="table">
                        <div className="row">
                            <div className="thrank">Rank</div>
                            <div className="thcell">Result</div>
                            <div className="thcell d-none d-sm-block">Date</div>
                            <div className="thcell">Player</div>
                            <div className="thcell-country  d-none d-sm-block">Country</div>
                            <div className="thcell d-block d-sm-none">Country</div>

                            <div className="thrank">Try</div>
                        </div>
                        {currentPlayer
                            ? currentPlayer.winners.map(
                                (winList: PlayerRec, index: number) => (
                                    <WinnersComponent
                                        key={winList.uid}
                                        winList={winList}
                                        index={index + 1}
                                        player={currentPlayer}
                                    />
                                )
                            )
                            : ""}
                        {currentPlayer.winners.length >= 0 &&
                            !currentPlayer.inWinnersList ? (
                            <WinnersComponent
                                key={currentPlayer.uid}
                                winList={currentPlayer}
                                index={0}
                                player={currentPlayer}
                            />
                        ) : (
                            ""
                        )}
                        <StatsComponent />
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
