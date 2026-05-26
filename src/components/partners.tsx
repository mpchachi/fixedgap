import Image from "next/image";

function AwsLogo() {
  return (
    <Image
      src="/sponsors/aws.png"
      alt="AWS"
      width={80}
      height={48}
      className="h-11 w-auto object-contain transition-all duration-300 hover:scale-105"
    />
  );
}

function SaturnoLabsLogo() {
  return (
    <Image
      src="/sponsors/saturno.png"
      alt="SaturnoLabs"
      width={100}
      height={48}
      className="h-11 w-auto object-contain transition-all duration-300 hover:scale-105"
    />
  );
}



function AyuntamientoMadridLogo() {
  return (
    <Image
      src="/sponsors/Ayuntamiento_Madrid.jpg"
      alt="Ayuntamiento de Madrid"
      width={100}
      height={48}
      className="h-11 w-auto object-contain transition-all duration-300 hover:scale-105"
    />
  );
}

function RealColegioComplutenseLogo() {
  return (
    <Image
      src="/sponsors/Real_Colegio_Complutense.png"
      alt="Real Colegio Complutense at Harvard University"
      width={100}
      height={48}
      className="h-11 w-auto object-contain transition-all duration-300 hover:scale-105"
    />
  );
}

function BupaLogo() {
  return (
    <Image
      src="/sponsors/Bupa.jpeg"
      alt="Bupa"
      width={80}
      height={48}
      className="h-11 w-auto object-contain transition-all duration-300 hover:scale-105"
    />
  );
}

function UniversidadComplutenseLogo() {
  return (
    <Image
      src="/sponsors/Universidad_Complutense.png"
      alt="Universidad Complutense de Madrid"
      width={100}
      height={48}
      className="h-11 w-auto object-contain transition-all duration-300 hover:scale-105"
    />
  );
}

function ComunidadMadridLogo() {
  return (
    <Image
      src="/sponsors/ComunidadMadrid.png"
      alt="Comunidad de Madrid"
      width={100}
      height={48}
      className="h-11 w-auto object-contain transition-all duration-300 hover:scale-105"
    />
  );
}

function BoschLogo() {
  return (
    <Image
      src="/sponsors/BoschDefinitivo.png"
      alt="Bosch"
      width={100}
      height={48}
      className="h-11 w-auto object-contain transition-all duration-300 hover:scale-105"
    />
  );
}

function BoschUCMLogo() {
  return (
    <Image
      src="/sponsors/Bosch_UCM.jpeg"
      alt="Bosch UCM"
      width={100}
      height={48}
      className="h-11 w-auto object-contain transition-all duration-300 hover:scale-105"
    />
  );
}

const logos = [AwsLogo, SaturnoLabsLogo, AyuntamientoMadridLogo, RealColegioComplutenseLogo, BupaLogo, UniversidadComplutenseLogo, ComunidadMadridLogo, BoschLogo, BoschUCMLogo];

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
