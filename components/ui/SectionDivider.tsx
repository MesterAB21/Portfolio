export default function SectionDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "64px" }}>
      <div
        data-animate="divider-line"
        style={{
          flex: 1,
          height: "1px",
          background: "linear-gradient(90deg, transparent, #2A2A38 20%, #7F77DD 50%, #2A2A38 80%, transparent)",
          transformOrigin: "left center",
        }}
      />
      <div 
        style={{ 
          width: "6px", height: "6px", borderRadius: "50%", background: "#7F77DD",
          boxShadow: "0 0 12px rgba(127,119,221,0.6)",
          animation: "pulse 2s ease-in-out infinite" 
        }} 
      />
      <div
        data-animate="divider-line"
        style={{
          flex: 1,
          height: "1px",
          background: "linear-gradient(90deg, transparent, #2A2A38 20%, #7F77DD 50%, #2A2A38 80%, transparent)",
          transformOrigin: "right center",
        }}
      />
    </div>
  );
}
