# Cadastro de Carros

**RF** 
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado com disponibilidade por padrão.
*O cadastro só pode ser efetuado por um usuário administrador.

# Listagem de Carros 

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marcar.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RNF**

**RN**
Deve ser possível listar os carros disponíveis sem fazer login.


# Cadastros de Especificação do Carro

**RF**
Deve ser possível cadastrar uma especificação para um carro.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação mais de uma vês para o mesmo carro.
O cadastro só pode ser efetuado por um usuário administrador.

# Cadastro de imagem do carro 

**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastara mais de uma imagem para o mesmo carro.
O cadastro só pode ser efetuado por um usuário administrador.

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel.


**RN**
O aluguel deve ter duração minima de 24 Hora.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.


<!-- 

  # Como funciona a engenharia de requisitos

  **RF** => Requisitos Funcionais

  São as funções executadas pelo sistema. Ex.: O sistema vai possuir um cadastro de categorias

  **RNF** => Requisitos não Funcionais

  São conceitos não diretamente ligados as regras de negocio da aplicação. Ex.: Qual banco usar, Qual biblioteca usar, ...

  **RN** => Regras de Negocio

  Detalha de que forma os recursos decritos nos requisitos funcionais deverão ser. Ex.: Não será possivel cadastrar duas categorias com o mesmo nome, Não será possivel excluir uma categora em uso. 

-->