import Square from "@/components/button/button";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-2">
        {" "}
        <h1>Hello world</h1>
        <Square
          value="Browse"
          navigateTo="/browse"
        ></Square>
      </div>
    </main>
  );
}
