# Checkout Colmeia - Frontend

## Descrição do Projeto

O **Checkout Colmeia** é uma aplicação web em **Next.js** que simula um carrinho de compras com múltiplos métodos de pagamento (Pix, Boleto e Cartão de Crédito). O objetivo é demonstrar funcionalidades de frontend modernas utilizando **React**, **TypeScript** e componentes do **ShadCN UI**.

O projeto permite:

- Adicionar produtos ao carrinho.
- Alterar a quantidade de itens no carrinho.
- Visualizar subtotal, taxa de entrega e total.
- Selecionar um método de pagamento: **Pix**, **Boleto** ou **Cartão de Crédito**.
- Simular a geração de boleto e pagamento via todos os métodos.
- Verificar o status do pedido: `inicial → processando → pago | falhado | expirado`.

---

## Tecnologias Utilizadas

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **ShadCN UI** (Card, Button, Tabs, Dialog, Badge, Input, Separator)
- **Lucide Icons**
- **CSS Tailwind**
- **Zod** (validação de formulário de cartão de crédito)
- **SessionStorage** para armazenamento local do carrinho

---

## Estrutura de Pastas

```
/components
  /payment
    CardPayment.tsx
    BoletoPayment.tsx
    PixPayment.tsx
    PaymentModal.tsx
    OrderStatus.tsx
    PaymentMethods.tsx
  Cart.tsx
  Header.tsx
/contexts
  ProductsContexts.tsx
/pages
  index.tsx
  cart.tsx
  login.tsx
```

---

## Funcionalidades

### 1. Carrinho de Compras

- Armazena produtos adicionados pelo usuário em **sessionStorage**.
- Permite aumentar ou diminuir a quantidade de itens.
- Remove itens do carrinho.
- Calcula subtotal, taxa de entrega (R$12,90 fixa) e total do pedido.

### 2. Fluxo de Pagamento

- **Pix**: mostra QR Code e botão para copiar o código.
- **Boleto**: gera um código de boleto simulado e permite pagar.
- **Cartão de Crédito**: formulário com validação usando **Zod** antes de permitir o pagamento.
- Modal de pagamento com **Tabs** para selecionar o método.
- Status do pedido exibido em tempo real (`inicial → processando → pago | falhado | expirado`).

### 3. Autenticação Simples

- Verifica se existe um usuário logado em `sessionStorage`.
- Redireciona para `/login` caso não esteja logado.
- O login é simulado para fins de demonstração.

---

## Como Testar

1. **Instalar dependências**

```bash
npm install
```

2. **Rodar o projeto em modo de desenvolvimento**

```bash
npm run dev
```

- A aplicação ficará disponível em `http://localhost:3000`.

3. **Testar funcionalidades**

- Acesse a página inicial (`/`), onde os produtos estão listados.
- Adicione produtos ao carrinho clicando no botão **Adicionar**.
- Clique no ícone do carrinho no header para acessar o **Carrinho de Compras**.
- Altere quantidades ou remova produtos.
- Clique em **Finalizar Pedido** para abrir o modal de pagamento.
- Selecione o método de pagamento desejado:

  - **Pix**: copie o código ou simule pagamento.
  - **Boleto**: clique em gerar boleto, depois em pagar.
  - **Cartão**: preencha o formulário com dados fictícios e clique em pagar.

- Acompanhe o status do pedido até que seja `pago`, `falhado` ou `expirado`.
- Clique em **Tentar Novamente** caso o pagamento falhe ou expire.

---

## Observações

- O projeto é apenas uma **simulação de checkout**; não integra pagamentos reais.
- Todos os dados ficam armazenados no **sessionStorage** e serão perdidos ao fechar o navegador.
- O código está estruturado para ser **extensível**, podendo integrar pagamentos reais futuramente.

---

## Ícones e Design

- Todos os ícones são do **Lucide Icons**.
- Componentes visuais e layout são baseados no **ShadCN UI** com **TailwindCSS**.

---

Se você quiser, posso criar **uma versão do README ainda mais resumida e direta**, ideal para entregar em avaliação, destacando apenas o essencial que o avaliador precisa testar.

Quer que eu faça isso também?
