import { supabase } from "../lib/supabase";

export async function loginUser(email, password) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function registerUser(email, password) {
  return await supabase.auth.signUp({
    email,
    password,
  });
}