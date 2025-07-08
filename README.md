# Kanban Board

Um sistema de quadro Kanban interativo construído com HTML, CSS e JavaScript vanilla.

## 🚀 Funcionalidades

- **Drag & Drop**: Arraste e solte cards entre as colunas
- **Adicionar Tarefas**: Clique no botão "+" para adicionar novas tarefas via prompt
- **4 Colunas**: Pendente, Em progresso, Concluído e Revisão
- **Interface Responsiva**: Design moderno e intuitivo
- **Feedback Visual**: Animações durante o drag & drop

## 🎯 Colunas

1. **Pendente** - Tarefas a serem iniciadas
2. **Em progresso** - Tarefas em desenvolvimento
3. **Concluído** - Tarefas finalizadas
4. **Revisão** - Tarefas em processo de revisão

## ✨ Como usar

### Adicionar Nova Tarefa
1. Clique no botão "+" de qualquer coluna
2. Digite o título da tarefa no prompt
3. A tarefa será criada automaticamente na coluna "Pendente"
4. Arraste a tarefa para outras colunas conforme necessário

### Mover Tarefas
1. Clique e arraste qualquer card
2. Solte na coluna desejada
3. O card será movido automaticamente

## 🛠️ Tecnologias

- HTML5
- CSS3 (Flexbox, Grid, Animações)
- JavaScript (ES6+, DOM Manipulation)
- Font Awesome (Ícones)

## 📁 Estrutura do Projeto

```
kanban/
├── index.html          # Página principal
├── src/
│   ├── styles/
│   │   └── styles.css  # Estilos CSS
│   ├── scripts/
│   │   └── kanban.js   # Lógica JavaScript
│   └── images/         # Avatares dos usuários
└── README.md           # Documentação
```

## 🎨 Design

- Cores suaves e modernas
- Gradiente no fundo
- Sombras sutis nos cards
- Scroll personalizado
- Badges coloridos por prioridade

## 🔧 Principais Funções JavaScript

- `displayModal()`: Exibe prompt para adicionar tarefa
- `createCard(title)`: Cria novo card dinamicamente
- **Event Listeners**: Drag & drop functionality
- **DOM Manipulation**: Criação e movimentação de elementos

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias!
