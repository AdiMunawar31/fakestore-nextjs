"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/store/slices/auth.slice";
import { getTokenFromCookie } from "@/utils/getToken";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getTokenFromCookie();
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return null;
}
