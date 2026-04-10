interface TechTagProps {
  label: string;
}

export default function TechTag({ label }: TechTagProps) {
  return (
    <span
      className="inline-flex items-center"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        background: "#2A2A38",
        color: "#5A5A6E",
        padding: "4px 8px",
        borderRadius: "4px",
        whiteSpace: "nowrap"
      }}
    >
      {label}
    </span>
  );
}
