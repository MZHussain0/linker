import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Charts from "@/components/Charts";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { LinkIcon } from "lucide-react";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {};

const AnalyticsPage = async (props: Props) => {
  mongoose.connect(process.env.MONGODB_URI as string);

  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }
  const page = await Page.findOne({ owner: session.user?.email });

  const groupedViews = await Event.aggregate(
    [
      {
        $match: {
          type: "view",
          uri: page?.uri,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              date: "$createdAt",
              format: "%Y-%m-%d",
            },
          },
          count: {
            $count: {},
          },
        },
      },
    ],
    { $order: "-_id" }
  );

  const chartData = groupedViews.map((obj) => ({
    date: obj._id,
    clicks: obj.count,
  }));
  const clicks = await Event.find({
    page: page.uri,
    type: "click",
  });

  const allTimeCount = clicks.filter(
    (c) => c.uri === "https://www.gitlabs.com/zakir0"
  ).length;

  return (
    <div className="py-16">
      <div className="bg-muted/50 rounded-lg">
        <h2 className="text-xl text-center pt-4 font-semibold uppercase">
          Views
        </h2>
        <Charts data={chartData} />
      </div>

      <div className="bg-muted/50 rounded-lg">
        <h2 className="text-xl mt-16 mb-4 pt-4 text-center uppercase font-semibold">
          Clicks
        </h2>
        <div className="flex flex-col w-full gap-4 items-start justify-center px-4">
          {page.links.map((link: any) => (
            <div
              className="w-full max-w-2xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-8 mb-4 bg-muted/50 rounded-lg"
              key={link.linkId}>
              <div className="max-w-fit">
                <LinkIcon className="h-6 w-6 text-theme-200" />
              </div>

              <div className="flex flex-col items-start justify-center gap-1 grow">
                <h3 className="text-lg font-semibold text-theme-400 ">
                  {link.linkTitle || "No title"}
                </h3>
                <p className="text-muted-foreground">
                  {link.linkSubtitle || "No description"}
                </p>
                <Link
                  href={link.linkUrl}
                  className="text-theme-300/75 text-sm ">
                  {link.linkUrl}
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="bg-theme-400/10 px-4 py-2 flex flex-col-reverse items-center justify-center rounded-lg gap-2">
                  today
                  <span className="text-theme-400 text-2xl font-bold">
                    {
                      clicks.filter(
                        (c) =>
                          c.uri === link.linkUrl &&
                          c.createdAt.toDateString() ===
                            new Date().toDateString()
                      ).length
                    }
                  </span>
                </div>
                <div className="bg-theme-400/10 px-4 py-2 rounded-lg flex flex-col-reverse items-center justify-center gap-2">
                  total clicks
                  <span className="text-theme-400 text-2xl font-bold">
                    {clicks.filter((c) => c.uri === link.linkUrl).length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
