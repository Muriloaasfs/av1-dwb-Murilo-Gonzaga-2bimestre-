# Pokédex Futurista

## Descrição

Este é um projeto acadêmico de uma aplicação web que consome a PokéAPI para exibir uma Pokédex futurista. A interface utiliza um design com Glassmorphism, dark mode nativo, cards com efeitos neon e tipografia moderna. O projeto foi desenvolvido utilizando apenas HTML5, CSS3, Bootstrap e JavaScript puro (Vanilla JS), sem frameworks como React, Vue ou Angular.

## Funcionalidades

- **Página Inicial (index.html)**: Exibe um grid responsivo de cards com os primeiros 151 Pokémon, incluindo imagem e nome. Cada card é clicável e redireciona para a página de detalhes.
- **Página de Detalhes (detalhes.html)**: Mostra informações detalhadas do Pokémon selecionado, incluindo sprite, tipos, status (com barras de progresso) e habilidades.
- **Feedback de Carregamento**: Spinner moderno do Bootstrap durante as requisições à API.
- **Tratamento de Erros**: Alertas estilizados em caso de falha na API.
- **Design Futurista**: Glassmorphism, efeitos neon, dark mode e responsividade.

## Tecnologias Utilizadas

- **HTML5**: Estrutura das páginas.
- **CSS3**: Estilos personalizados para o design futurista, incluindo Glassmorphism e efeitos neon.
- **Bootstrap 5**: Framework CSS para responsividade, componentes como spinner, alertas e barras de progresso.
- **JavaScript (Vanilla JS)**: Lógica para consumo da API PokéAPI, manipulação do DOM e navegação.

## Como Rodar o Projeto

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` em um navegador web moderno (recomendado: Chrome, Firefox ou Edge).
3. Navegue pela Pokédex e clique nos cards para ver os detalhes dos Pokémon.

**Nota**: Como o projeto utiliza apenas tecnologias front-end, não há necessidade de servidor ou instalação de dependências. Basta abrir o arquivo HTML diretamente no navegador.

## Estrutura do Projeto

```
av1-dwb-murilo-gonzaga-2bimestre/
├── index.html          # Página de listagem dos Pokémon
├── detalhes.html       # Página de detalhes do Pokémon
├── css/
│   └── style.css       # Estilos personalizados
├── js/
│   ├── script.js       # Lógica da página inicial
│   └── detalhes.js     # Lógica da página de detalhes
└── README.md           # Documentação do projeto
```

## API Utilizada

- **PokéAPI**: https://pokeapi.co/ - API pública para dados de Pokémon.

## Autor

Murilo Gonzaga