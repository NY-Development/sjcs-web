import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuthStore } from "../lib/authStore.js";
import RotatingLogo from "../components/RotatingLogo.jsx";
import {Eye, EyeOff} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleHint = searchParams.get("role");
  const setAuth = useAuthStore((state) => state.setAuth);
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = useMemo(
    () => ({
      email: "",
      password: ""
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues
  });

  const loginMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post("/auth/login", payload);
      return response.data.data;
    },
    onSuccess: (data) => {
      setAuth({
        user: data.user,
        role: data.user?.role || roleHint || null,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      });
      navigate("/portal", { replace: true });
    }
  });

  const onSubmit = (values) => loginMutation.mutate(values);

  return (
    <div className="min-h-screen bg-sjcs-gray font-display text-sjcs-textPrimary">
      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] overflow-hidden bg-white shadow-2xl">
        <div className="relative hidden w-1/2 overflow-hidden bg-sjcs-blue/10 lg:flex">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCk9P3mV6Zii72SXOaFNj78p2Q5oHIrMzplvCaHH4vpuhgSarRrBRCZ0pIRwnkgnBo6DX16zq3-aMVzOv-zQ9lDTcXUpthyzVzXBKDsQMSw2YbSSSPolUSKqbc7LsNYr7MUBEg5bMhFwSAewUe00P7rr5bY8QS4gMBY83R6IK9lOw6Yj6AHxcEqV9b6WwNzIE51VMmiqvrPid06sU7c703ZnPGIRN_SeHT1RCII6ypZjjHenJ3yMvPp8o6rbF9q42Aj2b0T6XSfiWUD')"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sjcs-blue/90 to-sjcs-blue/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
          <div className="relative z-10 flex h-full w-full flex-col justify-between p-12 text-white">
            <div className="flex items-center space-x-3">
              <RotatingLogo className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 bg-white/20" />
              <span className="text-xl font-bold tracking-wide">SJCS Portal</span>
            </div>
            <div className="mb-12 max-w-lg">
              <h1 className="mb-4 text-4xl font-bold leading-tight drop-shadow-lg lg:text-5xl">
                Empowering Future Leaders Through Faith & Knowledge.
              </h1>
              <p className="text-lg text-blue-50/90">
                Welcome to the official digital gateway for Saint Joseph Catholic School. Access
                your academic resources, grades, and community updates securely.
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-white/20 pt-6 text-sm text-blue-100/80">
              <span>© 2023 Saint Joseph Catholic School</span>
              <div className="flex space-x-4">
                <Link className="transition-colors hover:text-white" to="/">
                  About Us
                </Link>
                <Link className="transition-colors hover:text-white" to="/">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center bg-white p-8 lg:w-1/2 lg:p-24">
          <div className="absolute left-8 top-8 flex items-center space-x-2 lg:hidden">
            <RotatingLogo className="flex h-8 w-8 items-center justify-center rounded-lg bg-sjcs-blue/10 text-sjcs-blue" />
            <span className="font-bold text-sjcs-textPrimary">SJCS</span>
          </div>
          <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-sjcs-textPrimary">Welcome Back</h2>
              <p className="mt-2 text-sm text-sjcs-textSecondary">
                Please enter your credentials to access your dashboard.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <label className="block text-sm font-medium text-sjcs-textSecondary">
                  <span className="mb-2 block text-sjcs-textPrimary">Email</span>
                  <div className="relative">
                    <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                      person
                    </span>
                    <input
                      className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-10 py-3 text-sm focus:border-sjcs-blue focus:outline-none focus:ring-2 focus:ring-sjcs-blue/20"
                      placeholder="student@sjcs.edu"
                      type="email"
                      {...register("email")}
                    />
                  </div>
                  {errors.email ? (
                    <span className="mt-2 block text-xs text-sjcs-danger">{errors.email.message}</span>
                  ) : null}
                </label>

                <label className="block text-sm font-medium text-sjcs-textSecondary">
                  <span className="mb-2 block text-sjcs-textPrimary">Password</span>
                  <div className="relative">
                    <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                      lock
                    </span>
                    <input
                      className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-10 py-3 text-sm focus:border-sjcs-blue focus:outline-none focus:ring-2 focus:ring-sjcs-blue/20"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-500"
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password ? (
                    <span className="mt-2 block text-xs text-sjcs-danger">{errors.password.message}</span>
                  ) : null}
                </label>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-sjcs-textSecondary">
                  <input className="h-4 w-4 rounded border-slate-300 text-sjcs-blue" type="checkbox" />
                  Remember me
                </label>
                <Link className="font-medium text-sjcs-blue hover:opacity-80" to="/">
                  Forgot password?
                </Link>
              </div>

              {loginMutation.isError ? (
                <div className="rounded-lg border border-sjcs-danger/30 bg-sjcs-danger/10 px-4 py-3 text-sm text-sjcs-danger">
                  {loginMutation.error?.response?.data?.message || "Login failed. Try again."}
                </div>
              ) : null}

              <button
                className="w-full rounded-lg bg-sjcs-gradient py-3.5 text-sm font-semibold text-white shadow-sjcs-soft transition hover:-translate-y-0.5"
                disabled={loginMutation.isPending}
                type="submit"
              >
                {loginMutation.isPending ? "Signing in..." : "Sign In to Portal"}
              </button>
            </form>

            <div className="border-t border-slate-100 pt-6 text-center text-sm text-sjcs-textSecondary">
              Experiencing issues?
              <Link className="ml-1 font-medium text-sjcs-blue hover:opacity-80" to="/">
                Contact IT Support
              </Link>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
                <span className="material-icons-round text-sm">verified_user</span>
                Secured by SJCS Information Technology
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
