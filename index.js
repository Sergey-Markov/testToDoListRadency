const refs = {
  //   My inputs
  inputNameOfNote: document.getElementById("inputName"),
  inputCategoryOfNote: document.getElementById("category"),
  inputContentOfNote: document.getElementById("inputContent"),
  inputDateOfNoteDone: document.getElementById("inputDate"),
  // My elements
  tbodyRootOfNotes: document.getElementById("tbody"),
  //   My Btn
  btnSubmitForm: document.getElementById("btnSubmitForm"),
};

function onPageLoaded() {
  document.addEventListener("input", (e) => {
    e.preventDefault();
    let fuckForm = {
      name: refs.inputNameOfNote.value,
      category: refs.inputCategoryOfNote.value,
      inputContent: refs.inputContentOfNote.value,
      inputDateOfNoteDone: refs.inputDateOfNoteDone.value,
    };
    // console.log(fuckForm);
    const formDataToStringy = JSON.stringify(fuckForm);
    console.log(formDataToStringy);
    localStorage.setItem("myToDo", formDataToStringy);
    // console.log(localStorage.getItem("myToDo"));
  });

  refs.btnSubmitForm.addEventListener("click", (e) => {
    e.preventDefault();
    createNote();
  });
}

function createNote() {
  //   const tr = document.createElement("tr");
  //   tr.classList.add("notes_table-head");
  //   const td = document.createElement("td");
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
  const dateOfDone = refs.inputDateOfNoteDone.value
    .split("-")
    .reverse()
    .join("/");
  refs.tbodyRootOfNotes.insertAdjacentHTML(
    "beforeend",
    `<tr class="notes_table-head">
  <td class="notes_table-word_wrap"><i class="bi bi-cart4"></i> ${refs.inputNameOfNote.value}</td>
  <td>${dateOfCreateMonth}, ${dateOfCreateYear}</td>
  <td>${refs.inputCategoryOfNote.value}</td>
  <td class="notes_table-word_wrap">${refs.inputContentOfNote.value}</td>
  <td>${dateOfDone}</td>
  <td>
      <button type="button" class="notes_table-row--btn"><i class="bi bi-pencil"></i></button>
  </td>
  <td>
   <button type="button" class="notes_table-row--btn"><i class="bi bi-archive"></i></button>
   </td>
   <td>
       <button type="button" class="notes_table-row--btn"><i class="bi bi-trash"></i></button>
   </td>
</tr >`
  );
}

document.addEventListener("DOMContentLoaded", onPageLoaded);
