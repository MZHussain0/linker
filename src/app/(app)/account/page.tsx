import GrabUsername from "@/components/GrabUsername";

import { PageSettingsForm } from "@/components/PageSettingsForm";
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
    return (
      <PageSettingsForm
        uri={page.uri}
        displayName={page.displayName}
        bio={page.bio}
        location={page.location}
        image={session.user?.image}
      />
    );
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
