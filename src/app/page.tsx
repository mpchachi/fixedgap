import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Solution from '@/components/sections/Solution';
import Pipeline from '@/components/sections/Pipeline';
import Demo from '@/components/sections/Demo';
import Traction from '@/components/sections/Traction';
import Metrics from '@/components/sections/Metrics';
import TeamPreview from '@/components/sections/TeamPreview';
import BehindFixedGap from '@/components/sections/BehindFixedGap';
import Team from '@/components/sections/Team';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Traction />
      <Demo />
      <Solution />
      <div style={{ height: 'calc(100vh + 5px)' }}>
        <Pipeline />
      </div>
      <Metrics />
      <TeamPreview />
      <Contact />
      {/* <BehindFixedGap /> */}  {/* pendiente - se construye después */}
      {/* <Team /> */}  {/* pendiente - se construye después */}
    </main>
  );
}
