const refs = {
  //   My inputs
  inputNameOfNote: document.getElementById("inputName"),
  inputCategoryOfNote: document.getElementById("category"),
  inputContentOfNote: document.getElementById("inputContent"),
  inputChangeContent: document.getElementById("inputChangeContent"),

  // My elements
  tbodyRootOfNotes: document.getElementById("tbody"),
  tbodyRootOfArchiveNotes: document.getElementById("tbodyArchives"),
  archTableField: document.getElementById("archTableField"),
  tbodyCount: document.getElementById("tbodyCount"),
  //   My Btn
  btnSubmitForm: document.getElementById("btnSubmitForm"),
  deleteBtn: document.getElementById("del"),
  showArchTable: document.getElementById("showArchTable"),
  deleteAllNotes: document.getElementById("deleteAllNotes"),
  closeArchive: document.getElementById("closeArchive"),
};

function onPageLoaded() {
  const keys = {
    notes: "notes",
    archNotes: "archNotes",
  };

  refs.btnSubmitForm.addEventListener("click", (e) => {
    e.preventDefault();
    createNote();
    countOfActiveCategory();
  });

  refs.showArchTable.addEventListener("click", (e) => {
    e.preventDefault();
    refs.archTableField.classList.toggle("closeTable");
  });
  refs.closeArchive.addEventListener("click", (e) => {
    e.preventDefault();
    refs.archTableField.classList.toggle("closeTable");
  });

  refs.deleteAllNotes.addEventListener("click", (e) => {
    e.preventDefault();
    refs.tbodyRootOfNotes.innerHTML = "";
    refs.tbodyRootOfArchiveNotes.innerHTML = "";
    countOfActiveCategory();
    saveNotes();
  });

  document
    .querySelector(".parentFirst")
    .addEventListener("click", function (e) {
      if (e.target.classList.value === "bi bi-trash del") {
        const tr = e.target.parentElement.parentElement.parentElement;
        tr.remove();
        countOfActiveCategory();
        e.stopPropagation();
        saveNotes();
      }
    });

  document
    .querySelector(".parentFirst")
    .addEventListener("click", function (e) {
      if (e.target.classList.value === "bi bi-archive") {
        const tr = e.target.parentElement.parentElement.parentElement;
        refs.tbodyRootOfArchiveNotes.insertAdjacentHTML(
          "beforeend",
          tr.innerHTML
        );
        e.stopPropagation();
        tr.remove();
        countOfActiveCategory();
        saveNotes();
      }
    });

  document.querySelector(".parent").addEventListener("click", function (e) {
    if (e.target.classList.value === "bi bi-trash del") {
      const tr = e.target.parentElement.parentElement.parentElement;
      tr.remove();
      countOfActiveCategory();
      e.stopPropagation();
      saveNotes();
    }
  });
  document.querySelector(".parent").addEventListener("click", function (e) {
    if (e.target.classList.value === "bi bi-archive") {
      const tr = e.target.parentElement.parentElement.parentElement;
      refs.tbodyRootOfNotes.insertAdjacentHTML("beforeend", tr.innerHTML);
      e.stopPropagation();
      tr.remove();
      countOfActiveCategory();
      saveNotes();
    }
  });

  document
    .querySelector(".parentFirst")
    .addEventListener("click", function (e) {
      if (e.target.classList.value === "bi bi-pencil") {
        const elBtn = e.target.parentElement;
        const elChange =
          elBtn.parentElement.previousElementSibling.previousElementSibling;
        const noteDates = elBtn.parentElement.previousElementSibling;

        elChange.insertAdjacentHTML(
          "afterend",
          `<button type="button" class="btn btn-primary" id="btnSubmitChange">Submit</button>`
        );
        elChange.setAttribute("contentEditable", "true");
        elChange.focus({ preventScroll: true });
        const btnSubmitChange = document.getElementById("btnSubmitChange");
        btnSubmitChange.addEventListener("click", (event) => {
          elChange.setAttribute("contentEditable", "false");
          noteDates.innerHTML = allDates(elChange.innerHTML);
          btnSubmitChange.remove();
          saveNotes();
          event.stopPropagation();
        });

        countOfActiveCategory();
        e.stopPropagation();
        saveNotes();
      }
    });
  loadNotes(keys.notes, refs.tbodyRootOfNotes);
  loadNotes(keys.archNotes, refs.tbodyRootOfArchiveNotes);
}

function createNote() {
  let imgCategory = ``;
  imgCategory = `<i class="bi bi-cart4 active"></i>`;
  if (refs.inputCategoryOfNote.value === "Random Tought") {
    imgCategory = `<i class="bi bi-gear active"></i>`;
  }

  if (refs.inputCategoryOfNote.value === "Idea") {
    imgCategory = `<i class="bi bi-lightbulb active"></i>`;
  }
  const idOfNote = new Date()
    .toLocaleString()
    .split(",")
    .join("")
    .split(".")
    .join("")
    .split(":")
    .join("")
    .split(" ")
    .join("");

  const dateOfCreateMonth = new Date()
    .toDateString()
    .split(" ")
    .splice(1, 2)
    .join(" ");
  const dateOfCreateYear = new Date()
    .toDateString()
    .split(" ")
    .splice(3, 3)
    .join(" ");

  refs.tbodyRootOfNotes.insertAdjacentHTML(
    "beforeend",
    `<tr class="notes_table-head" id=${idOfNote}Note>
  <td class="notes_table-word_wrap">${imgCategory} ${
      refs.inputNameOfNote.value
    }</td>
  <td>${dateOfCreateMonth}, ${dateOfCreateYear}</td>
  <td>${refs.inputCategoryOfNote.value}</td>
  <td class="notes_table-word_wrap" id=${idOfNote}contentOfNote>${
      refs.inputContentOfNote.value
    }</td>
  <td id=${idOfNote}NoteDates>${allDates(refs.inputContentOfNote.value)}</td>
  <td>
      <button type="button" class="notes_table-row--btn " id=${idOfNote}changeBtn><i class="bi bi-pencil"></i></button>
  </td>
  <td>
   <button type="button" class="notes_table-row--btn" id=${idOfNote}archiveBtn><i class="bi bi-archive"></i></button>
   </td>
   <td>
       <button type="button" class="notes_table-row--btn del" id=${idOfNote} ><i class="bi bi-trash del" ></i></button>
   </td>
</tr >`
  );

  const btn = document.getElementById(idOfNote);

  const contentOfNote = document.getElementById(`${idOfNote}contentOfNote`);

  const trOfMyNote = contentOfNote.parentElement;
  const archNote = trOfMyNote.innerHTML;

  listenDeleteNote(btn);
  refs.inputContentOfNote.value = "";
  refs.inputNameOfNote.value = "";

  const btnArchive = document.getElementById(`${idOfNote}archiveBtn`);
  listenArchiveNote(btnArchive, trOfMyNote, archNote);

  // const btnChange = document.getElementById(`${idOfNote}changeBtn`);
  saveNotes();
}

function countOfActiveCategory() {
  const taskCount =
    refs.tbodyRootOfNotes.getElementsByClassName("bi-cart4 active").length;
  const randomCount =
    refs.tbodyRootOfNotes.getElementsByClassName("bi-gear active").length;
  const ideakCount = refs.tbodyRootOfNotes.getElementsByClassName(
    "bi-lightbulb active"
  ).length;

  const taskCountArchive =
    refs.tbodyRootOfArchiveNotes.getElementsByClassName(
      "bi-cart4 active"
    ).length;
  // console.log(taskCountArchive);
  const randomCountArchive =
    refs.tbodyRootOfArchiveNotes.getElementsByClassName(
      "bi-gear active"
    ).length;
  // console.log(randomCountArchive);
  const ideakCountArchive = refs.tbodyRootOfArchiveNotes.getElementsByClassName(
    "bi-lightbulb active"
  ).length;
  // console.log(ideakCountArchive);

  const htmlString = `<tr>
  <td>Task</td>
  <td>${taskCount}</td>
  <td>${taskCountArchive}</td>
</tr>
<tr>
  <td>Random Thought</td>
  <td>${randomCount}</td>
  <td>${randomCountArchive}</td>
</tr>
<tr>
  <td>Idea</td>
  <td>${ideakCount}</td>
  <td>${ideakCountArchive}</td>
</tr>`;

  refs.tbodyCount.innerHTML = htmlString;
}

function listenArchiveNote(btn, myNote, archNote) {
  btn.addEventListener("click", (event) => {
    refs.tbodyRootOfArchiveNotes.insertAdjacentHTML("beforeend", archNote);
    myNote.remove();
    countOfActiveCategory();
    event.stopPropagation();
    saveNotes();
  });
}

function listenDeleteNote(element) {
  element.addEventListener("click", (event) => {
    element.parentElement.parentElement.remove();
    countOfActiveCategory();
    event.stopPropagation();
    saveNotes();
  });
}
function allDates(str) {
  const res = str.match(/\d{2}([\/.-])\d{2}\1\d{4}/g);
  if (res) {
    return res.join(", ");
  }
  return "";
}

function saveNotes() {
  localStorage.setItem("notes", refs.tbodyRootOfNotes.innerHTML);
  localStorage.setItem("archNotes", refs.tbodyRootOfArchiveNotes.innerHTML);
}

function loadNotes(key, root) {
  const data = localStorage.getItem(key);
  if (data) root.innerHTML = data;
  countOfActiveCategory();
}

document.addEventListener("DOMContentLoaded", onPageLoaded);
