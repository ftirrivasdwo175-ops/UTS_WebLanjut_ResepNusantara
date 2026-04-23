import { useState } from "react";

export default function RecipeCard({ recipe, onDelete }) {
  const [show, setShow] = useState(false);

  return (
    <div className="card">
      <h3>{recipe.nama}</h3>

      <p>🍴 {recipe.kategori}</p>
      <p> Level: {recipe.level}</p>

      <button onClick={() => setShow(!show)}>
        {show ? "Tutup Detail" : "Lihat Detail"}
      </button>

      <div className={`accordion ${show ? "open" : ""}`}>
        <ul>
          {JSON.parse(recipe.langkah).map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>

      <button className="delete-btn" onClick={() => onDelete(recipe.id)}>
        Hapus
      </button>
    </div>
  );
}
