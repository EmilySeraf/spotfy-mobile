import express from 'express'
import { registro_funcao, login_funcao, change_password } from '../controlador/controlador_autenticacao.js'

const rotas_autenticacao = express.Router()

rotas_autenticacao.post('/registro', registro_funcao)
rotas_autenticacao.post('/login', login_funcao)
rotas_autenticacao.put('/change-password/:id', change_password)


export { rotas_autenticacao }