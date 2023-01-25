import React, { useState } from "react";

type Task = {
  id: number;
  name: string;
  details?: string;
  image?: string;
  status: "To Do" | "In Progress" | "Done";
};

type columProps = {
  status: "To Do" | "In Progress" | "Done";
  list: Task[];
  setList: React.Dispatch<React.SetStateAction<Task[]>>;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentTaskStatus: "To Do" | "In Progress" | "Done";
  setCurrentTaskStatus: React.Dispatch<
    React.SetStateAction<"To Do" | "In Progress" | "Done">
  >;
};

const Columns = ({
  status,
  list,
  setList,
  modalOpen,
  setModalOpen,
  currentTaskStatus,
  setCurrentTaskStatus,
}: columProps) => {
  const startDrag = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    event.dataTransfer?.setData("id", `${id}`);
  };
  const dragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };
  const drop = (
    event: React.DragEvent<HTMLElement>,
    status: "To Do" | "In Progress" | "Done"
  ) => {
    let id: number = +event.dataTransfer.getData("id");
    let tasks = [...list];
    tasks = tasks.filter((task) => {
      if (task.id === id) {
        task.status = status;
      }
      return tasks;
    });
    setList(tasks);
    localStorage.setItem("list", JSON.stringify(tasks));
  };

  return (
    <section
      className="w-64 h-max bg-fgclr-light rounded-md mt-8 font-inter px-4 pb-4"
      onDragOver={(event) => dragOver(event)}
      onDrop={(event) => drop(event, status)}>
      <header className="w-full h-12 flex items-center justify-between px-2 font-bold">
        {status}
        <button
          onClick={() => {
            setModalOpen(true);
            setCurrentTaskStatus(status);
          }}>
          <i className="fa-solid fa-circle-plus"></i>
        </button>
      </header>
      <hr className="w-full border border-white mb-4" />
      {list.map(
        (task, id) =>
          task.status === status && (
            <div
              className={`relative h-max rounded-md bg-white shadow p-2 mb-2`}
              key={task.details}
              draggable={true}
              onDragStart={(event) => startDrag(event, task.id)}>
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
