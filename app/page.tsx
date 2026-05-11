import Container from "@/components/Layout/Container";
import { getHomePage } from "@/lib/sanity.queries";
import HeroSection from "@/components/homepage/HeroSection";
import ShowReelSection from "@/components/homepage/ShowReelSection";
import AwardWinningStudioSection from "@/components/homepage/AwardWinningStudioSection";
import DigitalEcosystemSection from "@/components/homepage/DigitalEcosystemSection";
import CoherenceIsAlive from "@/components/homepage/CoherenceIsAlive";
import SelectedWorksSection from "@/components/homepage/SelectedWorksSection";
import ROICoherenceSection from "@/components/homepage/ROICoherenceSection";
import DiverseTeamSection from "@/components/homepage/DiverseTeamSection";
import FinalCtaSection from "@/components/homepage/FinalCtaSection";
import Ecosystem from "@/components/homepage/Ecosystem";

// Always fetch fresh data so new Sanity content (e.g. uploaded images) shows
export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getHomePage();

  if (!data) {
    return <div className="p-6">Home page not found</div>;
  }

  return (
    <div className="min-h-screen bg-black px-5 md:px-10 lg:px-20 overflow-x-hidden">
      <Container variant="medium" className="pb-16 ">
        <HeroSection heroSection={data.heroSection} />
        <ShowReelSection showReelsSection={data.showReelsSection} />
        <AwardWinningStudioSection
          awardWinningStudio={data.awardWinningStudio}
        />
      </Container>
      {/* <DigitalEcosystemSection digitalEcosystem={data.digitalEcosystem} /> */}
      <div className="-mx-5 md:-mx-10 lg:-mx-5">
        <Ecosystem />
      </div>
      <Container variant="medium">
        <CoherenceIsAlive coherenceIsAlive={data.coherenceIsAlive} />
      </Container>
      <SelectedWorksSection selectedWorks={data.selectedWorks} />
      <DiverseTeamSection diverseTeam={data.diverseTeam} />
      <Container variant="medium" className="pt-10 pb-16 ">
        <ROICoherenceSection roiOfCoherence={data.roiOfCoherence} />
        <FinalCtaSection finalCta={data.finalCta} />
      </Container>
    </div>
  );
}
