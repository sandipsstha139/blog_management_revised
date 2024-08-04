"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import { GlobeLock, Handshake, Mail, NotepadText, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatDate } from "@/utils/dateUtils";

export default function DashboardSideBar() {
  const pathname = usePathname();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[55px] items-center justify-start border-b px-3 w-full">
          <Link className=" gap-2 font-semibold ml-1" href="/dashboard">
            <span className="">CMS Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="flex flex-col justify-between h-full px-4 text-sm font-medium">
            <div>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all dark:bg-gray-800 dark:text-gray-50":
                      pathname === "/dashboard/blog",
                  }
                )}
                href="/dashboard/blog"
              >
                <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                  <NotepadText className="h-3 w-3" />
                </div>
                Blog
              </Link>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all dark:bg-gray-800 dark:text-gray-50":
                      pathname === "/dashboard/privacy-policy",
                  }
                )}
                href="/dashboard/privacy-policy"
              >
                <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                  <GlobeLock className="h-3 w-3" />
                </div>
                Privacy Policy
              </Link>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all dark:bg-gray-800 dark:text-gray-50":
                      pathname === "/dashboard/terms-and-conditions",
                  }
                )}
                href="/dashboard/terms-and-conditions"
              >
                <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                  <Handshake className="h-3 w-3" />
                </div>
                Terms and Conditions
              </Link>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all dark:bg-gray-800 dark:text-gray-50":
                      pathname === "/dashboard/reviews",
                  }
                )}
                href="/dashboard/reviews"
              >
                <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                  <Star className="h-3 w-3" />
                </div>
                Reviews
              </Link>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  {
                    "flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all dark:bg-gray-800 dark:text-gray-50":
                      pathname === "/dashboard/mail",
                  }
                )}
                href="/dashboard/mail"
              >
                <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                  <Mail className="h-3 w-3" />
                </div>
                Mail
              </Link>
            </div>
            <div className="mt-auto">
              <Separator className="my-3" />
              <div className="flex justify-center items-center">
                <p>{formatDate(currentDate)}</p>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
