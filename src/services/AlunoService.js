const prisma = require("../databases/prisma");
const AlunoInvalidoError = require("../errors/AlunoInvalidoError");

class AlunoService{

    async findMany(page, pageSize, orderBy, order){
        //SELECT * FROM alunos
        const alunos = await prisma.aluno.findMany({
            skip: (page-1)*pageSize,
            take: Number(pageSize),
            orderBy: {
                [orderBy]: order
            }
        });
        
        const total = await prisma.aluno.count();
        return {alunos, total};
    }

    async findById(id) {
        const aluno = await prisma.aluno.findUnique({
            where: {
                id: Number(id)
            }
        });

        if(!aluno){
            const AlunoNaoEncontradoError = require("../errors/AlunoNaoEncontradoError");
            throw new AlunoNaoEncontradoError();
        }

        return aluno;
    }

    async update(id, dados) {
        const aluno = await prisma.aluno.findUnique({
            where: {
                id: Number(id)
            }
        });

        if(!aluno){
            const AlunoNaoEncontradoError = require("../errors/AlunoNaoEncontradoError");
            throw new AlunoNaoEncontradoError();
        }

        const {nome, email} = dados;

        if(!nome && !email){
            throw new AlunoInvalidoError("Nome e Email são Obrigatórios", 400);
        }

        const dadosAtualizacao = {};

        if(nome){
            dadosAtualizacao.nome = nome;
        }
        if(email){
            dadosAtualizacao.email = email;
        }

        const alunoAtualizado = await prisma.aluno.update({
            where: {
                id: Number(id)
            },
            data: dadosAtualizacao
        });

        return alunoAtualizado;
    }



    async create(aluno){
        const {nome, email} = aluno;
        if(!nome || !email){
            throw new AlunoInvalidoError();
        }
        //create = insert
        //update = update
        //delete = delete
        //findMany = select * from
        const novoAluno = await prisma.aluno.create({data:aluno});

        return novoAluno;
    }
}

module.exports = new AlunoService();