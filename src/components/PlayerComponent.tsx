import { FC, useState } from "react";
import { PlayerRec } from "../models/Player";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
import { db } from "../firestoreDb";
import { ref as dbsRef, update } from "firebase/database";
import React from "react";

interface PlayerProps {
  player: PlayerRec | null;
  options?: OptionsOrGroups<string, GroupBase<string>>;
}

const PlayerComponent: FC<PlayerProps> = ({ player, options }) => {
  const [countryValue, setValue] = useState();
  const playerRef: any = React.useRef();

  const onSubmit = (e: any) => {
    e.preventDefault();

    const playerVal: string = playerRef.current.value;

    if (
      (countryValue && countryValue != player.country) ||
      (playerVal && playerVal != player.name)
    ) {
      countryValue ? (player.country = countryValue) : null;
      playerVal ? (player.name = playerVal) : null;

      update(dbsRef(db, "players/" + player.uid), {
        name: player.name,
        country: player.country,
      });
      if (player.inWinnersList) {
        update(dbsRef(db, "top/" + player.uid), {
          name: player.name,
          country: player.country,
          date: player.date,
          stopwatch: player.stopwatch,
          approaches: player.approaches,
        });
      }
      // IF currentPlayer in top/ { GetWinners }
    }
  };

  const changeHandler = (country: any) => {
    setValue(country);
  };

  return (
    <>
      <form className="d-flex" onSubmit={onSubmit}>
        <input
          className="form-control player-name"
          type="text"
          placeholder={player.name}
          aria-label="User Name"
          id="playerVal"
          ref={playerRef}
        />

        <div>
          <Select
            options={options}
            value={countryValue}
            onChange={changeHandler}
            defaultValue={player.country}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: "200px",
                borderColor: state.isFocused ? "blue" : "#5c88a5",
                color: "black",
              }),
            }}
          />
        </div>

        <div className="tittle">
          <button className="btn btn-success" type="submit">
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default PlayerComponent;
