document.querySelectorAll('.kanban-card')
  .forEach(card => {
    // Quando começar a arrastar o card, adiciona a classe 'dragging'
    card.addEventListener('dragstart', e => {
      e.currentTarget.classList.add('dragging');
    });

    // Quando terminar de arrastar o card, remove a classe 'dragging'
    card.addEventListener('dragend', e => {
      e.currentTarget.classList.remove('dragging');
    });
  });

document.querySelectorAll('.kanban-cards')
  .forEach(column => {
    // Quando arrastar um card sobre a coluna, permite o drop e adiciona estilo visual
    column.addEventListener('dragover', e => {
      e.preventDefault();
      e.currentTarget.classList.add('cards-hover');
    });

    // Quando o card sair da área da coluna, remove o estilo visual
    column.addEventListener('dragleave', e => {
      e.currentTarget.classList.remove('cards-hover');
    });

    // Quando soltar o card na coluna, move o card para essa coluna
    column.addEventListener('drop', e => {
      e.currentTarget.classList.remove('cards-hover');

      const dragCard = document.querySelector('.kanban-card.dragging');
      e.currentTarget.appendChild(dragCard);
    });
  });

function displayModal() {
  // Pergunta ao usuário qual tarefa ele quer adicionar
  let task = prompt('Por favor, insira uma nova tarefa: ');

  // Se o usuário cancelou ou não digitou nada, para por aqui
  if (task == null || task == '') {
    console.log('Usuário cancelou!');
    return; // Para a função aqui
  }

  // Se chegou até aqui, o usuário digitou uma tarefa
  console.log('Tarefa "' + task + '" foi adicionada com sucesso!');

  // Criar o novo card da tarefa
  createCard(task);
}

// Função para criar um novo card simples
function createCard(title) {
  // 1. Encontrar a primeira coluna (Pendente)
  const pendingColumn = document.querySelector('[data-id="1"] .kanban-cards');

  // 2. Criar o HTML do novo card
  const newCard = document.createElement('div');
  newCard.className = 'kanban-card';
  newCard.draggable = true;

  // 3. Colocar o conteúdo dentro do card
  newCard.innerHTML = `
    <div class="badge medium">
      <span>A fazer</span>
    </div>
    <p class="card-title">${title}</p>
    <div class="card-infos">
      <div class="card-icons">
        <p>
          <i class="fa-regular fa-comment"></i>
          0
        </p>
        <p>
          <i class="fa-solid fa-paperclip"></i>
          0
        </p>
      </div>
      <div class="user">
        <img src="src/images/avatar.png" alt="Avatar">
      </div>
    </div>
  `;

  // 4. Adicionar os eventos de arrastar no novo card
  newCard.addEventListener('dragstart', e => {
    e.currentTarget.classList.add('dragging');
  });

  newCard.addEventListener('dragend', e => {
    e.currentTarget.classList.remove('dragging');
  });

  // 5. Adicionar o card na coluna Pendente
  pendingColumn.appendChild(newCard);

  // 6. Salvar no localStorage
  saveTasksToLocalStorage();
}

// Função para salvar todas as tarefas no localStorage
function saveTasksToLocalStorage() {
  const tasks = [];

  // Percorrer todas as colunas
  document.querySelectorAll('.kanban-column').forEach(column => {
    const columnId = column.getAttribute('data-id');

    // Percorrer todos os cards da coluna
    column.querySelectorAll('.kanban-card').forEach(card => {
      const title = card.querySelector('.card-title').textContent;
      const priority = card.querySelector('.badge').classList.contains('high') ? 'high' :
        card.querySelector('.badge').classList.contains('medium') ? 'medium' : 'low';

      tasks.push({
        id: Date.now() + Math.random(), // ID único simples
        title: title,
        priority: priority,
        column: columnId
      });
    });
  });

  // Salvar no localStorage
  localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  console.log('Tarefas salvas no localStorage:', tasks);
}

// Função para carregar tarefas do localStorage
function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('kanbanTasks');

  if (!savedTasks) {
    console.log('Nenhuma tarefa salva encontrada');
    return;
  }

  const tasks = JSON.parse(savedTasks);
  console.log('Tarefas carregadas do localStorage:', tasks);

  // Limpar cards existentes (exceto os exemplos iniciais se quiser manter)
  // document.querySelectorAll('.kanban-card').forEach(card => card.remove());

  // Recriar cada tarefa
  tasks.forEach(task => {
    createSavedCard(task.title, task.priority, task.column);
  });
}

// Função para criar card de tarefa salva
function createSavedCard(title, priority, columnId) {
  const targetColumn = document.querySelector(`[data-id="${columnId}"] .kanban-cards`);

  if (!targetColumn) {
    console.error('Coluna não encontrada:', columnId);
    return;
  }

  const newCard = document.createElement('div');
  newCard.className = 'kanban-card';
  newCard.draggable = true;

  // Definir texto do badge baseado na prioridade
  let priorityText;
  switch (priority) {
    case 'high':
      priorityText = 'Alta prioridade';
      break;
    case 'medium':
      priorityText = 'Média prioridade';
      break;
    case 'low':
      priorityText = 'Baixa prioridade';
      break;
    default:
      priorityText = 'A fazer';
      priority = 'medium';
  }

  newCard.innerHTML = `
    <div class="badge ${priority}">
      <span>${priorityText}</span>
    </div>
    <p class="card-title">${title}</p>
    <div class="card-infos">
      <div class="card-icons">
        <p>
          <i class="fa-regular fa-comment"></i>
          0
        </p>
        <p>
          <i class="fa-solid fa-paperclip"></i>
          0
        </p>
      </div>
      <div class="user">
        <img src="src/images/avatar.png" alt="Avatar">
      </div>
    </div>
  `;

  // Adicionar eventos de drag
  newCard.addEventListener('dragstart', e => {
    e.currentTarget.classList.add('dragging');
  });

  newCard.addEventListener('dragend', e => {
    e.currentTarget.classList.remove('dragging');
  });

  targetColumn.appendChild(newCard);
}

// Carregar tarefas quando a página carrega
document.addEventListener('DOMContentLoaded', function () {
  loadTasksFromLocalStorage();
});

// Salvar quando um card for movido entre colunas
document.querySelectorAll('.kanban-cards')
  .forEach(column => {
    column.addEventListener('drop', function () {
      // Aguardar o DOM ser atualizado
      setTimeout(() => {
        saveTasksToLocalStorage();
      }, 100);
    });
  });