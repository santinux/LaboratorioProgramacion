
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');

const rutaArchivo = path.join(__dirname, '../data/usuarios.json');

// Funciones auxiliares
async function leerUsuarios() {
    const contenido = await fs.readFile(rutaArchivo, 'utf-8');
    const usuarios = JSON.parse(contenido);

    if (!Array.isArray(usuarios)) {
        throw new Error('El archivo de usuarios tiene un formato inválido');
    }

    return usuarios;
}

async function guardarUsuarios(usuarios) {
    await fs.writeFile(
        rutaArchivo,
        JSON.stringify(usuarios, null, 2),
        'utf-8'
    );
}

function normalizarNombre(nombre) {
    return nombre.trim().toLowerCase();
}

function usuarioPublico(usuario) {
    return {
        id: usuario.id,
        nombre: usuario.nombre
    };
}

/////////////////////////////// GET //////////////////////////////////

// Obtener usuarios paginados
async function obtenerUsuarios(cantidad, from) {
    const usuarios = await leerUsuarios();

    return usuarios
        .slice(from, from + cantidad)
        .map(usuarioPublico);
}

// Obtener un usuario por ID
async function obtenerUsuarioPorId(id) {
    const usuarios = await leerUsuarios();

    const usuario = usuarios.find(usuario => usuario.id === id);

    return usuario ? usuarioPublico(usuario) : null;
}

/////////////////////////////// POST /////////////////////////////////

// Crear un usuario
async function crearUsuario(nuevoUsuario) {
    const usuarios = await leerUsuarios();

    const nombre = nuevoUsuario.nombre.trim();

    const existe = usuarios.some(
        usuario => normalizarNombre(usuario.nombre) === normalizarNombre(nombre)
    );

    if (existe) {
        return null;
    }

    const passwordHash = await bcrypt.hash(nuevoUsuario.password, 10);

    const nuevoId = usuarios.reduce(
        (max, usuario) => Math.max(max, usuario.id),
        0
    ) + 1;

    const usuarioCreado = {
        id: nuevoId,
        nombre,
        password: passwordHash
    };

    usuarios.push(usuarioCreado);

    await guardarUsuarios(usuarios);

    return usuarioPublico(usuarioCreado);
}

/////////////////////////////// LOGIN ////////////////////////////////

async function iniciarSesion(nombre, password) {
    const usuarios = await leerUsuarios();

    const usuario = usuarios.find(
        usuario => normalizarNombre(usuario.nombre) === normalizarNombre(nombre)
    );

    if (!usuario) {
        return null;
    }

    const coincide = await bcrypt.compare(password, usuario.password);

    if (!coincide) {
        return null;
    }

    return usuarioPublico(usuario);
}

/////////////////////////////// PUT ///////////////////////////////////

async function actualizarUsuario(id, datosActualizados) {
    const usuarios = await leerUsuarios();

    const indice = usuarios.findIndex(usuario => usuario.id === id);

    if (indice === -1) {
        return null;
    }

    const cambios = { ...datosActualizados };

    if (cambios.nombre !== undefined) {
        cambios.nombre = cambios.nombre.trim();

        const existe = usuarios.some(usuario =>
            usuario.id !== id &&
            normalizarNombre(usuario.nombre) === normalizarNombre(cambios.nombre)
        );

        if (existe) {
            return false;
        }
    }

    if (cambios.password !== undefined) {
        cambios.password = await bcrypt.hash(cambios.password, 10);
    }

    usuarios[indice] = {
        ...usuarios[indice],
        ...cambios
    };

    await guardarUsuarios(usuarios);

    return usuarioPublico(usuarios[indice]);
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    iniciarSesion,
    actualizarUsuario
};

 

