// import "bootstrap-icons/font/bootstrap-icons.css";
const refs = {
  saveButton: document.querySelector(".save"),
  clearButton: document.querySelector(".clear"),
  showTipsButton: document.querySelector(".showTips"),
  closeTipsButton: document.querySelector(".closeTips"),
  overlay: document.querySelector("#overlay"),
  input: document.querySelector(".inputRow"),
  createdDate: document.querySelector("#dateNow"),
  ol: document.querySelector("ol.todos"),
  song: document.querySelector("#sound"),
  songPaper: document.querySelector("#sound-paper"),
  btnAdd: document.querySelector("#add-list"),
  btnPen: document.querySelector(".bi-vector-pen"),
  divInput: document.querySelector("#input_section"),
};

function onPageLoaded() {
  refs.btnPen.addEventListener("click", () => {
    refs.divInput.classList.toggle("visually-hidden");
  });

  refs.saveButton.addEventListener("click", () => {
    console.log(refs.ol.innerHTML);
    localStorage.setItem("todos", refs.ol.innerHTML);
  });

  refs.clearButton.addEventListener("click", () => {
    playSoundPaper();
    refs.ol.innerHTML = "";
    localStorage.removeItem("todos", refs.ol.innerHTML);
  });

  refs.showTipsButton.addEventListener("click", () => {
    refs.overlay.style.height = "100%";
  });

  refs.closeTipsButton.addEventListener("click", () => {
    refs.overlay.style.height = "0";
  });

  refs.btnAdd.addEventListener("click", () => {
    createTodo();
    setTimeout(() => {
      localStorage.setItem("todos", refs.ol.innerHTML);
    }, 300);
  });

  function createTodo() {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const textSpan = document.createElement("span");
    textSpan.classList.add("todo-text");
    // p.classList.add("todo-text");
    const newTodo = refs.input.value;
    const createdDate = new Date().toDateString();
    textSpan.append(createdDate);
    textSpan.append(newTodo);

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("todo-trash");
    const icon = document.createElement("i");
    icon.classList.add("bi", "bi-trash");
    deleteBtn.appendChild(icon);

    refs.ol.appendChild(li).append(p, textSpan, deleteBtn);
    refs.input.value = "";
    listenDeleteTodo(deleteBtn);
    playSound();
  }

  function listenDeleteTodo(element) {
    element.addEventListener("click", (event) => {
      element.parentElement.remove();
      localStorage.setItem("todos", refs.ol.innerHTML);
      playSoundPaper();
      event.stopPropagation();
    });
  }

  function loadTodos() {
    const data = localStorage.getItem("todos");
    if (data) {
      refs.ol.innerHTML = data;
      const deleteButtons = document.querySelectorAll("span.todo-trash");
      for (const button of deleteButtons) {
        listenDeleteTodo(button);
      }
    }
  }

  function onClickTodo(event) {
    if (event.target.tagName === "LI" || event.target.tagName === "SPAN") {
      event.target.classList.toggle("checked");
    }
  }

  refs.input.addEventListener("keypress", (keyPressed) => {
    // каждая клавиша на клавиатуре имеет предопределенный код - 13 соответствует клавише "Enter"( сайт для определения "keycode.info")
    const keyEnter = 13;
    if (keyPressed.key === "Enter") {
      createTodo();
    }
    setTimeout(() => {
      localStorage.setItem("todos", refs.ol.innerHTML);
    }, 300);
  });

  refs.ol.addEventListener("click", onClickTodo);

  loadTodos();
}

function playSound(sound) {
  console.dir(refs.song);
  if (refs.song.paused) {
    refs.song.play();
  } else {
    refs.song.pause();
  }
}

function playSoundPaper(sound) {
  console.dir(refs.songPaper);
  if (refs.songPaper.paused) {
    refs.songPaper.play();
  } else {
    refs.songPaper.pause();
  }
}

document.addEventListener("DOMContentLoaded", onPageLoaded);
