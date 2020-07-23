# wallet

It is a application with react-native and expo that to create transations and visualize itself at the dashboard.

# Development

- Projeto
  - [x] Criar projeto
  - [x] Criar projeto backend
  - [x] Criar projeto frontend
  - [x] Colocar projeto no github
  - [x] Criar readme
  - [x] Configurar CI
- Lançar transação
  - [x] Backend > instalar libs para os testes
  - [x] Backend > configurando do jest
  - [x] Backend > configurar o sqlite
  - [x] Backend > definir o modelo de dados da transação
  - [x] Backend > criar a migration que gera a tabela no banco de dados de acordo com o modelo de dados
  - [x] Backend > rodar as migrations
  - [x] Backend > criar e rodar as seeds
  - [x] Backend > configurar ambiente de teste para a base de dados
  - [x] Backend > Criar um teste da rota de que salva transação
  - [x] Backend > Adicionar uma nova coluna data na tabela transactions
  - [x] Backend > Transactions resolver problema do balance será estático ou calculado? (calculado)
  - [x] Backend > criar uma rota para salvar transação
  - [x] Backend > Criar um teste que insere uma transação receita
  - [x] Backend > Criar um teste que insere uma transação despesa
  - [x] Backend > Criar um teste que insere uma transação despesa com multiplas parcelas
  - [ ] Frontend > Criar a view home
    - [ ] escolher o logo
    - [ ] preparar o logo
    - [ ] adicionar o logo
  - [x] Frontend > Criar uma view para salvar a transação
    - [x] organizando o projeto criando pastas e rotas
    - [x] criando componentes home e transactions sem implementação
    - [x] criando o formulário e adicionando os inputs
      - [x] criado o select de tipo de transação
      - [x] adicionado o datepicker para selecionar a data
      - [x] removendo datepicker e usando o textinput para data
      - [x] trocar os tipo de data de number para string
      - [x] carregar a lista de tags
      - [x] criar o controle para selecionar as tags
      - [x] add um scroll na view
      - [x] adicionando alguns labels
      - [x] corrigir warnings lançados pelo picker
    - [x] criar a função para salvar a transação
      - [x] criar função de payload
      - [x] criar função que valida o payload
      - [x] criar função que envia o payload
      - [x] criar o callbacks de sucesso e erro
    - [x] buscar as tags da base de dados
    - [x] ajustando os estilos
- Listar transações
  - [x] Backend > criar testes para a rota de listagem de transações
  - [x] Backend > Criar a rota de listagem de transações
  - [ ] Frontend > Criar testes para a view de listagem de transações
  - [ ] Frontend > Criar a view de listagem de transações
  - [ ] Integrar a view com a rota
- Painel de transações
