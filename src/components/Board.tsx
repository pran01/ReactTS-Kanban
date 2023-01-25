import React, { useEffect, useState } from "react";
import Columns from "./Column";
import AddModal from "./AddModal";
import UserInfo from "./UserInfo";

type Task = {
  id: number;
  name: string;
  details?: string;
  image?: string;
  status: "To Do" | "In Progress" | "Done";
};

const Board = () => {
  const [list, setList] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTaskStatus, setCurrentTaskStatus] = useState<
    "To Do" | "In Progress" | "Done"
  >("To Do");

  useEffect(() => {
    if (localStorage.getItem("list"))
      setList(JSON.parse(localStorage.getItem("list") as string));
  }, []);

  return (
    <div className="w-screen h-screen bg-bgclr-dark flex flex-col overflow-auto">
      {/*board container*/}
      {modalOpen && (
        <AddModal
          setModalOpen={setModalOpen}
          currentTaskStatus={currentTaskStatus}
          list={list}
          setList={setList}
        />
      )}
      <UserInfo username="Pran1" />
      <div className="w-full flex justify-evenly overflow-visible">
        <Columns
          status="To Do"
          list={list}
          setList={setList}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          currentTaskStatus={currentTaskStatus}
          setCurrentTaskStatus={setCurrentTaskStatus}
        />
        <Columns
          status="In Progress"
          list={list}
          setList={setList}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          currentTaskStatus={currentTaskStatus}
          setCurrentTaskStatus={setCurrentTaskStatus}
        />
        <Columns
          status="Done"
          list={list}
          setList={setList}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          currentTaskStatus={currentTaskStatus}
          setCurrentTaskStatus={setCurrentTaskStatus}
        />
      </div>
    </div>
  );
};
export default Board;
