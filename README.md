Projeto em grupo realizado no modulo de back-end da Trybe.

**(Estilização da tela de administrador ainda não finalizada)**

Essa aplicação permite a comunicação entre clientes e vendedores. Os clientes podem fazer pedidos através de um carrinho de compras, e os vendedores têm a capacidade de aprovar, preparar e enviar esses pedidos. Após o recebimento do produto pelo cliente, este pode marcar o pedido como recebido. Ambas as partes têm acesso a detalhes específicos de seus pedidos.

Para facilitar a compreensão, podemos dividir a aplicação em fluxos, juntamente com uma validação de status entre cliente e vendedor, além da cobertura de testes tanto no front-end quanto no back-end:

Fluxo Comum:

    (1) Tela de Login;
    (2) Tela de Registro;

Fluxo do Cliente:

    (3) Tela de Produtos;
    (4) Tela de Checkout;
    (5) Tela de Pedidos;
    (6) Tela de Detalhes do Pedido;

Fluxo da Pessoa Vendedora:

    (7) Tela de Pedidos;
    (8) Tela de Detalhes/Controle do Pedido;

Validação do Status do Pedido:

    (9) Teste de status sem atualização em tempo real;
    (10) Teste de status com atualização em tempo real;

Fluxo da Pessoa Administradora:

    (11) Tela de gerenciamento de usuários;

Fluxo da Pessoa Vendedora:

    (12) Testes de cobertura.

<details>
  <summary><strong>Como rodar o projeto</strong></summary>
    
- `npm install` na raiz do projeto, dentro de back-end/ e front-end/;
- `docker compose up -d` na raiz do projeto;
- `npm run db:reset`na raiz do projeto;
- `localhost:3000` no browser;
 
</details>

<details>
  <summary><strong>Tecnologias utilizadas</strong></summary>
  
- `Node.js`
- `Express`
- `React`
- `Context API`
- `Sequelize`
- `MySql`
- `Arquitetura MSC`

</details>

<details>
  <summary><strong>Dev responsáveis</strong></summary>
  
- [@victorftw](https://github.com/victorftw)
- [@titi0001](https://github.com/titi0001)
- [@tiagohasse](https://github.com/tiagohasse)
- [@Gustavo-Aquino-1](https://github.com/Gustavo-Aquino-1)

</details>
