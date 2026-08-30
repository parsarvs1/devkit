"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2 text-sm text-red-400 transition hover:text-red-300"
    >
      <LogOut size={16} />
      Sign out
    </button>
  );
}