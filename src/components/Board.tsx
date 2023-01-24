import React from "react";
import Columns from "./Column";
import UserInfo from "./UserInfo";
const Board = () => {
  return (
    <div className="w-screen h-screen bg-bgclr-dark flex flex-col">
      {/*board container*/}
      <UserInfo username="Pran1" />
      <div className="w-full flex justify-evenly">
        <Columns status="To Do" />
        <Columns status="In Progress" />
        <Columns status="Done" />
      </div>
    </div>
  );
};
export default Board;
