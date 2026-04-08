import { getAboutPage } from "@/lib/sanity.queries";
import Container from "@/components/Layout/Container";

export default async function AboutUs() {
  const data = await getAboutPage();

  if (!data) {
    return <div>About page not found</div>;
  }

  return (
    <div className="bg-about-us py-25">
      <Container>
        <section className="max-w-5xl mx-auto">
          <div>
            <div className="flex gap-1">
              <h1 className="font-goia font-normal text-center">{data.intro.heading1}</h1>
              <h1 className="font-editorial font-normal text-center">{data.intro.heading2}</h1>
            </div>
            <h1 className="font-goia font-normal text-center">{data.intro.heading3}</h1>
          </div>
          <div className="flex justify-center items-center mt-6">
            <p className="max-w-[559px] text-center">{data.intro.description}</p>
            {data.intro.ctaText}
          </div>

        </section>
      </Container>
    </div>
  );
}
