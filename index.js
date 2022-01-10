const refs = {
  //   My inputs
  inputNameOfNote: document.getElementById("inputName"),
  inputCategoryOfNote: document.getElementById("category"),
  inputContentOfNote: document.getElementById("inputContent"),
  inputChangeContent: document.getElementById("inputChangeContent"),

  // My elements
  tbodyRootOfNotes: document.getElementById("tbody"),
  tbodyRootOfArchiveNotes: document.getElementById("tbodyArchives"),

  tbodyCount: document.getElementById("tbodyCount"),
  //   My Btn
  btnSubmitForm: document.getElementById("btnSubmitForm"),
  deleteBtn: document.getElementById("del"),
};

function onPageLoaded() {
  document.addEventListener("input", (e) => {
    e.preventDefault();
    let ourForm = {
      name: refs.inputNameOfNote.value,
      category: refs.inputCategoryOfNote.value,
      inputContent: refs.inputContentOfNote.value,
    };
    const formDataToStringy = JSON.stringify(ourForm);
    localStorage.setItem("myToDo", formDataToStringy);
  });

  refs.btnSubmitForm.addEventListener("click", (e) => {
    e.preventDefault();
    createNote();
    countOfActiveCategory();
  });
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
       <button type="button" class="notes_table-row--btn" id=${idOfNote} ><i class="bi bi-trash" ></i></button>
   </td>
</tr >`
  );

  const noteDates = document.getElementById(`${idOfNote}NoteDates`);
  const btn = document.getElementById(idOfNote);

  // id всей строки заметки
  const trOfMyNote = document.getElementById(`${idOfNote}Note`);
  const archNote = document.getElementById(`${idOfNote}Note`).innerHTML;
  // const jyn = trOfMyNote.innerHTML;
  // console.log(jyn);

  const contentOfNote = document.getElementById(`${idOfNote}contentOfNote`);

  listenDeleteNote(btn);
  refs.inputContentOfNote.value = "";
  refs.inputNameOfNote.value = "";

  const btnArchive = document.getElementById(`${idOfNote}archiveBtn`);
  listenArchiveNote(btnArchive, trOfMyNote, archNote);

  const btnChange = document.getElementById(`${idOfNote}changeBtn`);
  changeContent(btnChange, contentOfNote, noteDates);
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
function changeContent(elBtn, elChange, noteDates) {
  elBtn.addEventListener("click", (event) => {
    elChange.insertAdjacentHTML(
      "afterend",
      `<button type="button" class="btn btn-primary" id="btnSubmitChange">Submit</button>`
    );
    elChange.setAttribute("contentEditable", "true");
    elChange.focus({ preventScroll: true });
    const btnSubmitChange = document.getElementById("btnSubmitChange");
    btnSubmitChange.addEventListener("click", (event) => {
      elChange.setAttribute("contentEditable", "false");
      console.log(elChange.innerHTML);
      noteDates.innerHTML = allDates(elChange.innerHTML);
      btnSubmitChange.remove();
      event.stopPropagation();
    });
    event.stopPropagation();
  });
}

function listenArchiveNote(btn, myNote, archNote) {
  btn.addEventListener("click", (event) => {
    refs.tbodyRootOfArchiveNotes.insertAdjacentHTML("beforeend", archNote);

    myNote.remove();
    countOfActiveCategory();
    event.stopPropagation();
  });
}

function listenDeleteNote(element) {
  element.addEventListener("click", (event) => {
    element.parentElement.parentElement.remove();
    countOfActiveCategory();
    event.stopPropagation();
  });
}
function allDates(str) {
  const res = str.match(/\d{2}([\/.-])\d{2}\1\d{4}/g);
  if (res) {
    return res.join(", ");
  }
  return "";
}

document.addEventListener("DOMContentLoaded", onPageLoaded);
