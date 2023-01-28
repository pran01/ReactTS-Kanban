import { useState } from "react";

type CreateModalProps = {
  setCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBoardModal = ({ setCreateMode }: CreateModalProps) => {
  const [screen, setScreen] = useState(1);
  const [boardName, setBoardName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [createBoardError, setCreateBoardError] = useState(false);
  const [mandatoryCol1, setMandatoryCol1] = useState("To Do");
  const [mandatoryCol2, setMandatoryCol2] = useState("In Progress");
  const [mandatoryCol3, setMandatoryCol3] = useState("Done");

  const saveBoardName = () => {
    if (boardName === "") setNameError(true);
    else {
      setScreen(2);
    }
  };
  const addColumn = () => {
    let newColumn = document.createElement("div");
    newColumn.className = "w-full flex justify-between mb-2";
    let columnInput = document.createElement("input");
    columnInput.type = "text";
    columnInput.placeholder = "column name";
    columnInput.className =
      "w-2/3 px-2 h-8 rounded-md shadow-lg border-b-2 border-black";
    newColumn.appendChild(columnInput);
    let removeBtn = document.createElement("button");
    removeBtn.className = "w-1/4 bg-white rounded-md shadow-md";
    removeBtn.innerText = "Remove";
    removeBtn.addEventListener("click", (event) => {
      let current = (event.target as HTMLButtonElement).parentNode;
      if (current?.parentNode) current.parentNode.removeChild(current);
    });
    newColumn.appendChild(removeBtn);
    document.querySelector("#column-names")?.appendChild(newColumn);
  };

  return (
    <div className="absolute w-screen h-screen bg-black/80 top-0 left-0 z-[120] flex justify-center items-center">
      <div
        className={`relative w-96 h-max rounded-md bg-fgclr-light flex flex-col items-center p-4 pt-8 z-[102]`}>
        <button onClick={() => setCreateMode(false)}>
          <i className="fa-solid fa-circle-xmark absolute top-2 right-2"></i>
        </button>
        {screen === 1 && (
          <div className="w-full h-full flex flex-col items-center">
            <label htmlFor="board-name" className="font-bold">
              Give your board a name
            </label>
            <input
              type="text"
              placeholder="Board Name"
              id="board-name"
              className={`w-full px-2 h-8 rounded-md shadow-lg border-b-2 border-${
                nameError ? "red-500" : "black"
              }`}
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
            {nameError && (
              <span className="text-xs self-start text-red-500">
                Board name can not be empty
              </span>
            )}
            <button
              className="w-20 h-8 bg-white rounded-md shadow-xl mt-4"
              onClick={saveBoardName}>
              Next
            </button>
          </div>
        )}
        {screen === 2 && (
          <div className="w-full h-full flex flex-col items-center">
            <label className="font-bold">Columns</label>
            <div className="flex flex-col" id="column-names">
              <div className="w-full flex justify-between mb-2">
                <input
                  type="text"
                  className="w-2/3 px-2 h-8 rounded-md shadow-lg border-b-2 border-black"
                  value={mandatoryCol1}
                  onChange={(e) => setMandatoryCol1(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-between mb-2">
                <input
                  type="text"
                  className="w-2/3 px-2 h-8 rounded-md shadow-lg border-b-2 border-black"
                  value={mandatoryCol2}
                  onChange={(e) => setMandatoryCol2(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-between mb-2">
                <input
                  type="text"
                  className="w-2/3 px-2 h-8 rounded-md shadow-lg border-b-2 border-black"
                  value={mandatoryCol3}
                  onChange={(e) => setMandatoryCol3(e.target.value)}
                />
              </div>
            </div>
            <button
              className="w-max px-2 bg-white rounded-md shadow-md self-center mt-4"
              onClick={addColumn}>
              Add Column
            </button>
            <div className="w-full flex justify-evenly mt-4">
              <button
                className="w-max px-2 bg-white rounded-md shadow-md"
                onClick={() => {
                  setScreen(1);
                  setNameError(false);
                }}>
                Previous
              </button>
              <button
                className="w-max px-2 bg-white rounded-md shadow-md bg-green-400"
                onClick={() => setCreateBoardError(true)}>
                Create Board
              </button>
            </div>
            {createBoardError && (
              <span className="text-sm text-red-500 font-bold mt-4">
                Cant create a new board. Only 1 free board allowed.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default CreateBoardModal;
