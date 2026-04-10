interface SectionLabelProps {
  text: string;
}

export default function SectionLabel({ text }: SectionLabelProps) {
  return (
    <p 
      style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: "11px",
        letterSpacing: "0.12em",
        color: "#5A5A6E",
        textTransform: "uppercase",
        marginBottom: "16px"
      }}
    >
      {text}
    </p>
  );
}
