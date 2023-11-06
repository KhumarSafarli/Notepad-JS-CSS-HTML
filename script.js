const sideBarMenuOpenBtnElement = document.querySelector("body .side-bar img");
const sideBarMenuElement = document.querySelector("body .side-bar-content");
const colorButtons = document.querySelectorAll(".color-btns .color");
const noteFormElement = document.querySelector(".input-box .note-form")
const noteSearchElement = document.querySelector(".searchInput");
const noteContainerElement = document.querySelector(".cards-box .cards")
function saveNotesToLocalStorage(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotesFromLocalStorage() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    return JSON.parse(storedNotes);
  } else {
    return [];
  }
}


noteFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const noteTitleElement = e.target.querySelector(".noteTitle");
  const noteDescriptionElement = e.target.querySelector(".noteContent");
  if (!noteTitleElement.value.trim()) {
    return alert("Note title must be filled!");
  }
  if (!noteDescriptionElement.value.trim()) {
    return alert("Note description must be filled!");
  }
  const activeColorElement =document.querySelector(".color-btns .color.active");
  if(!activeColorElement){
    return alert("Please choose a note color!")
  }

  const newNote = {
    title: noteTitleElement.value,
    description: noteDescriptionElement.value,
    color: activeColorElement.id,
  };
  createNoteElement(newNote);
})

function createNoteElement(note) {
  const noteElement = document.createElement("div");
  noteElement.classList.add("card", note.color);
  noteElement.style.borderColor = note.color;
  
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  cardHeader.style.backgroundColor = note.color;

  const noteTitleElement = document.createElement("h5");
  noteTitleElement.textContent = note.title;

  const noteDescriptionElement = document.createElement("p");
  noteDescriptionElement.textContent = note.description;
  noteDescriptionElement.style.padding = "10px";

  const noteDeleteBtn = document.createElement("button");
  noteDeleteBtn.classList.add("delete-button");
  noteDeleteBtn.style.backgroundColor = "transparent";
  noteDeleteBtn.style.border = "none";
  
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assets/icons/delete.png";
  deleteIcon.style.backgroundColor = "transparent";
  deleteIcon.addEventListener("click", () => {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if(confirmDelete){
    noteElement.remove(); 
    const notes = getNotesFromLocalStorage();
    const updatedNotes = notes.filter((n) => n.title !== note.title);
    saveNotesToLocalStorage(updatedNotes);
  }
  });

  noteDeleteBtn.appendChild(deleteIcon);

  cardHeader.appendChild(noteTitleElement);
  cardHeader.appendChild(noteDeleteBtn);

  noteElement.appendChild(cardHeader);
  noteElement.appendChild(noteDescriptionElement);

  noteContainerElement.appendChild(noteElement);
  const notes = getNotesFromLocalStorage();
  notes.push(note);
  saveNotesToLocalStorage(notes);
}
function loadNotesFromLocalStorage() {
  const notes = getNotesFromLocalStorage();
  notes.forEach((note) => {
    createNoteElement(note);
  });
}
loadNotesFromLocalStorage();

Array.from(colorButtons).forEach((element)=>{
  element.addEventListener("click",()=>{
    const activeColorElement =document.querySelector(".color-btns .color.active");
    if (activeColorElement) {
      activeColorElement.classList.remove("active");
    }
   element.classList.add("active")
  })
})
noteSearchElement.addEventListener("keyup", (e) => {
  const noteElements = document.querySelectorAll(".cards-box .cards .card")
  Array.from(noteElements).forEach((element) => {
    const title = element.querySelector("h5").textContent;
    const description = element.querySelector("p").textContent;
    if (
      title
        .toLowerCase()
        .trim()
        .includes(e.target.value.toLowerCase().trim()) ||
      description
        .toLowerCase()
        .trim()
        .includes(e.target.value.toLowerCase().trim())
    ) {
      element.style.display = "initial";
    } else {
      element.style.display = "none";
    }
  });
});


sideBarMenuElement.addEventListener("click", (e) => {
  e.stopPropagation();
});

sideBarMenuOpenBtnElement.addEventListener("click", (e) => {
  e.stopPropagation();
  sideBarMenuElement.classList.toggle("open");
});

window.onclick = () => {
  sideBarMenuElement.classList.remove("open");
};
