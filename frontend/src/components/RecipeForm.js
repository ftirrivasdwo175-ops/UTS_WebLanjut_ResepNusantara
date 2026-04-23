import { useState } from "react";

export default function RecipeForm({ addRecipe }) {
  const [nama, setNama] = useState("");
  const [kategori] = useState("Makanan");
  const [level, setLevel] = useState("mudah");

  const [bahan, setBahan] = useState([""]);
  const [langkah, setLangkah] = useState([""]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isBahanValid = bahan.some((b) => b.trim() !== "");
    const isLangkahValid = langkah.some((l) => l.trim() !== "");

    if (!nama.trim()) {
      alert("Nama resep wajib diisi!");
      return;
    }

    if (!isBahanValid) {
      alert("Minimal 1 bahan harus diisi!");
      return;
    }

    if (!isLangkahValid) {
      alert("Minimal 1 langkah harus diisi!");
      return;
    }

    if (!window.confirm("Yakin tambah resep?")) return;

    addRecipe({
      nama,
      kategori,
      level,
      bahan: bahan.filter((b) => b.trim() !== ""),
      langkah: langkah.filter((l) => l.trim() !== ""),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Tambah Resep</h3>

      <input
        placeholder="Nama Resep"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />

      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option value="mudah">Mudah</option>
        <option value="sulit">Sulit</option>
      </select>

      <h4>Bahan</h4>
      {bahan.map((b, i) => (
        <input
          key={i}
          value={b}
          placeholder={`Bahan ${i + 1}`}
          onChange={(e) => {
            const newBahan = [...bahan];
            newBahan[i] = e.target.value;
            setBahan(newBahan);
          }}
        />
      ))}

      <button type="button" onClick={() => setBahan([...bahan, ""])}>
        + Tambah Bahan
      </button>

      <h4>Langkah</h4>
      {langkah.map((l, i) => (
        <input
          key={i}
          value={l}
          placeholder={`Langkah ${i + 1}`}
          onChange={(e) => {
            const newLangkah = [...langkah];
            newLangkah[i] = e.target.value;
            setLangkah(newLangkah);
          }}
        />
      ))}

      <button type="button" onClick={() => setLangkah([...langkah, ""])}>
        + Tambah Langkah
      </button>

      <br />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
}
