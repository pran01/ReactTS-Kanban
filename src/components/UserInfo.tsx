import { useState } from "react";

type userProp = {
  username: string;
};

const UserInfo = ({ username }: userProp) => {
  const [userMenu, setUserMenu] = useState(false);
  return (
    <div className="relative w-full h-12 flex items-center justify-end px-4 z-0">
      <button
        className="border border-white bg-fgclr-light rounded-full w-max px-4 flex items-center justify-center"
        onClick={() => setUserMenu(!userMenu)}>
        {username}
      </button>
      {userMenu && (
        <div className="absolute right-4 top-10 w-max h-max bg-fgclr-light rounded-md p-2 shadow-xl border-2 border-black">
          <button className="w-full flex justify-center items-center">
            Log Out
          </button>
          <button className="w-full flex justify-center items-center">
            Change Username
          </button>
        </div>
      )}
    </div>
  );
};
export default UserInfo;
