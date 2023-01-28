import { useState } from "react";

type LoginProps = {
  loginUser: (username: string, password: string) => void;
};

const Login = ({ loginUser }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="absolute w-screen h-screen bg-black/80 top-0 left-0 z-[100] flex justify-center items-center">
      <div
        className={`relative w-96 h-max rounded-md bg-fgclr-light flex flex-col items-center p-4 pt-4 z-[102]`}>
        <h1 className="font-bold mb-4">Please Login to move forward</h1>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-2 h-8 rounded-md border-b border-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span className="text-xs self-start px-4">Hint: user1</span>

        <input
          type="password"
          placeholder="Password"
          className="w-full px-2 h-8 rounded-md border-b border-black mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="text-xs self-start px-4">Hint: user1</span>
        <button
          className="w-2/5 h-10 rounded-lg shadow-xl border-2 border-green-500 bg-green-400 mt-4"
          onClick={() => {
            loginUser(username, password);
          }}>
          Login
        </button>
      </div>
    </div>
  );
};
export default Login;
