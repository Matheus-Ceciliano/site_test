import { useState } from 'react';

type ProgressiveImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
};

export function ProgressiveImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={`image-frame ${loaded ? 'image-frame--loaded' : ''} ${className}`}>
      {!loaded && <span className="image-frame__skeleton" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
}
