import { FC, useEffect, useState } from "react";
import { db } from "../firestoreDb";
import { ref, onValue, get, child } from "firebase/database";

const StatsComponent: FC = () => {
    const [stats, setStats] = useState(null);

    const getStats = async () => {
        const statsRef = await ref(db, "stats/");

        onValue(statsRef, (snapshot) => {
            setStats(snapshot.val());
        });
    };

    useEffect(() => {
        getStats();
    }, []);

    return (
        <>
            <div className="row">
                <div className="trank"></div>
                <div className="tcell d-none d-sm-block"></div>
                <div className="tcell">players:</div>
                <div className="tcell-bold">{stats ? stats.players : ""}</div>

                <div className="tcell-country d-none d-sm-block">games:</div>
                <div className="tcell d-block d-sm-none">games:</div>
                <div className="tcell-bold d-none d-sm-block">
                    {stats ? stats.games : ""}
                </div>
                <div className="tcell-bold-sm d-block d-sm-none">
                    {stats ? stats.games : ""}
                </div>
            </div>
        </>
    );
};

export default StatsComponent;
