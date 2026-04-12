interface Props {
  percent: number;
}

const ProgressBar = ({ percent }: Props) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 h-0.5"
      style={{ backgroundColor: "var(--surface-muted)" }}
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${percent}%`,
          backgroundColor: "var(--accent-brand)",
        }}
      />
    </div>
  );
};

export default ProgressBar;
