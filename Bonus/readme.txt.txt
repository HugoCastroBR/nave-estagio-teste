Cada função no index.js tem uma responsibilidade

Antes de tudo é necessario passar os dados do banco de dados( aqui utilizado mysql ) no connect.js
Feito isso rode um npm install na pasta.

Funcionamento:

rode com npm start
ele ira ficar escutando cada modificação no codigo

Por padrão ele ja cria a BD ao rodar
Se quiser que ele exclua as tabelas bastar subistuir na linha 7 o  this.criarBD() para a funcão que preferir
sendo elas :

ExcluirBD() - Exclui todas as tables
criarBD() - Cria todas as tables
Adicionar(item, table) - cria items, passe o item que deseja criar( objeto ) e a table que deseja adicionar (todos os campos são os pedidos)
Deletar(id,table) - deleta items, passe o id do tem que deseja deletar e a table que deseja


.