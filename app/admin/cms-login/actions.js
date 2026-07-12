"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLoginAction(username, password) {
    if (password === process.env.CMS_ADMIN_TOKEN) {
        const cookieStore = await cookies();
        cookieStore.set("admin_token", password, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });
        redirect("/admin");
    } else {
        return { error: "Invalid credentials" };
    }
}
