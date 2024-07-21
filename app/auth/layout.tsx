
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "@/lib/authOptions";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    signOut();
  }
  return (
    <div className="w-full">
      <div className=" w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
