import { FC } from "react";
import { Player, PlayerRec } from "../models/Player";
import { formatTime, formatDate } from "../helpers/helpers";

interface WinnersProps {
  winList: PlayerRec | null;
  index: number;
  player: Player;
}

const WinnersComponent: FC<WinnersProps> = ({ winList, index, player }) => {
  return (
    <>
      <div className={winList.uid == player.uid ? "row-player" : "row"}>
        <div className="trank">{index == 0 ? "..." : index}</div>
        <div className="tcell">
          {winList.stopwatch > 0 ? formatTime(winList.stopwatch) : ""}
        </div>
        <div className="tcell d-none d-sm-block">
          {winList.date ? formatDate(winList.date) : ""}
        </div>
        <div className="tcell">{winList.name}</div>
        <div className="tcell-country  d-none d-sm-block">
          {winList.country.label}
        </div>
        <div className="tcell d-block d-sm-none">{winList.country.value}</div>
        <div className="trank">{winList.approaches}</div>
      </div>
    </>
  );
};

export default WinnersComponent;
