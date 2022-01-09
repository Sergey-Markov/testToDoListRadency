const refs = {
  //   My inputs
  inputNameOfNote: document.getElementById("inputName"),
  inputCategoryOfNote: document.getElementById("category"),
  inputContentOfNote: document.getElementById("inputContent"),

  // My elements
  tbodyRootOfNotes: document.getElementById("tbody"),
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
  <td class="notes_table-word_wrap">${refs.inputContentOfNote.value}</td>
  <td>${allDates(refs.inputContentOfNote.value)}</td>
  <td>
      <button type="button" class="notes_table-row--btn"><i class="bi bi-pencil"></i></button>
  </td>
  <td>
   <button type="button" class="notes_table-row--btn"><i class="bi bi-archive"></i></button>
   </td>
   <td>
       <button type="button" class="notes_table-row--btn" id=${idOfNote} ><i class="bi bi-trash" ></i></button>
   </td>
</tr >`
  );
  function allDates(str) {
    const res = str.match(/\d{2}([\/.-])\d{2}\1\d{4}/g);
    if (res) {
      return res.join(", ");
    }
    return "";
  }
  const btn = document.getElementById(idOfNote);
  const trOfMyNote = document.getElementById(`${idOfNote}Note`);
  console.log(trOfMyNote.innerHTML);
  listenDeleteNote(btn);
  refs.inputContentOfNote.value = "";
  refs.inputNameOfNote.value = "";
}

function countOfActiveCategory() {
  const taskCount = document.getElementsByClassName("bi-cart4 active").length;
  const randomCount = document.getElementsByClassName("bi-gear active").length;
  const ideakCount = document.getElementsByClassName(
    "bi-lightbulb active"
  ).length;

  const htmlString = `<tr>
  <td>Task</td>
  <td>${taskCount}</td>
  <td>0</td>
</tr>
<tr>
  <td>Random Thought</td>
  <td>${randomCount}</td>
  <td>0</td>
</tr>
<tr>
  <td>Idea</td>
  <td>${ideakCount}</td>
  <td>0</td>
</tr>`;

  refs.tbodyCount.innerHTML = htmlString;
}

function listenDeleteNote(element) {
  element.addEventListener("click", (event) => {
    element.parentElement.parentElement.remove();
    event.stopPropagation();
  });
}

document.addEventListener("DOMContentLoaded", onPageLoaded);
