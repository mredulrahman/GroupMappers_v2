"use client";
import { useState } from "react";
import { z } from "zod";
import { Eye, EyeClosed } from "lucide-react";
import { handleLoginAction } from "./actions";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors({});
        setServerError("");

        const result = loginSchema.safeParse({ username, password });
        if (!result.success) {
            const newErrors = {};
            result.error.errors.forEach(err => {
                newErrors[err.path[0]] = err.message;
            });
            setErrors(newErrors);
            return;
        }

        const response = await handleLoginAction(username, password);
        if (response?.error) {
            setServerError(response.error);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950">
            <section className="mx-auto max-w-7xl h-screen flex items-center justify-center">
                <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded shadow-sm">
                    <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">CMS Login</h1>

                    {serverError && <div className="mb-4 text-red-500 text-sm text-center">{serverError}</div>}

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="username">Username</label>
                        <input
                            className={`border ${errors.username ? 'border-red-500' : 'border-slate-300'} rounded px-2 py-2 text-sm w-full`}
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                className={`border ${errors.password ? 'border-red-500' : 'border-slate-300'} rounded px-2 py-2 pr-10 text-sm w-full`}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex="-1"
                            >
                                {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <button className="rounded bg-blue-700 hover:bg-blue-800 transition-colors px-4 py-2 text-sm font-semibold text-white w-full mt-2" type="submit">Login</button>
                </form>
            </section>
        </main>
    );
}