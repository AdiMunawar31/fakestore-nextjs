import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { User, Mail, MapPin, Phone, Package } from "lucide-react";
import apiClient from "@/services/apiClient";
import { User as UserType } from "@/types/user";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your D2Y Store profile",
};

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  let user: UserType | null = null;
  try {
    user = await apiClient<UserType>("/users/1", { revalidate: 0 });
  } catch {
    // fallback
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Profile
        </h1>
        <LogoutButton />
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-apple mb-4">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-white text-xl font-bold">
            {user ? user.name.firstname[0].toUpperCase() : "U"}
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-900">
              {user
                ? `${user.name.firstname} ${user.name.lastname}`
                : "Welcome back!"}
            </h2>
            <p className="text-sm text-gray-500 capitalize">{user?.username}</p>
          </div>
        </div>
      </div>

      {user && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl shadow-apple divide-y divide-gray-50">
            <div className="flex items-center gap-3 p-4">
              <Mail className="w-4 h-4 text-brand shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-900">
                  {user.email}
                </p>
              </div>
            </div>
            {user.phone && (
              <div className="flex items-center gap-3 p-4">
                <Phone className="w-4 h-4 text-brand shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="text-sm font-medium text-gray-900">
                    {user.phone}
                  </p>
                </div>
              </div>
            )}
            {user.address && (
              <div className="flex items-center gap-3 p-4">
                <MapPin className="w-4 h-4 text-brand shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Address</p>
                  <p className="text-sm font-medium text-gray-900">
                    {user.address.number} {user.address.street},{" "}
                    {user.address.city} {user.address.zipcode}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-3">
            <Package className="w-4 h-4 text-green-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-800">
                Session Active
              </p>
              <p className="text-xs text-green-600 font-mono truncate">
                Token: {token.slice(0, 30)}…
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
