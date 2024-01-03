import GrabUsername from "@/components/GrabUsername";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {
  searchParams: { username: string };
};

const AccountPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-4 ">
        Account: {session.user?.name} <br />
        DesiredUsername = {searchParams.username}
      </div>

      <div className="max-w-md mx-auto mt-8">
        <GrabUsername desiredUsername={searchParams.username} />
      </div>
    </div>
  );
};

export default AccountPage;
