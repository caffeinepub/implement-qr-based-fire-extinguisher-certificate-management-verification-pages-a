interface ServiceIconProps {
  index: number;
  alt: string;
  className?: string;
}

export function ServiceIcon({ index, alt, className = '' }: ServiceIconProps) {
  // Grid is 3x3, each icon is 512x256 in a 1536x768 image
  const cols = 3;
  const iconWidth = 512;
  const iconHeight = 256;
  
  const row = Math.floor(index / cols);
  const col = index % cols;
  
  const x = col * iconWidth;
  const y = row * iconHeight;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        width: '64px',
        height: '64px',
      }}
    >
      <img
        src="/assets/generated/service-icons-grid.dim_1536x768.png"
        alt={alt}
        className="absolute"
        style={{
          width: '1536px',
          height: '768px',
          objectFit: 'none',
          objectPosition: `-${x}px -${y}px`,
          transform: 'scale(0.125)',
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
}
