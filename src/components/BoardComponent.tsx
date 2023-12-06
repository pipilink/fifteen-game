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

    moveCell = Board.getCell(cell.x - 1, cell.y);
    if (moveCell && moveCell.id == 0) {
      moveCell.id = cell.id;
      cell.id = 0;
      updateBoard();
    }
    moveCell = Board.getCell(cell.x + 1, cell.y);
    if (moveCell && moveCell.id == 0) {
      moveCell.id = cell.id;
      cell.id = 0;
      updateBoard();
    }
    moveCell = Board.getCell(cell.x, cell.y - 1);
    if (moveCell && moveCell.id == 0) {
      moveCell.id = cell.id;
      cell.id = 0;
      updateBoard();
    }
    moveCell = Board.getCell(cell.x, cell.y + 1);
    if (moveCell && moveCell.id == 0) {
      moveCell.id = cell.id;
      cell.id = 0;
      updateBoard();
    }
  }

  function updateBoard() {
    const newBoard = Board.getCopyBoard();
    setBoard(newBoard);
    if (JSON.stringify(newBoard.cells) == JSON.stringify(newBoard.cells0)) {
      stopTimer();
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
