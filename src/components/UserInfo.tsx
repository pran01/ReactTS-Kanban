import { useState } from "react";

type User = {
  id: number;
  username: string;
  password: string;
  team_id: number;
  notifications: string[];
};

type userProp = {
  user: User;
  logOut: () => void;
};

const UserInfo = ({ logOut, user }: userProp) => {
  const [userMenu, setUserMenu] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  return (
    <div className="absolute right-0 w-1/2 h-12 flex items-center justify-end px-4 z-[20]">
      <button
        className="bg-fgclr-light rounded-full h-6 w-6 flex justify-center items-center mr-4"
        onClick={() => setNotificationsVisible(!notificationsVisible)}>
        <i className="fa-solid fa-bell text-xs"></i>
      </button>
      {notificationsVisible && (
        <div className="absolute w-52 h-max bg-fgclr-light rounded-md shadow-2xl right-40 top-10 border-2 border-black">
          {user.notifications.map((notification, id) => (
            <div className="w-full" key={id}>
              <div className="w-full p-2 text-center">{notification}</div>
              <hr className="border border-black" />
            </div>
          ))}
        </div>
      )}
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
