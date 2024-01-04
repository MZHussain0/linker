import Header from "@/components/Header";
import { HeroForm } from "@/components/HeroForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Header />

      <section className="p-4 pt-32 max-w-4xl mx-auto">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold">
            Your one link <br /> for everything
          </h1>

          <h2 className="text-muted-foreground text-2xl mt-6">
            Share your social links, contact info and more in one page
          </h2>
        </div>

        <div className="max-w-md pt-8">
          <HeroForm user={session?.user?.name} />
        </div>
      </section>
    </div>
  );
}
