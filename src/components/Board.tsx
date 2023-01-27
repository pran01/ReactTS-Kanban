import React, { useEffect, useState } from "react";
import Columns from "./Column";
import AddModal from "./AddModal";
import UserInfo from "./UserInfo";
import CreateBoard from "./CreateBoard";
import CreateBoardModal from "./CreateBoardModal";

type Task = {
  id: number;
  name: string;
  details?: string;
  image?: string;
  status: string;
};

const Board = () => {
  const [list, setList] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTaskStatus, setCurrentTaskStatus] = useState<string>("To Do");
  const [taskName, setTaskName] = useState("");
  const [details, setDetails] = useState("");
  const [src, setSrc] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [taskId, setTaskId] = useState<number>(0);
  const [createMode, setCreateMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("list"))
      setList(JSON.parse(localStorage.getItem("list") as string));
  }, []);

  return (
    <div className="w-screen h-screen bg-bgclr-dark flex flex-col overflow-auto">
      {/*board container*/}
      {createMode && <CreateBoardModal setCreateMode={setCreateMode} />}
      {modalOpen && (
        <AddModal
          setModalOpen={setModalOpen}
          currentTaskStatus={currentTaskStatus}
          list={list}
          setList={setList}
          taskName={taskName}
          setTaskName={setTaskName}
          details={details}
          setDetails={setDetails}
          src={src}
          setSrc={setSrc}
          editModal={editModal}
          taskId={taskId}
        />
      )}
      <CreateBoard createMode={createMode} setCreateMode={setCreateMode} />
      <UserInfo username="Pran1" />
      <div className="w-full min-w-max flex justify-evenly overflow-visible">
        <Columns
          status="To Do"
          list={list}
          setList={setList}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          currentTaskStatus={currentTaskStatus}
          setCurrentTaskStatus={setCurrentTaskStatus}
          taskName={taskName}
          setTaskName={setTaskName}
          details={details}
          setDetails={setDetails}
          src={src}
          setSrc={setSrc}
          setEditModal={setEditModal}
          setTaskId={setTaskId}
        />
        <Columns
          status="In Progress"
          list={list}
          setList={setList}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          currentTaskStatus={currentTaskStatus}
          setCurrentTaskStatus={setCurrentTaskStatus}
          taskName={taskName}
          setTaskName={setTaskName}
          details={details}
          setDetails={setDetails}
          src={src}
          setSrc={setSrc}
          setEditModal={setEditModal}
          setTaskId={setTaskId}
        />
        <Columns
          status="Done"
          list={list}
          setList={setList}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          currentTaskStatus={currentTaskStatus}
          setCurrentTaskStatus={setCurrentTaskStatus}
          taskName={taskName}
          setTaskName={setTaskName}
          details={details}
          setDetails={setDetails}
          src={src}
          setSrc={setSrc}
          setEditModal={setEditModal}
          setTaskId={setTaskId}
        />
      </div>
    </div>
  );
};
export default Board;
