type SlashProps = React.SVGAttributes<SVGElement>;

const Slash = (props: SlashProps) => {
  return (
    <svg
      width="10"
      height="18"
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0.5 18V15.0413L6.32456 0H9.5V3.05785L3.69298 18H0.5Z" />
    </svg>
  );
};

export { Slash };
