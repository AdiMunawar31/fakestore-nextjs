"use client";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/auth.slice";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { useCallback } from "react";

export default function LogoutButton() {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    redirect("/login");
  }, [dispatch]);

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors font-medium"
    >
      <LogOut className="w-4 h-4" />
      Sign out
    </button>
  );
}
