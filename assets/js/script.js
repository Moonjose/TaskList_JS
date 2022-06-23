const inputTask = document.querySelector('.input-task'); // Obtem os elementos html
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

function createLi() { // Função que cria um elemento li
  const li = document.createElement('li');
  return li;
}

inputTask.addEventListener('keypress', function (e) { // Listener para a tecla enter
  if (e.keyCode === 13) {
    if (!inputTask.value) return; // Checa se tem algo no input
    createTask(inputTask.value); // cria uma li com o texto passado no input
  }
});

function clearInput() { // Limpa o input 
  inputTask.value = '';
  inputTask.focus();
}

function createDelBtn(li) { // Cria um botão de apagar para o li criado
  li.innerText += ' ';
  const delBtn = document.createElement('button');
  delBtn.innerText = 'Apagar';
  li.appendChild(delBtn);
  delBtn.setAttribute('class', 'delete'); // adiciona class: "delete"
}

function createTask(inputText) { // Cria a task e o botão de apagar, limpa o input e salva a task
  const li = createLi();
  li.innerText = inputText;
  tasks.appendChild(li);
  clearInput();
  createDelBtn(li);
  saveTasks(); // Salva as tasks para atualizar o localStorage
}

btnTask.addEventListener('click', function () { // Listener para o click no botão
  if (!inputTask.value) return;

  createTask(inputTask.value);
});

document.addEventListener('click', function (e) { // Lógica de apagar a task
  const el = e.target;
  if (el.classList.contains('delete')) { // se el tem class: "delete"
    el.parentElement.remove(); // Remove o pai de el
    saveTasks(); // Salva as tasks para atualizar o localStorage
  }
});

function saveTasks() { // Função que salva as tasks
  const liTasks = tasks.querySelectorAll('li'); // Obtem todos 'li' 
  const taskList = []; // Cria um array vazio

  for (let task of liTasks) { 
    let taskText = task.innerText; // Obtem o texto de cada 'li'
    taskText = taskText.replace('Apagar', '').trim(); // Trata o texto, removendo 'apagar' dele para salvar em JSON
    taskList.push(taskText); // Adiciona os textos salvos em um array
  }

  const jsonTasks = JSON.stringify(taskList); // Transforma o array com os textos de 'li' em uma string no formato JSON
  localStorage.setItem('tasks', jsonTasks); //Salva o JSON no localStorage, com o nome de 'tasks'
}

function redeemSavedTasks() { // Função para recuperar as tasks
  const tarefas = localStorage.getItem('tasks'); // Resgata o JSON do localStorage
  const task_list = JSON.parse(tarefas); // Converte novamente para um array

  for (let task of task_list) { // Recria as tarefas novamente
    createTask(task);
  }
}

redeemSavedTasks();