import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";
import TopicStrip from "../components/TopicStrip.jsx";
import Modes from "../components/Modes.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import Benefits from "../components/Benefits.jsx";
import Library from "../components/Library.jsx";
import Leaderboards from "../components/Leaderboards.jsx";
import StatsBand from "../components/StatsBand.jsx";
import Roadmap from "../components/Roadmap.jsx";
import CTA from "../components/CTA.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <div className="bg-[#0d0c0b] text-[#ECE7E1] min-h-screen antialiased overflow-x-hidden">
      <Navbar />
      <Header />
      {/* <TopicStrip /> */}
      {/* <Modes /> */}
      {/* <HowItWorks /> */}
      {/* <Benefits /> */}
      {/* <Library /> */}
      {/* <Leaderboards /> */}
      {/* <StatsBand /> */}
      {/* <Roadmap /> */}
      {/* <CTA /> */}
      <Footer />
    </div>
  );
}
