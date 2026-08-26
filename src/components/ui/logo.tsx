import Image from 'next/image';

/**
 * FixedGap brand mark - the FG monogram (logonuevo.jpeg).
 * The source image is a navy square, so we round the corners here.
 */
export default function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <Image
      src="/logonuevo.jpeg"
      alt="FixedGap"
      width={32}
      height={32}
      className={`${className} rounded-lg object-contain`}
    />
  );
}
