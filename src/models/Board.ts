import { Cell } from "./Cell";

export class Board {
    cells: Cell[][] = [];
    etalon: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    gameList: [] = this.etalon.slice();
    zerro: Cell;

    public initCells() {
        let index = 1;

        this.gameList = this.shuffle(this.gameList);

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

    public arraysEqual(a: [], b: []) {
        if (a === b) return true;
        if (a.length !== b.length) return false;
        return a.every((v, i) => v === b[i]);
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.zerro = this.zerro;
        newBoard.gameList = this.gameList;
        return newBoard;
    }

    private shuffle(array: []) {
        let currentIndex: number = array.length,
            temporaryValue,
            randomIndex;

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
}
