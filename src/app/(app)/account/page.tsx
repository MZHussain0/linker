import GrabUsername from "@/components/GrabUsername";
import { Page } from "@/models/page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

type Props = {
  searchParams: { username: string };
};

const AccountPage = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }

  mongoose.connect(process.env.MONGODB_URI as string);
  const page = await Page.findOne({ owner: session.user?.email });

  if (page) {
    return <div className="max-w-4xl mx-auto">Your page is: /{page.uri}</div>;
  }

  const { name } = session.user || {};
  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-4">
        Account: {name} <br />
        DesiredUsername = {searchParams.username}
      </div>

      <div className="max-w-md mx-auto mt-8">
        <GrabUsername desiredUsername={searchParams.username} />
      </div>
    </div>
  );
};

export default AccountPage;
