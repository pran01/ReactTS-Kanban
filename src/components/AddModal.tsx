import { useState } from "react";

type Task = {
  id: number;
  name: string;
  details?: string;
  image?: string;
  status: "To Do" | "In Progress" | "Done";
};
type modalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentTaskStatus: "To Do" | "In Progress" | "Done";
  list: Task[];
  setList: React.Dispatch<React.SetStateAction<Task[]>>;
};

const AddModal = ({
  setModalOpen,
  currentTaskStatus,
  list,
  setList,
}: modalProps) => {
  const [detailsOn, setDetailsOn] = useState(false);
  const [imageChoice, setImageChoice] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [details, setDetails] = useState("");
  const [src, setSrc] = useState("");
  let taskMid: Task;
  const saveTask = () => {
    if (list.length === 0) {
      taskMid = {
        ...taskMid,
        id: 0,
        name: taskName,
        status: currentTaskStatus,
      };
    } else {
      taskMid = {
        ...taskMid,
        id: list[list.length - 1].id + 1,
        name: taskName,
        status: currentTaskStatus,
      };
    }
    if (details !== "") taskMid = { ...taskMid, details: details };
    if (src !== "") taskMid = { ...taskMid, image: src };
    let tempList = [...list, taskMid];
    setList(tempList);
    localStorage.setItem("list", JSON.stringify(tempList));
    console.log(taskMid.id);
    setModalOpen(false);
  };
  const setImage = (src: string) => {
    setSrc(src);
    setImageChoice(false);
  };
  return (
    <div className="absolute w-screen h-screen bg-black/80 top-0 left-0 z-[100] flex justify-center items-center">
      <div
        className={`relative w-96 h-max rounded-md bg-fgclr-light flex flex-col items-center p-4 pt-8 z-[102]`}>
        <button onClick={() => setModalOpen(false)}>
          <i className="fa-solid fa-circle-xmark absolute top-2 right-2"></i>
        </button>
        <input
          type="text"
          placeholder="Task Name"
          className="w-full px-2 h-8 rounded-md border-b border-black"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <div className="w-full flex justify-evenly py-2">
          <button>
            <i className="fa-solid fa-users"></i> Tag
          </button>
          <button onClick={() => setDetailsOn(!detailsOn)}>
            <i className="fa-solid fa-notes-medical"></i> Add details
          </button>
          <button onClick={() => setImageChoice(!imageChoice)}>
            <i className="fa-solid fa-panorama"></i> Background
          </button>
        </div>
        {imageChoice && (
          <div className="absolute top-10 left-10 shadow-xl rounded-lg border-2 border-black w-fit h-max flex flex-wrap justify-evenly content-evenly my-2 bg-white z-[104]">
            {/* color group */}
            <button onClick={() => setImageChoice(false)}>
              <i className="fa-solid fa-circle-xmark absolute top-2 right-2"></i>
            </button>
            <button
              onClick={() => setImage("background-gradient2.png")}
              className="w-40 h-20 rounded-full bg-[url('assets/images/background-gradient2.png')] bg-cover bg-center shadow-xl my-4"></button>
            <button
              onClick={() => setImage("background-gradient.png")}
              className="w-40 h-20 rounded-full bg-[url('assets/images/background-gradient.png')] bg-cover bg-center shadow-xl my-4"></button>
            <button
              onClick={() => setImage("background-fuji.png")}
              className="w-40 h-20 rounded-full bg-[url('assets/images/background-fuji.png')] bg-cover bg-center shadow-xl my-4"></button>
            <button
              onClick={() => setImage("background-travel.png")}
              className="w-40 h-20 rounded-full bg-[url('assets/images/background-travel.png')] bg-cover bg-center shadow-xl my-4"></button>
          </div>
        )}
        {detailsOn && (
          <textarea
            name="note"
            id="note"
            cols={35}
            rows={5}
            className="w-4/5 px-4 py-2 shadow-xl rounded-md"
            placeholder="Add Description"
            value={details}
            onChange={(e) => setDetails(e.target.value)}></textarea>
        )}
        <button
          className="bg-white px-6 py-1 rounded-md shadow-xl mt-2"
          onClick={saveTask}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddModal;
