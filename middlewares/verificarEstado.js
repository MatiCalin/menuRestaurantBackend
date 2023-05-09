const verificarEstado = (req, res, next) => {
  const active = req.body.active;

  if (active === false) {
    return res.status(401).json({
      ok: false,
      msg: 'El usuario se encuentra bloqueado. Por favor, contacte al administrador',
    });
  }

  next();
};

module.exports = {
  verificarEstado,
};
