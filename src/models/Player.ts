import {
    Auth,
    getAuth,
    signInAnonymously,
    onAuthStateChanged,
} from "firebase/auth";
import { db } from "../firestoreDb";
import { ref, onValue, get, child } from "firebase/database";

export interface PlayerRec {
    uid: string;
    name: string;
    stopwatch: number;
    approaches: number;
    country: any;
    date: number;
    inWinnersList: boolean;
}

export class Player {
    uid: string;
    name: string;
    stopwatch: number;
    approaches: number;
    country: {};
    date: number;
    stopGame: boolean;
    inWinnersList: boolean;
    winners: PlayerRec[];

    private authorize(): any {
        const auth: Auth = getAuth();

        signInAnonymously(auth)
            .then((userAnonimouse) => { })
            .catch((error) => {
                const errorCode: any = error.code;
                const errorMessage: any = error.message;
            });

        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.uid = user.uid;
                const starCountRef = ref(db, "players/" + this.uid);
                onValue(starCountRef, (snapshot) => {
                    if (snapshot.exists && snapshot.val()) {
                        const data: Player = snapshot.val();
                        data.approaches ? (this.approaches = data.approaches) : null;
                        data.date ? (this.date = data.date) : null;
                        data.name ? (this.name = data.name) : null;
                        data.country ? (this.country = data.country) : null;
                        data.stopwatch ? (this.stopwatch = data.stopwatch) : null;
                    }
                });
            }
        });
    }
    constructor() {
        this.winners = [];
        this.stopGame = false;
        this.inWinnersList = false;
        this.stopwatch = 0;
        this.approaches = 0;
        this.name = "Guest";
        this.country = "";
        this.authorize();
    }
}
