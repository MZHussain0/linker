import Header from "@/components/Header";
import { HeroForm } from "@/components/HeroForm";

export default function Home() {
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
          <HeroForm />
        </div>
      </section>
    </div>
  );
}
