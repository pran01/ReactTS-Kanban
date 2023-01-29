import { useEffect, useState } from "react";
type Task = {
  id: number;
  name: string;
  details?: string;
  image?: string;
  status: string;
  members: number[];
};

type User = {
  id: number;
  username: string;
  password: string;
  team_id: number;
  notifications: string[];
};
type modalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentTaskStatus: string;
  list: Task[];
  setList: (list: Task[]) => void;
  taskName: string;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  details: string;
  setDetails: React.Dispatch<React.SetStateAction<string>>;
  src: string;
  setSrc: React.Dispatch<React.SetStateAction<string>>;
  editModal: boolean;
  taskId: number;
  usersList: User[];
  currentUser: User;
  taggedMembers: User[];
  setTaggedMembers: React.Dispatch<React.SetStateAction<User[]>>;
  addUser: (id: number, user: User) => void;
  removeUser: (id: number, user: User) => void;
};

const AddModal = ({
  setModalOpen,
  currentTaskStatus,
  list,
  setList,
  taskName,
  setTaskName,
  details,
  setDetails,
  src,
  setSrc,
  editModal,
  taskId,
  usersList,
  currentUser,
  taggedMembers,
  setTaggedMembers,
  addUser,
  removeUser,
}: modalProps) => {
  const [detailsOn, setDetailsOn] = useState(details !== "");
  const [imageChoice, setImageChoice] = useState(false);
  const [membersToTag, setMembersToTag] = useState(false);
  let taskMid: Task;
  useEffect(() => {
    getTaggedMembers();
  }, []);

  const getUserIdFromUsersList = (users: User[]): number[] => {
    let userIds: number[] = [];
    users.forEach((user) => {
      userIds.push(user.id);
    });
    return userIds;
  };

  const getTaggedMembers = () => {
    if (editModal) {
      let members: number[];
      for (let task of list) {
        if (task.id === taskId) members = task.members;
      }
      let userMembers: User[] = [];
      usersList.forEach((user) => {
        if (members.includes(user.id)) userMembers.push(user);
      });
      setTaggedMembers(userMembers);
    } else setTaggedMembers([]);
  };

  const saveTask = () => {
    if (editModal) {
      let taskList = [...list];
      for (let task of taskList) {
        if (task.id === taskId) {
          task.name = taskName;
          task.details = details;
          task.image = src;
        }
      }
      setList(taskList);
      // localStorage.setItem("list", JSON.stringify(taskList));
    } else {
      if (list.length === 0) {
        taskMid = {
          ...taskMid,
          id: 0,
          name: taskName,
          status: currentTaskStatus,
          members: getUserIdFromUsersList(taggedMembers),
        };
      } else {
        taskMid = {
          ...taskMid,
          id: list[list.length - 1].id + 1,
          name: taskName,
          status: currentTaskStatus,
          members: getUserIdFromUsersList(taggedMembers),
        };
      }
      if (details !== "") taskMid = { ...taskMid, details: details };
      if (src !== "") taskMid = { ...taskMid, image: src };
      let tempList = [...list, taskMid];
      setList(tempList);
      // localStorage.setItem("list", JSON.stringify(tempList));
    }
    setModalOpen(false);
  };

  const deleteTask = () => {
    let taskList = [...list];
    taskList = taskList.filter((task) => {
      if (task.id !== taskId) return task;
    });
    taskList.sort((task1, task2) =>
      task1.id > task2.id ? 1 : task2.id > task1.id ? -1 : 0
    );
    setList(taskList);
    // localStorage.setItem("list", JSON.stringify(taskList));
    setModalOpen(false);
  };

  const setImage = (src: string) => {
    setSrc(src);
    setImageChoice(false);
  };

  const tagMembers = () => {
    setMembersToTag(!membersToTag);
  };
  // const addUser = (user: User) => {
  //   let taggedMembersCopy = [...taggedMembers];
  //   taggedMembersCopy.push(user);
  //   setTaggedMembers(taggedMembersCopy);
  //   console.log(taskId);
  // };
  // const removeUser = (user: User) => {
  //   let taggedMembersCopy = [...taggedMembers];
  //   const index = taggedMembersCopy.indexOf(user);
  //   if (index > -1) {
  //     taggedMembersCopy.splice(index, 1);
  //   }
  //   setTaggedMembers(taggedMembersCopy);
  //   console.log(taskId);
  // };
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
        {taggedMembers.length > 0 && (
          <div className="mt-2 flex">
            <b>Members</b> :{" "}
            {taggedMembers.map((member, key) => member.username + ", ")}
          </div>
        )}
        <div className="w-full flex justify-evenly py-2">
          <button onClick={tagMembers}>
            <i className="fa-solid fa-users"></i> Tag
          </button>
          <button onClick={() => setDetailsOn(!detailsOn)}>
            <i className="fa-solid fa-notes-medical"></i> Add details
          </button>
          <button onClick={() => setImageChoice(!imageChoice)}>
            <i className="fa-solid fa-panorama"></i> Background
          </button>
        </div>
        {membersToTag && (
          <div className="absolute top-24 left-24 shadow-xl rounded-lg border-2 border-black w-max h-max flex flex-col justify-evenly content-evenly bg-white z-[104]">
            {/* color group */}
            <div className="flex justify-evenly px-2">
              Members{" "}
              <button
                className="ml-2 text-xs"
                onClick={() => setMembersToTag(false)}>
                <i className="fa-solid fa-xmark-circle"></i>
              </button>
            </div>
            {usersList.map(
              (user, key) =>
                user.team_id === currentUser.team_id && (
                  <div
                    key={key}
                    className="px-4 py-1 flex justify-center items-center">
                    <input
                      type="checkbox"
                      name="team-members"
                      id={"" + user.id}
                      className="mr-2"
                      checked={taggedMembers.includes(user)}
                      onChange={() => {
                        taggedMembers.includes(user)
                          ? removeUser(taskId, user)
                          : addUser(taskId, user);
                      }}
                    />{" "}
                    <label htmlFor={"" + user.id}>{user.username}</label>
                  </div>
                )
            )}
          </div>
        )}

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
        <div className="w-full flex justify-evenly">
          <button
            className="bg-white px-6 py-1 rounded-md shadow-xl mt-2"
            onClick={saveTask}>
            Save
          </button>
          {editModal && (
            <button
              className="bg-white px-6 py-1 rounded-md shadow-xl mt-2 bg-red-500"
              onClick={deleteTask}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddModal;
