interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = 'h-12 w-12' }: BrandLogoProps) {
  return (
    <img
      src="/assets/generated/shree-fire-works-logo.dim_512x512.png"
      alt="SHREE FIRE WORKS Logo"
      className={className}
    />
  );
}
