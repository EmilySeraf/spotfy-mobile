import { User } from '../db.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registro_funcao = async function(req,res) {
    try{
        const{nome, sobrenome, email, senha, dataNascimento} = req.body
        if(! nome || ! sobrenome || ! email || ! senha || ! dataNascimento){
            res.status(406).send('Todos os campos devem ser enviados!')
        }

        if(await User.findOne({where:{email:email}})){
            res.status(400).send('usuário ja existente no sistema')
            return
        }
        const senhaSegura = bcryptjs.hashSync(senha, 10)
        const novoUsuario = User.create ({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            senha: senhaSegura,
            dataNascimento: dataNascimento
        })
        res.status(201).send('ok, usuario criado')
    }catch(erro){
        console.log(erro)
        res.status(500).send('Erro no servidor')
    }
}

const login_funcao = async function (req, res) {
    
        try {
            const { email, senha } = req.body
            if (!email || !senha) {
                res.status(406).send('todos os campos devem ser preenchidos')
                return
            }
            const usuario = await User.findOne({ where: { email: email } })
            if (!usuario) {
                res.status(404).send('este usuario não está cadastrado')
                return
            }
            const senhaCorreta = bcryptjs.compareSync(senha, usuario.senha)
            if(!senhaCorreta) {
                res.status(403).send('senha incorreta')
                return
            }
            const token = jwt.sign(
                {
                    nome:usuario.nome,
                    email: usuario.email,
                    status: usuario.status
                },
                'chavecriptografiasupersegura',
                {
                    expiresIn: "30d"
                }
            )

            console.log(token) 
    
            res.status(200).send({msg: 'voce foi logado', token: token, userInfo: usuario})
            
    } catch (erro) {
            console.log(erro)
            res.status(500).send('houve um problema')
        }
}

const change_password = async(req, res) => {
    const user_id = req.params.id
    const nova_senha = req.body.novaSenha
    if (!nova_senha) {
        res.status(400).send('Todos os campos devem ser preenchidos')
        return
    }
    const user = await User.findOne({where:{id: user_id}})
    if(!user){
        res.status(404).send('User Not Found')
        return
    }
    const senhaCriptografada = bcryptjs.hashSync(nova_senha, 10)
    user.senha = senhaCriptografada
    await user.save()
    res.status(200).send(user)
}


export {registro_funcao,login_funcao, change_password}