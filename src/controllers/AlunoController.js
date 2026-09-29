const alunoService = require("../services/AlunoService");

class AlunoController{

    async findMany(request, response){
        let {page, pageSize, orderBy, order} = request.query;
        page ||= 1;
        pageSize ||= 10;
        orderBy ||= "id";
        order ||= "asc";

        if(order !== "asc" && order !== "desc"){
            order = "asc";
        }


        const result = await alunoService.findMany(page, pageSize, orderBy, order);
        return response.status(200).json(result);
    }

    async findById(request, response){
        try{
            const aluno = await alunoService.findById(request.params.id);
            return response.status(200).json({aluno});
        }catch(e){
            return response.status(e.statusCode).json({error: e.message});
        }
    }

    async update(request, response){
        try{
            const aluno = await alunoService.update(request.params.id, request.body);
            return response.status(200).json({aluno});
        }catch(e){
            if(e.code ==="P2002"){
                return response.status(400).json({error: "E-mail ja cadastrado"});
            }
            return response.status(e.statusCode).json({error: e.message});
        }
    }

    async delete(request, response){
        try{
            const aluno = await alunoService.delete(request.params.id);
            return response.status(200).json({aluno});
        }catch(e){
            return response.status(e.statusCode).json({error: e.message});
        }
    }

    async create(request, response){
        try{
            const aluno = await alunoService.create(request.body);
            return response.status(201).json({aluno});
        }catch(e){
            return response.status(e.statusCode).json({error: e.message});
        }
    }
}

module.exports = new AlunoController();