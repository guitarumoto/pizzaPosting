# Instruções para rodar o projeto

### Pré-requisitos
- Node.js instalado
- MySQL instalado e rodando
- npm ou yarn para gerenciamento de pacotes

### O banco de dados utilizado foi o MySQL, as configurações deste se encontram no arquivo '.env'.
### O nome do banco é 'backend', portanto rode o SQL:
#### `CREATE DATABASE backend;`
### Instale as dependências:
#### `npm install`
### Rodar migrations para criação de tabelas:
#### `npx sequelize-cli db:migrate`
### Rode o script para iniciar o servidor:
#### `npm start`
<br><br>

# Teste
Para testar será necessário criar usuários via Postman ou qualquer testador HTTP<br>
## Users <br>
### POST Cadastrar Usuário 
http://localhost:3000/api/user/register<br>
Body: <br>
```json
{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "password": "senha123"
}
```
<br>

### POST Login
http://localhost:3000/api/auth/login<br>
Body: <br>
```json
{
    "email": "email@exemplo.com",
    "password": "senha123"
}
```
<br>

### PUT Atualizar usuário  
http://localhost:3000/api/user/update<br>
Body: <br>
```json
{
  "name": "Novo Nome",
  "email": "segundoemail@exemplo.com",
  "password": "senhanova"
}
```
<br>

## Posts <br>
### POST Criar post 
http://localhost:3000/api/post<br>
Body: (Multipart formdata)<br>
```json
{
  "title": "Pizza de frango",
  "description": "Deliciosa pizza de frango com muito molho",
  "ingredients": "frango, molho",
  "image": FILE.png,
  "price": 59.99,
}
```
<br>

### GET Listar posts 
http://localhost:3000/api/post<br>
Body: (Query Params)<br>
```
ingredients=frango
maxPrice=59
ingredients=frango&maxPrice=59
```
<br>

## Interactions <br>
### POST Comentar post
http://localhost:3000/api/post-interaction/comment<br>
Body:<br>
```json
{
  "content": "Pizza maravilhosa",
  "postId": 1
}
```
<br>

### POST Curtir post 
http://localhost:3000/api/post-interaction/like<br>
Body:<br>
```json
{
  "postId": 1
}
```
<br>

### GET Listar posts 
http://localhost:3000/api/post-interaction/:postId<br>
<br>