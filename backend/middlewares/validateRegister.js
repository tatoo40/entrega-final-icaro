const { body, validationResult } = require("express-validator");



const validateRegister = [
  body('email')
    .notEmpty()
    .withMessage('Debes completar el campo email')
    .bail()
    .isEmail()
    .withMessage('Debes ingresar un email válido'),
  body('password')
    .notEmpty()
    .withMessage('Debes ingresar una contraseña válida'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    next();
  },
];


module.exports = validateRegister;