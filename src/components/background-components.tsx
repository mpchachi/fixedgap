"use client";

export function BackgroundComponents() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      {/* Base white */}
      <div className="absolute inset-0 bg-white" />

{/* Dot pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.12) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  );
}
