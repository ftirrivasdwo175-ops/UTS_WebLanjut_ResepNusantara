module.exports = (req, res, next) => {
  const { bahan, langkah } = req.body;

  if (!bahan || bahan.length < 1) {
    return res.status(400).json({ message: "Minimal 1 bahan!" });
  }

  if (!langkah || langkah.length < 1) {
    return res.status(400).json({ message: "Minimal 1 langkah!" });
  }

  next();
};
