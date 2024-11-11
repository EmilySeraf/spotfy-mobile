import {User} from '../db.js'


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

export {pegar_usuario_funcao}

