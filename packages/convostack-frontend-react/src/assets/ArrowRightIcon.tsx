interface ArrowRightIconProps {
  className?: string;
  color?: string;
}

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({
  className,
  color = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={color}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

export default ArrowRightIcon;
