

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, "super_secret");
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
}