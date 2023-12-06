import React, { FC } from "react";
import { Cell } from "src/models/Cell";


interface CellProps {
  cell: Cell;
  name: number;  
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, name, click}) => {
  return <div className="pcell">
    { cell.id != 0? 
    <div className="chip"
        onClick={() => click(cell)}
    >
      { name }
    </div>
    : '' }
  </div>;
};

export default CellComponent;
