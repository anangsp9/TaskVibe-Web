import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created!");
  };

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[350px] p-6 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">
          Todo Login
        </h1>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-indigo-600 text-white p-2 rounded mb-2"
        >
          Login
        </button>

        <button
          onClick={signUp}
          className="w-full border p-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}