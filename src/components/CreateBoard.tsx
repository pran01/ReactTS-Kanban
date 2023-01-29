import React from "react";

type CreateProps = {
  createMode: boolean;
  setCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBoard = ({ createMode, setCreateMode }: CreateProps) => {
  return (
    <div className="absolute left-0 w-1/2 h-12 flex items-center justify-start px-4 z-0">
      <button
        className="border border-white bg-fgclr-light rounded-full w-max px-4 flex items-center justify-center"
        onClick={() => setCreateMode(!createMode)}>
        Create Board
      </button>
    </div>
  );
};
export default CreateBoard;
