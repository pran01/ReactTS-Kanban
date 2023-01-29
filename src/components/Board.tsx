import { useEffect, useState } from "react";
import Columns from "./Column";
import AddModal from "./AddModal";
import UserInfo from "./UserInfo";
import CreateBoard from "./CreateBoard";
import CreateBoardModal from "./CreateBoardModal";
import { db } from "../firebase-config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Login from "./Login";

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

type Team = {
  id: number;
  list: Task[];
};

const Board = () => {
  // const [list, setList] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTaskStatus, setCurrentTaskStatus] = useState<string>("To Do");
  const [taskName, setTaskName] = useState("");
  const [details, setDetails] = useState("");
  const [src, setSrc] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [taskId, setTaskId] = useState<number>(0);
  const [createMode, setCreateMode] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [usersList] = useState<User[]>([
    {
      id: 1,
      username: "user1",
      password: "user1",
      team_id: 1,
      notifications: ["user4 invited you to the board"],
    },
    {
      id: 2,
      username: "user2",
      password: "user2",
      team_id: 1,
      notifications: ["user1 invited you to the board", "user1 moved the task"],
    },
    {
      id: 3,
      username: "user3",
      password: "user3",
      team_id: 1,
      notifications: ["user1 invited you to the board", "user1 moved the task"],
    },
    {
      id: 4,
      username: "user4",
      password: "user4",
      team_id: 1,
      notifications: ["user2 invited you to the board"],
    },
    {
      id: 5,
      username: "user5",
      password: "user5",
      team_id: 2,
      notifications: ["user7 invited you to board"],
    },
    {
      id: 6,
      username: "user6",
      password: "user6",
      team_id: 2,
      notifications: ["user5 invited you to board"],
    },
    {
      id: 7,
      username: "user7",
      password: "user7",
      team_id: 2,
      notifications: ["user6 invited you to board"],
    },
    {
      id: 8,
      username: "user8",
      password: "user8",
      team_id: 3,
      notifications: ["user9 invited you to board"],
    },
    {
      id: 9,
      username: "user9",
      password: "user9",
      team_id: 3,
      notifications: ["user10 invited you to board"],
    },
    {
      id: 10,
      username: "user10",
      password: "user10",
      team_id: 3,
      notifications: ["user9 invited you to board"],
    },
  ]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(usersList[0]);
  const [taggedMembers, setTaggedMembers] = useState<User[]>([]);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const teamsCollectionRef = collection(db, "teams");

  const updateTeams = async (id: string, teams: string) => {
    const teamDoc = doc(db, "teams", id);
    const newFields = { teams: teams };
    await updateDoc(teamDoc, newFields);
  };

  const addUser = (id: number, user: User) => {
    let taggedMembersCopy = [...taggedMembers];
    taggedMembersCopy.push(user);
    setTaggedMembers(taggedMembersCopy);
    let taskList = getUsersList()!;
    for (let task of taskList) {
      if (task.id === id) task.members.push(user.id);
    }
    changeUsersList(taskList);
  };
  const removeUser = (id: number, user: User) => {
    let taggedMembersCopy = [...taggedMembers];
    const index = taggedMembersCopy.indexOf(user);
    if (index > -1) {
      taggedMembersCopy.splice(index, 1);
    }
    setTaggedMembers(taggedMembersCopy);
    let taskList = getUsersList()!;
    for (let task of taskList) {
      if (task.id === id) {
        const index = task.members.indexOf(user.id);
        if (index > -1) {
          task.members.splice(index, 1);
        }
      }
    }
    changeUsersList(taskList);
  };

  const getUsersList = () => {
    for (let team of teams) {
      if (team.id === currentUser.team_id) return team.list;
    }
  };
  const changeUsersList = (list: Task[]) => {
    let teamsCopy = [...teams];
    for (let team of teamsCopy) {
      if (team.id === currentUser.team_id) team.list = list;
    }
    setTeams(teamsCopy);
    updateTeams("1", JSON.stringify(teamsCopy));
  };

  const getUserByUsername = (username: string): User | undefined => {
    let userToGet: User | undefined = undefined;
    usersList.forEach((user) => {
      if (user.username === username) {
        userToGet = user;
        return;
      }
    });
    return userToGet;
  };

  useEffect(() => {
    if (localStorage.getItem("loggedin")) {
      setUserLoggedIn(JSON.parse(localStorage.getItem("loggedin")!));
      if (localStorage.getItem("currentuser")) {
        setCurrentUser(
          getUserByUsername(localStorage.getItem("currentuser")!)!
        );
      }
    } else {
      setUserLoggedIn(false);
    }
    const getTeams = async () => {
      const data = await getDocs(teamsCollectionRef);
      setTeams(JSON.parse(data.docs[0].data()["teams"]));
    };
    getTeams();
  }, [getUserByUsername, teamsCollectionRef]);

  const loginUser = (username: string, password: string) => {
    const tryingUser = getUserByUsername(username);
    if (tryingUser) {
      if (tryingUser.password === password) {
        setUserLoggedIn(true);
        setCurrentUser(tryingUser);
        localStorage.setItem("loggedin", JSON.stringify(true));
        localStorage.setItem("currentuser", tryingUser.username);
        setUsernameError("");
        setPasswordError("");
      } else {
        setUsernameError("");
        setPasswordError("Password Incorrect");
      }
    } else {
      setUsernameError("No user found with that username");
    }
  };

  const logOut = () => {
    setUserLoggedIn(false);
    localStorage.setItem("loggedin", JSON.stringify(false));
  };

  if (userLoggedIn)
    return (
      <div className="w-screen h-screen bg-bgclr-dark flex flex-col overflow-auto">
        {createMode && <CreateBoardModal setCreateMode={setCreateMode} />}
        {modalOpen && (
          <AddModal
            setModalOpen={setModalOpen}
            currentTaskStatus={currentTaskStatus}
            list={getUsersList()!}
            setList={changeUsersList}
            taskName={taskName}
            setTaskName={setTaskName}
            details={details}
            setDetails={setDetails}
            src={src}
            setSrc={setSrc}
            editModal={editModal}
            taskId={taskId}
            usersList={usersList}
            currentUser={currentUser}
            taggedMembers={taggedMembers}
            setTaggedMembers={setTaggedMembers}
            addUser={addUser}
            removeUser={removeUser}
          />
        )}
        <CreateBoard createMode={createMode} setCreateMode={setCreateMode} />
        <UserInfo logOut={logOut} user={currentUser} />
        {teams.length > 0 && (
          <div className="w-full min-w-max flex justify-evenly overflow-visible z-[10]">
            <Columns
              status="To Do"
              list={getUsersList()!}
              setList={changeUsersList}
              setModalOpen={setModalOpen}
              setCurrentTaskStatus={setCurrentTaskStatus}
              setTaskName={setTaskName}
              details={details}
              setDetails={setDetails}
              setSrc={setSrc}
              setEditModal={setEditModal}
              setTaskId={setTaskId}
            />
            <Columns
              status="In Progress"
              list={getUsersList()!}
              setList={changeUsersList}
              setModalOpen={setModalOpen}
              setCurrentTaskStatus={setCurrentTaskStatus}
              setTaskName={setTaskName}
              details={details}
              setDetails={setDetails}
              setSrc={setSrc}
              setEditModal={setEditModal}
              setTaskId={setTaskId}
            />
            <Columns
              status="Done"
              list={getUsersList()!}
              setList={changeUsersList}
              setModalOpen={setModalOpen}
              setCurrentTaskStatus={setCurrentTaskStatus}
              setTaskName={setTaskName}
              details={details}
              setDetails={setDetails}
              setSrc={setSrc}
              setEditModal={setEditModal}
              setTaskId={setTaskId}
            />
          </div>
        )}
      </div>
    );
  else
    return (
      <Login
        loginUser={loginUser}
        usernameError={usernameError}
        passwordError={passwordError}
      />
    );
};
export default Board;
