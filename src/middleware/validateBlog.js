// function validateBlog(req, res, next) {
//     const { title, excerpt, body } = req.body;
//     if (!title) return res.status(400).json({ message: "Title is required" });
//     if (!excerpt) return res.status(400).json({ message: "Excerpt is required" });
//     if (!body) return res.status(400).json({ message: "Body is required" });
//     next();
// }

// export default validateBlog;