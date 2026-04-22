const notFoundUser = (req, res, next) => {
  res.status(404).json({ message: "User not found" });
};
export default notFoundUser;
