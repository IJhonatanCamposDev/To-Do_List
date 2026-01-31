const form = document.querySelector("#form");
const input = document.querySelector("#input-tarefa");
const lista = document.querySelector("#lista-tarefas");
const filtros = document.querySelectorAll(".filtros button");
const contador = document.querySelector(".contador");

let filtroAtual = "todas";
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// RENDERIZA
function carregarTarefas() {
  lista.innerHTML = "";

  let tarefasFiltradas = tarefas.filter(tarefa => {
    if (filtroAtual === "ativas") return !tarefa.concluida;
    if (filtroAtual === "concluidas") return tarefa.concluida;
    return true;
  });

  tarefasFiltradas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    if (tarefa.concluida) li.classList.add("concluida");

    const span = document.createElement("span");
    span.textContent = tarefa.texto;

    span.addEventListener("click", () => {
      tarefa.concluida = !tarefa.concluida;
      salvarTarefas();
      carregarTarefas();
    });

    const btn = document.createElement("button");
    btn.textContent = "✖";
    btn.addEventListener("click", () => {
      tarefas.splice(tarefas.indexOf(tarefa), 1);
      salvarTarefas();
      carregarTarefas();
    });

    li.append(span, btn);
    lista.appendChild(li);
  });

  atualizarContador();
}

// ADICIONAR
form.addEventListener("submit", (e) => {
  e.preventDefault();

  tarefas.push({
    texto: input.value,
    concluida: false
  });

  input.value = "";
  salvarTarefas();
  carregarTarefas();
});

// FILTROS
filtros.forEach(botao => {
  botao.addEventListener("click", () => {
    filtros.forEach(b => b.classList.remove("ativo"));
    botao.classList.add("ativo");

    filtroAtual = botao.dataset.filtro;
    carregarTarefas();
  });
});

// CONTADOR
function atualizarContador() {
  const restantes = tarefas.filter(t => !t.concluida).length;
  contador.textContent = `${restantes} tarefa(s) pendente(s)`;
}

// LOCALSTORAGE
function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

carregarTarefas();
