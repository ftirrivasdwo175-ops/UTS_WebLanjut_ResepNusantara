const db = require("../config/db");

exports.getAllResep = (req, res) => {
  const sql = "SELECT * FROM resep";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.createResep = (req, res) => {
  const { nama, kategori, level, bahan, langkah } = req.body;

  const sql = `
    INSERT INTO resep (nama, kategori, level, bahan, langkah)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nama, kategori, level, JSON.stringify(bahan), JSON.stringify(langkah)],
    (err, result) => {
      if (err) {
        console.log("ERROR INSERT:", err);
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Resep berhasil ditambahkan",
      });
    },
  );
};

exports.deleteResep = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM resep WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("ERROR DELETE:", err);
      return res.status(500).json(err);
    }

    res.json({ message: "Resep berhasil dihapus" });
  });
};
