import Container from "@/components/ui/container";

export default function Home() {
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <div className="p-4 sm:p-6 lg:p-8 rounded-lg overflow-hidden">
          <div
            style={{ backgroundImage: `url(/img/grapes.jpg)` }}
            className="rounded-lg relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
          ></div>
        </div>
      </div>
    </Container>
  );
}
