export default function Filter({ setFilter }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <select
        onChange={(e) => setFilter((f) => ({ ...f, kategori: e.target.value }))}
      >
        <option value="">Semua Kategori</option>
        <option value="Makanan">Makanan</option>
      </select>

      <select
        onChange={(e) => setFilter((f) => ({ ...f, level: e.target.value }))}
      >
        <option value="">Semua Level</option>
        <option value="mudah">Mudah</option>
        <option value="sulit">Sulit</option>
      </select>
    </div>
  );
}
