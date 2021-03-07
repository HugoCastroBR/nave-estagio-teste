# nave-estagio-teste
### Teste de Logica:
### https://codesandbox.io/s/teste-estagio-template-forked-ih6xc

# Mini documentação uso API

## Preparação:

### Ambiente

Node: v14.4.0

Npm: 6.14.5

MYSQL WORKBENCH: 8.0.22

MYSQL SERVER.

Biblitoecas nodes em Package.json


### Instalação



Na pasta raiz (./API), rodar npm install

configurar o connect.js de acordo com seu banco de dados


Obs: Criar Banco de dados com nome "nav"

isso pode ser modificado em connect.js

### Rodando
Na pasta raiz (./API):

Rodar com npm start 

Em caso de erro executar node index.js

## Uso:

Foi utilizado diversas boas praticas para uma api RESTful, 
uma delas simplifica as rotas.

Toda a API aceita JSON e retorna JSON.

### Rotas navers
#### (index):

metodo: GET

Rota: http://localhost:3000/navers

Retorno Esperado:

Lista em JSON com todos os navers

#### (Show):

metodo: GET

Rota: http://localhost:3000/navers/id => onde id é o id do naver

Retorno Esperado:

JSON com o naver e seus projetos, porem caso o naver não tenha projetos não sera retornado o atributo projetos no JSON.


#### (STORE):

metodo: POST

body: 

passar os seguintes valores 
{ name: "",
  birthdate: AAAA-MM-DD,
  admission_date: AAAA-MM-DD,
  job_role: "",
  projects: 0,
}

Caso nenhum project não passe o atributo projects!

Exemplo:
{ name: Ciclano,
  birthdate: 1998-06-12,
  admission_date: 2018-06-12,
  job_role: Desenvolvedor,
  projects: 5,6
}

Exemplo Sem projetos:
{ name: Ciclano,
  birthdate: 1998-06-12,
  admission_date: 2018-06-12,
  job_role: Desenvolvedor
}

Rota: http://localhost:3000/navers

Retorno Esperado:

results em JSON e status 201 !


### Rotas projetos

#### (index):

metodo: GET

Rota: http://localhost:3000/projects

Retorno Esperado:

Lista em JSON com todos os projetos

#### (Show):

metodo: GET

Rota: http://localhost:3000/projects/id => onde id é o id do projeto

Retorno Esperado:

JSON com o projeto e seus navers, porem caso o projeto não tenha navers não sera retornado o atributo navers no JSON.


#### (STORE):

metodo: POST

body: { 
  name: "",
  navers: 0,0
}

se não tiver navers, não passar atributo navers

Exemplo: 
body: { 
  name: melhor projeto,
  navers: 1,5
}

Exemplo sem navers:

body: { 
  name: ""
}

Retorno esperado:
JSON com results e status 201,
