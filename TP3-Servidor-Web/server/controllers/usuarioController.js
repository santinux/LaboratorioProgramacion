

const usuarioService = require('../services/usuarioService');

// Comprobar que el cuerpo sea un objeto JSON
function cuerpoValido(cuerpo) {
    return cuerpo !== null &&
        typeof cuerpo === 'object' &&
        !Array.isArray(cuerpo);
}

/////////////////////////////// GET //////////////////////////////////

// Obtener usuarios paginados
async function obtenerUsuarios(req, res) {
    try {
        const cantidad = req.query.cantidad === undefined
            ? 10
            : Number(req.query.cantidad);

        const from = req.query.from === undefined
            ? 0
            : Number(req.query.from);

        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            return res.status(400).json({
                error: 'La cantidad debe ser un entero mayor que cero'
            });
        }

        if (!Number.isInteger(from) || from < 0) {
            return res.status(400).json({
                error: 'El parámetro from debe ser un entero mayor o igual a cero'
            });
        }

        const usuarios = await usuarioService.obtenerUsuarios(cantidad, from);

        return res.status(200).json(usuarios);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al obtener los usuarios'
        });
    }
}

// Obtener usuario por ID
async function obtenerUsuarioPorId(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'El ID debe ser un entero positivo'
            });
        }

        const usuario = await usuarioService.obtenerUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        return res.status(200).json(usuario);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al obtener el usuario'
        });
    }
}

/////////////////////////////// POST //////////////////////////////////

// Registrar usuario
async function crearUsuario(req, res) {
    try {
        if (!cuerpoValido(req.body)) {
            return res.status(400).json({
                error: 'Debe enviar un objeto JSON válido'
            });
        }

        const { nombre, password } = req.body;

        if (typeof nombre !== 'string' || nombre.trim() === '') {
            return res.status(400).json({
                error: 'El nombre es obligatorio y debe ser un texto'
            });
        }

        if (typeof password !== 'string' || password.length < 6) {
            return res.status(400).json({
                error: 'La contraseña debe tener al menos 6 caracteres'
            });
        }

        const nuevoUsuario = {
            nombre: nombre.trim(),
            password
        };

        const usuarioCreado = await usuarioService.crearUsuario(nuevoUsuario);

        if (!usuarioCreado) {
            return res.status(409).json({
                error: 'El nombre de usuario ya está registrado'
            });
        }

        return res.status(201).json(usuarioCreado);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al crear el usuario'
        });
    }
}

/////////////////////////////// LOGIN ////////////////////////////////

async function iniciarSesion(req, res) {
    try {
        if (!cuerpoValido(req.body)) {
            return res.status(400).json({
                error: 'Debe enviar un objeto JSON válido'
            });
        }

        const { nombre, password } = req.body;

        if (typeof nombre !== 'string' || nombre.trim() === '') {
            return res.status(400).json({
                error: 'El nombre es obligatorio'
            });
        }

        if (typeof password !== 'string' || password.length === 0) {
            return res.status(400).json({
                error: 'La contraseña es obligatoria'
            });
        }

        const usuario = await usuarioService.iniciarSesion(
            nombre.trim(),
            password
        );

        if (!usuario) {
            return res.status(401).json({
                error: 'Nombre o contraseña incorrectos'
            });
        }

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            usuario
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al iniciar sesión'
        });
    }
}

/////////////////////////////// PUT ///////////////////////////////////

async function actualizarUsuario(req, res) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'El ID debe ser un entero positivo'
            });
        }

        if (!cuerpoValido(req.body)) {
            return res.status(400).json({
                error: 'Debe enviar un objeto JSON válido'
            });
        }

        const { nombre, password } = req.body;

        if (nombre === undefined && password === undefined) {
            return res.status(400).json({
                error: 'Debe enviar al menos un dato para actualizar'
            });
        }

        if (nombre !== undefined &&
            (typeof nombre !== 'string' || nombre.trim() === '')) {
            return res.status(400).json({
                error: 'El nombre debe ser un texto no vacío'
            });
        }

        if (password !== undefined &&
            (typeof password !== 'string' || password.length < 6)) {
            return res.status(400).json({
                error: 'La contraseña debe tener al menos 6 caracteres'
            });
        }

        const datosActualizados = {};

        if (nombre !== undefined) {
            datosActualizados.nombre = nombre.trim();
        }

        if (password !== undefined) {
            datosActualizados.password = password;
        }

        const usuario = await usuarioService.actualizarUsuario(
            id,
            datosActualizados
        );

        if (usuario === null) {
            return res.status(404).json({
                error: 'Usuario no encontrado'
            });
        }

        if (usuario === false) {
            return res.status(409).json({
                error: 'El nombre de usuario ya está registrado'
            });
        }

        return res.status(200).json(usuario);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al actualizar el usuario'
        });
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    iniciarSesion,
    actualizarUsuario
};
