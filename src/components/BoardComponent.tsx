import React, { FC } from "react";
import { Cell } from "src/models/Cell";
import { Board } from "src/models/Board";
import CellComponent from "./CellComponent";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    stopTimer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
    board: Board,
    setBoard,
    stopTimer,
}) => {
    function click(cell: Cell) {
        let moveCell: Cell;

        if (!Board.closeRound)
            moveStack(Board.zerro, cell);
    }

    function moveStack(zerro: Cell, cell: Cell) {
        let moveCell: Cell;

        if (zerro.y == cell.y) {
            if (zerro.x > cell.x) {
                while (cell.x < zerro.x) {
                    moveCell = Board.getCell(zerro.x - 1, zerro.y);
                    Board.setCell(zerro.x, zerro.y, moveCell.id);
                    zerro.x = zerro.x - 1;
                }
                Board.setCell(cell.x, cell.y, 0);
                updateBoard();
            } else {
                while (cell.x > zerro.x) {
                    moveCell = Board.getCell(zerro.x + 1, zerro.y);
                    Board.setCell(zerro.x, zerro.y, moveCell.id);
                    zerro.x = zerro.x + 1;
                }
                Board.setCell(cell.x, cell.y, 0);
                updateBoard();
            }
        } else {
            if (zerro.x == cell.x) {
                if (zerro.y > cell.y) {
                    while (cell.y < zerro.y) {
                        moveCell = Board.getCell(zerro.x, zerro.y - 1);
                        Board.setCell(zerro.x, zerro.y, moveCell.id);
                        zerro.y = zerro.y - 1;
                    }
                    Board.setCell(cell.x, cell.y, 0);
                    updateBoard();
                } else {
                    while (cell.y > zerro.y) {
                        moveCell = Board.getCell(zerro.x, zerro.y + 1);
                        Board.setCell(zerro.x, zerro.y, moveCell.id);
                        zerro.y = zerro.y + 1;
                    }
                    Board.setCell(cell.x, cell.y, 0);
                    updateBoard();
                }
            }
        }
    }

    function updateBoard() {
        const newBoard = Board.getCopyBoard();
        setBoard(newBoard);
        newBoard.checkList();

        if (Board.arraysEqual(newBoard.gameList, newBoard.etalon)) {
            stopTimer();
            newBoard.closeRound = true;
        }

    }

    return (
        <div className="board">
            {Board.cells.map((row: Cell[], index: number) => (
                <React.Fragment key={index}>
                    {row.map((cell) => (
                        <CellComponent
                            key={cell.id}
                            cell={cell}
                            name={cell.id}
                            click={click}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
};

export default BoardComponent;
