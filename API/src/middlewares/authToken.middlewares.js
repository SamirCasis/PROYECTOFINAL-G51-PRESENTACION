import { jwtCheck } from "../utils/jwt.js"

export const tokenVerify = (req, res, next) => {
    const authorization = req.header('Authorization')

    if (authorization === undefined) {
        return res.status(401).json({ message: 'error al consultar token' })
    }

    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer') {
        return res.status(401).json({ message: 'formato del token invalido' })
    }

    try {
        jwtCheck(token) && next ()
    } catch (error) {
        console.log(error.message)
        res.status(401).json({ message: 'token invalido' })
    }
}

