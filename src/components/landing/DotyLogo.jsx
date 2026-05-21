const LOGO_URL = 'https://media.base44.com/images/public/69c16483a7b91a894b0cd8c7/6a79c98eb_DOTY_Primary-Logo_1-C_Pine2x.jpg';

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