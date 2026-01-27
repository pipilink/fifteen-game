export class Cell {
    public x: number;
    public y: number;
    id: number;
    class: string;

    constructor(
        x: number,
        y: number,
        id: number
    ) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.class = "chip";
    }
}
