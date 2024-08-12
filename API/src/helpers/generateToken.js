import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_KEY

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, secretKey, { expiresIn: '2m' })
}

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) return res.status(403).json({ error: 'Token requerido' })

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token inválido' })
    req.userId = decoded.id
    next()
  })
}
