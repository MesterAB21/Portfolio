interface TechTagProps {
  label: string;
}

export default function TechTag({ label }: TechTagProps) {
  return (
    <span
      className="inline-flex items-center"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        color: "#C8C8D8",
        padding: "6px 10px",
        borderRadius: "6px",
        whiteSpace: "nowrap",
        letterSpacing: "0.5px"
      }}
    >
      {label}
    </span>
  );
}
