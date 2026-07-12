"use client";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminProvider } from "./context/AdminContext";
import Sidebar from "./components/sidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/cms-login";

  return (
    <AdminProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      {isLoginPage ? (
        children
      ) : (
        <main className="h-screen bg-slate-50 text-slate-950 flex flex-col overflow-hidden">
          <section className="border-b border-slate-200 bg-white flex-shrink-0 z-20">
            <div className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                  GroupMappers CMS
                </p>
                <h1 className="text-2xl font-bold">Content Admin</h1>
              </div>

              <div className="relative group">
                <button className="rounded-full overflow-hidden transition-all">
                  <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z" fill="#000000" />
                  </svg>
                </button>

                <div className="absolute right-0 top-full w-48 pt-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150">
                  <div className="bg-white border border-slate-200 rounded shadow-lg py-1">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-400"
                      onClick={() => {
                        router.push("/admin/settings");
                      }}
                    >
                      Settings
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-blue-400"
                      onClick={() => router.push("/admin/cms-login")}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="flex-1 overflow-hidden flex">
            <Sidebar />
            {children}
          </section>
        </main>
      )}
    </AdminProvider>
  );
}