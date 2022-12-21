# Projeto fullstack de estudos
Projeto de um app para auxiliar em restaurantes, divido em um app mobile que fica com o garçom no qual ele vai em cada mesa e anota os pedidos de cada cliente e envia o pedido através do backend para o app frontend que fica na cozinha. Lá eles olham os pedidos e pra quais mesas são cada pedido e vai só mudando o status se o pedido ta sendo preparado, se está em espera, ou seja foi finalizado.

### Link para a aplicação web:
`https://waiter-app-virid.vercel.app/`

# Tecnologias usadas
* Typescript foi usado em tudo, front, back e mobile.
* EsLint também para deixar o código todo mais padronizado e organizado.

### BACKEND:
* Express
* O banco de dados foi o mongo só que com docker 
* Mongoose para fazer as interações entre o back e o mongo
* Foi usado multer também pra poder receber imagens nas requisições pro backend


### FRONTEND:
* React
* Axios para fazer requisições para o backend
* Styled-components para fazer os estilos.
* toastify para criar aquelas caixinhas de texto quando finaliza alguma coisa

### MOBILE:
* React-Native
* Expo para facilitar algumas implementaçõs
* Axios também foi usado aqui
* Styled-Component
* toastify


# Como iniciar o projeto na sua máquina:
1. Primeiro vai em cada pasta do projeto, abre o terminal lá e ditia o comando `yarn` para instalar todas as dependências ou pode ser `npm install`.

2. Depois de tudo instalado é preciso ter o Mongo instalado na maquina, ou rodando em um container docker na porta "27017" (Essa porta pode ser alterada dentro do arquivo "index" no dento da pasta da API).

3. Agora no frontend (a pasta "fe") é preciso ir dentro da pasta "utils" e mudar o ip dentro dela para o ip local da sua maquina. Esse é o ip base que o axios está utilizando para fazer requisições. 

4. Dentro da pasta do projeto mobile é preciso fazer a mesma coisa na pasta "utils" alternando o ip para o ip local da sua máquina.

5. E por último, é preciso ter o Expo Go no celular, para ler o QRcode que vai ser gerado ao rodar o mobile no pc.

Depois disso seu projeto ja está pronto para ser iniciado, agora só é preciso iniciar todos eles, backend, frontend, mobile e o banco de dados do mongo (caso você o rode em container docker também).
Para inicia-los são os seguintes comandos:

~~~

/* Backend */
yarn start

/* Frontend */
yarn dev

/* Mobile */
yarn start

~~~


# Instaladno o mongo em um container docker na sua máquina
1. Primeiramente você precisa ter o docker instalado na sua maquina, eu instalei no meu linux por esse site `https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-debian-9-pt`

2. Com o docker instalado, para instalar o mongo é super simples, é só digitar no terminal `sudo docker pull mongo`. E tá instalado o mongo na sua maquina. 

3. Agora é preciso fazer ele rodar né, que é mais simples ainda `sudo docker start mongo`. ele por padrão ja vai estar rodando  na porta "27017" containerizado.

Agora sim, tem front, back, mobile, tudo rodando, é só aproveitar o APP.
