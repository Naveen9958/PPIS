function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.05)",
        backdropFilter: "blur(15px)",
        borderRadius: "20px",
        padding: "25px",
        width: "250px",
        border: "1px solid rgba(255,255,255,.1)",
        boxShadow: "0 0 20px rgba(0,229,255,.2)",
      }}
    >
      <h3>{title}</h3>

      <h1
        style={{
          color: "#00e5ff",
          marginTop: "10px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatCard;