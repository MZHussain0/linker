import GrabUsername from "@/components/GrabUsername";

import { PageButtonsForm } from "@/components/PageButtonsForm";
import PageLinksForm from "@/components/PageLinksForm";
import { PageSettingsForm } from "@/components/PageSettingsForm";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
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
  const user = await User.findOne({ email: session.user?.email });

  if (page) {
    return (
      <>
        <PageSettingsForm
          uri={page.uri}
          displayName={page.displayName}
          bio={page.bio}
          location={page.location}
          image={user?.src || session.user?.image}
        />
        <PageButtonsForm buttons={page.buttons} />
        <PageLinksForm links={page.links} />
      </>
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
