import jwt from 'jsonwebtoken'

const JWT_KEY = process.env.JWT_KEY

export const jwtSign = (payload, expiresIn = '2m') => jwt.sign(payload, JWT_KEY, { expiresIn })

export const jwtCheck = (token) => jwt.verify(token, JWT_KEY)

export const jwtDecode = (token) => jwt.decode(token.split("Bearer ")[0])
