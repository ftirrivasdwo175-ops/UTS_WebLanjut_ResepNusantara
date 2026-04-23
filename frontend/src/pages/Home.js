import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import Filter from "../components/Filter";
import Modal from "../components/Modal";
import RecipeForm from "../components/RecipeForm";
import "../App.css";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState({ kategori: "", level: "" });
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch("http://localhost:3000/api/resepUMKM")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal mengambil data!");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handleDelete = (id) => {
    if (!window.confirm("Yakin mau hapus resep ini?")) return;

    fetch(`http://localhost:3000/api/resepUMKM/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Resep berhasil dihapus!");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal hapus resep!");
      });
  };

  const filtered = recipes.filter((r) => {
    return (
      (!filter.kategori || r.kategori === filter.kategori) &&
      (!filter.level || r.level === filter.level)
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container">
      <h1>Resep Nusantara Premium</h1>

      <button onClick={() => setShowModal(true)}>+ Tambah Resep</button>

      <Filter setFilter={setFilter} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid">
            {paginatedData.length > 0 ? (
              paginatedData.map((r) => (
                <RecipeCard key={r.id} recipe={r} onDelete={handleDelete} />
              ))
            ) : (
              <p>Tidak ada data</p>
            )}
          </div>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <span>Page {currentPage}</span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={startIndex + itemsPerPage >= filtered.length}
            >
              Next
            </button>
          </div>
        </>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <RecipeForm
            addRecipe={(data) => {
              fetch("http://localhost:3000/api/resepUMKM", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then((res) => res.json())
                .then(() => {
                  alert("Berhasil tambah resep!");
                  fetchData();
                  setShowModal(false);
                })
                .catch((err) => {
                  console.log(err);
                  alert("Gagal tambah resep!");
                });
            }}
          />
        </Modal>
      )}
    </div>
  );
}
