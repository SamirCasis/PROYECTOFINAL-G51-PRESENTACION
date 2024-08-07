export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.rol)) {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' })
      }
      next()
    }
  }
  