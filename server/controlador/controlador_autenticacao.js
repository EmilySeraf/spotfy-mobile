app.post('/registro', async function(req,res) {
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
    }
})