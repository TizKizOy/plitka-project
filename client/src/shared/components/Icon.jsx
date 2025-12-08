const Icon = ({ name, className }) => (
  <img
    src={`/icons/${name}.svg`}
    alt={name}
    className={className}
    decoding="async"
  />
);
export default Icon;
