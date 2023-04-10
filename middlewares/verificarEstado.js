const verificarEstado = (req, res, next) => {
  // Suponiendo que el estado del usuario se almacena en el objeto req.user
  const active = req.body.active;

  // Si el estado del usuario es false, no permitimos el acceso y enviamos un mensaje de error
  if (active === false) {
    return res.status(401).json({
      ok: false,
      msg: 'El usuario se encuentra bloqueado. Por favor, contacte al administrador',
    });
  }

  // Si el estado del usuario es true o no se especifica, permitimos el acceso y continuamos con la ejecución del siguiente middleware o controlador
  next();
};

module.exports = {
  verificarEstado,
};
