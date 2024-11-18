import { User } from '../db.js'

const pegar_usuario_funcao = async (req, res) => {
    const id_requisicao = req.params.id;
    console.log('O ID enviado foi: ', id_requisicao);

    try {
        const usuario = await usuario.findByPk(id_requisicao);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
}

const salvar_foto = async (req, res) => {
    const { foto } = req.body
    const { email } = req.params
    try {
        if (!foto) {
            res.status(400).send('o campo deve ser preenchido')
            return
        }
        const usuario = await User.findOne({ where: { email: email } })

        if (!usuario) {
            res.status(404).send('usuario não encontrado')
            return
        }
        await usuario.update({ foto });
        res.status(200).send('foto salva')
    } catch(error) {
        console.log(error)
        res.status(500).send('erro no servidor')
    }
};

export {pegar_usuario_funcao,salvar_foto}

