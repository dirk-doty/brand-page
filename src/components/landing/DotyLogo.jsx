const LOGO_URL = '/images/logo-light.jpg';

const sizes = {
  sm: 100,
  md: 160,
  lg: 260,
};

export default function DotyLogo({ color = 'cream', size = 'md' }) {
  return (
    <img
      src={LOGO_URL}
      alt="Dad of the Year"
      width={sizes[size]}
      style={{
        filter: color === 'cream' ? 'brightness(0) invert(1)' : 'none',
        display: 'block',
      }}
    />
  );
}