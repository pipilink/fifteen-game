import { Cell } from "./Cell";

export class Board {
    cells: Cell[][] = [];
    etalon: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    gameList: number[] = this.etalon.slice();
    zerro: Cell;
    closeRound: boolean = true;


    public initCells() {
        let index = 1;
        //        this.gameList = this.shuffle(this.gameList);
        this.gameList = this.shuffleDrill(this.gameList);


        for (let i = 0; i < 4; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 4; j++) {
                if (index <= 16) {
                    row.push(new Cell(j, i, this.gameList[index - 1]));
                    if (this.gameList[index - 1] == 0) {
                        this.zerro = new Cell(j, i, 0)
                    }
                }
                index++;
            }
            this.cells.push(row);
        }
    }

    public getCell(x: number, y: number) {
        if (x >= 0 && x <= 3 && y >= 0 && y <= 3) return this.cells[y][x];
        return undefined;
    }

    public setCell(x: number, y: number, id: number) {
        this.cells[y][x].id = id;
    }

    public checkList() {
        let tmp: any = [];
        let index: number = 1;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                tmp.push(this.cells[i][j].id);
                if (this.cells[i][j].id == index && this.seqList(tmp))
                    this.cells[i][j].class = "green"
                else this.cells[i][j].class = "chip"
                index++
            }
        }
        this.gameList = tmp;
    }

    private seqList(list: []): boolean {
        return list.every((value, index) => value - 1 === index);
    }

    public arraysEqual(a: number[], b: number[]) {
        if (a === b) return true;
        if (a.length !== b.length) return false;
        return a.every((v, i) => v === b[i]);
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.zerro = this.zerro;
        newBoard.gameList = this.gameList;
        newBoard.closeRound = this.closeRound;
        return newBoard;
    }

    private shuffle(array: []) {
        let currentIndex: number = array.length,
            temporaryValue,
            randomIndex;

        this.closeRound = false;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    private shuffleDrill(array: number[]) {
        let temporaryValue: number,
            randomIndex: number,
            currentPos: number = 15,
            steps = [
                [1, 4], [2, 5, 0], [3, 6, 1], [7, 2],
                [0, 5, 8], [1, 6, 9, 4], [2, 7, 10, 5], [3, 11, 6],
                [4, 9, 12], [5, 10, 13, 8], [6, 11, 14, 9], [7, 15, 10],
                [8, 13], [9, 14, 12], [10, 15, 13], [11, 14]]

        this.closeRound = false;

        for (let i = 1; i <= 256; i++) {

            randomIndex = Math.floor(Math.random() * steps[currentPos]?.length + 1);
            if (randomIndex) {

                temporaryValue = array[currentPos];
                array[currentPos] = array[steps[currentPos][randomIndex - 1]];
                array[steps[currentPos][randomIndex - 1]] = temporaryValue;
                currentPos = steps[currentPos][randomIndex - 1];
            }
        }
        return array;
    }

}
