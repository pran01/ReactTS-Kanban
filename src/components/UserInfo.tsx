import { useState } from "react";

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

type userProp = {
  user: User;
  logOut: () => void;
};

const UserInfo = ({ logOut, user }: userProp) => {
  const [userMenu, setUserMenu] = useState(false);
  return (
    <div className="absolute right-0 w-1/2 h-12 flex items-center justify-end px-4 z-0">
      <button
        className="border border-white bg-fgclr-light rounded-full w-max px-4 flex items-center justify-center"
        onClick={() => setUserMenu(!userMenu)}>
        {user.username} of Team:{user.team_id}
      </button>
      {userMenu && (
        <div className="absolute right-4 top-10 w-max h-max bg-fgclr-light rounded-md p-2 shadow-xl border-2 border-black">
          <button
            className="w-full flex justify-center items-center"
            onClick={logOut}>
            <i className="fa-solid fa-right-from-bracket mr-2"></i>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
export default UserInfo;
