import { Tooltip } from "react-tooltip";

function ContainerTooltip() {
  return (
    <>
      {/* Tooltip */}
      <Tooltip
        id="#1"
        place="top"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          color: "#fff",
          borderRadius: "4px",
          padding: "5px 8px",
          fontSize: "0.875rem", // equivalente a 14px
          boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
          maxWidth: "200px",
          textAlign: "center",
        }}
      />
    </>
  );
}

export default ContainerTooltip;
