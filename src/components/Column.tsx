import React from "react";

type Task = {
  id: number;
  name: string;
  details?: string;
  image?: string;
  status: string;
  members: number[];
};

type columProps = {
  status: string;
  list: Task[];
  setList: (list: Task[]) => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentTaskStatus: React.Dispatch<React.SetStateAction<string>>;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  details: string;
  setDetails: React.Dispatch<React.SetStateAction<string>>;
  setSrc: React.Dispatch<React.SetStateAction<string>>;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;

  setTaskId: React.Dispatch<React.SetStateAction<number>>;
};

const Columns = ({
  status,
  list,
  setList,
  setModalOpen,
  setCurrentTaskStatus,
  setTaskName,
  setDetails,
  setSrc,
  setEditModal,
  setTaskId,
}: columProps) => {
  const startDrag = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    event.dataTransfer?.setData("id", `${id}`);
  };
  const dragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };
  const drop = (event: React.DragEvent<HTMLElement>, status: string) => {
    let id: number = +event.dataTransfer.getData("id");
    let tasks = [...list];
    tasks = tasks.filter((task) => {
      if (task.id === id) {
        task.status = status;
      }
      return tasks;
    });
    setList(tasks);
    // localStorage.setItem("list", JSON.stringify(tasks));
  };

  const editTask = (task: Task) => {
    setTaskId(task.id);
    setTaskName(task.name);
    if (task.details) setDetails(task.details);
    if (task.image) setSrc(task.image);
    setCurrentTaskStatus(task.status);
    setEditModal(true);
    setModalOpen(true);
  };

  const openNewModal = () => {
    setTaskName("");
    setDetails("");
    setSrc("");
    setModalOpen(true);
    setEditModal(false);
    setCurrentTaskStatus(status);
  };

  return (
    <section
      className="w-64 max-w-64 h-max bg-fgclr-light rounded-md mt-20 font-inter px-4 pb-2 mx-4"
      onDragOver={(event) => dragOver(event)}
      onDrop={(event) => drop(event, status)}>
      <header className="w-full h-12 flex items-center justify-between px-2 font-bold">
        {status}
        <button onClick={openNewModal}>
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      </header>
      <hr className="w-full border border-white mb-4" />
      {list.map(
        (task, id) =>
          task.status === status && (
            <div
              className={`relative h-max rounded-md bg-white shadow p-2 mb-4 z-[100]`}
              key={id}
              draggable={true}
              onDragStart={(event) => startDrag(event, task.id)}
              onClick={() => editTask(task)}>
              {task.image && (
                <img
                  src={require("../assets/images/" + task.image)}
                  alt="background"
                  draggable={false}
                />
              )}
              <h1 className="text-sm font-bold">{task.name}</h1>
              <span className="text-xs">{task.details}</span>
            </div>
          )
      )}
    </section>
  );
};

export default Columns;
