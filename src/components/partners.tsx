import Image from "next/image";

function AwsLogo() {
  return (
    <Image
      src="/sponsors/aws.png"
      alt="AWS"
      width={80}
      height={48}
      className="h-9 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
    />
  );
}

function SaturnoLabsLogo() {
  return (
    <span className="text-xl font-bold tracking-tight text-slate-300 hover:text-slate-700 transition-colors duration-300" aria-label="SaturnoLabs">
      Saturno<span className="font-normal opacity-60">Labs</span>
    </span>
  );
}

function SanitasLogo() {
  return (
    <span className="text-xl font-bold tracking-tight text-slate-300 hover:text-slate-700 transition-colors duration-300" aria-label="Sanitas">
      Sanitas
    </span>
  );
}

function OakleyCapitalLogo() {
  return (
    <span className="text-xl font-bold tracking-tight text-slate-300 hover:text-slate-700 transition-colors duration-300" aria-label="Oakley Capital">
      Oakley <span className="font-normal opacity-60">Capital</span>
    </span>
  );
}

const logos = [AwsLogo, SaturnoLabsLogo, SanitasLogo, OakleyCapitalLogo];

export function Partners() {
  return (
    <section className="py-16 border-t border-slate-200/70 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-10 text-center">
          Backed & supported by
        </p>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="marquee-track group-hover:[animation-play-state:paused] flex items-center gap-20 md:gap-32 w-max">
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-20 md:gap-32 shrink-0">
              {logos.map((Logo, i) => (
                <div key={i} className="shrink-0">
                  <Logo />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
