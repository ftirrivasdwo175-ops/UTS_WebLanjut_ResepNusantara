export default function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h3 style={{ margin: 0 }}>Tambah Resep</h3>
          <button
            onClick={onClose}
            style={{
              background: "red",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              padding: 0,
            }}
          >
            X
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
