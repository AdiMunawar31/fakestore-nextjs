"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";
import {
  useAppDispatch,
  useAppSelector,
  selectAuthLoading,
  selectAuthError,
} from "@/store/hooks";
import { loginThunk, clearError } from "@/store/slices/auth.slice";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [form, setForm] = useState({ username: "", password: "" });
  const [showPw, setShowPw] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(clearError());
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const result = await dispatch(loginThunk(form));
      if (loginThunk.fulfilled.match(result)) {
        router.push("/");
      }
    },
    [dispatch, form, router]
  );

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-sm animate-slide-up">
        <div className="bg-white rounded-3xl shadow-apple-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center mb-3">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Sign in
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              to your D2Y FakeStore account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="username"
              name="username"
              label="Username"
              placeholder="johnd"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                label="Password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-11 text-gray-400 hover:text-gray-600"
              >
                {showPw ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              loading={isLoading}
              className="cursor-pointer w-full justify-center mt-2"
              size="md"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-3 bg-gray-50 rounded-xl text-xs text-gray-500">
            <p className="font-medium text-gray-700 mb-1">Demo credentials:</p>
            <p>
              Username: <span className="font-bold">johnd</span>
            </p>
            <p>
              Password: <span className="font-bold">m38rmF$</span>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            className="cursor-pointer text-brand hover:underline"
          >
            ← Back to store
          </Button>
        </p>
      </div>
    </div>
  );
}
