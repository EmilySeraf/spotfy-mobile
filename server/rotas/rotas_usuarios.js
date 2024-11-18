import express from 'express'
import { pegar_usuario_funcao, salvar_foto } from '../controlador/controlador_usuarios.js'

const rotas_usuarios = express.Router()

rotas_usuarios.get('/:email', pegar_usuario_funcao)
rotas_usuarios.post('/:email/salvar_foto', salvar_foto)


export { rotas_usuarios }