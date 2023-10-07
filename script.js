const sheetContainer = document.getElementById("sheet-container");
const display_cell = document.getElementById("display-cell");
let activeCell;

// load all the menu buttons
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlinedButton = document.getElementById("underlined");
const leftButton = document.getElementById("left");
const centerButton = document.getElementById("center");
const rightButton = document.getElementById("right");
const fonSizeInput = document.getElementById("font-size-input");
const fontFamilySelect = document.getElementById("font-family");
const ifontColor = document.getElementById("font-color");
const bgColor = document.getElementById("bg-color");

loadCells();
function loadCells() {
  // load first row
  let firsrow = document.createElement("div");
  firsrow.className = "sheet-row first-row";
  for (let i = 64; i <= 90; i++) {
    // console.log(i);
    let firstRowCell = document.createElement("div");
    firstRowCell.className = "first-row-cell";
    if (i == 64) {
      firstRowCell.style.backgroundColor = "gray";
      firstRowCell.id = "zero";
    } else {
      firstRowCell.innerText = String.fromCharCode(i);
      firstRowCell.id = String.fromCharCode(i);
    }

    firsrow.appendChild(firstRowCell);

    sheetContainer.appendChild(firsrow);
  }

  for (let i = 1; i <= 100; i++) {
    let row = document.createElement("row");
    row.className = "sheet-row";

    for (let j = 64; j <= 90; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      if (j == 64) {
        cell.innerText = i;
        cell.className = "first-col";
      } else {
        let char = String.fromCharCode(j);
        cell.id = `${char}${i}`;
        cell.contentEditable = "true";
        cell.addEventListener("focus", cellFocus);
        // cell.innerText = cell.id;
      }
      row.appendChild(cell);
    }
    sheetContainer.appendChild(row);
  }
}

function cellFocus(e) {
  let style = getComputedStyle(e.target);

  let activeCellStatus = {
    isBold: style.fontWeight == 600,
    isItalic: style.fontStyle == "italic",
    notUnderlined: style.textDecoration.split(" ")[0] == "none",
    alignMent: style.textAlign,
    fontSize: style.fontSize,
    fontFamily: style.fontFamily,
    fontColor: style.color,
    bgColor: style.backgroundColor,
  };

  loadMenuStyles(activeCellStatus);

  boldButton.addEventListener("click", boldStyling);
  italicButton.addEventListener("click", italicStyling);
  underlinedButton.addEventListener("click", underLinedStyling);
  ifontColor.addEventListener("change", (e) => {
    // console.log("click");
    activeCell.style.color = document.getElementById("font-color").value;
  });
  bgColor.addEventListener("change", (e) => {
    activeCell.style.backgroundColor = e.target.value;
  });
  fontFamilySelect.addEventListener("change", (e) => {
    // console.log(e.target.value);
    activeCell.style.fontFamily = e.target.value;
  });
  fonSizeInput.addEventListener("focusout", (e) => {
    activeCell.style.fontSize = e.target.value;
  });

  let alignMentArray = [leftButton, centerButton, rightButton];

  for (let i = 0; i < alignMentArray.length; i++) {
    alignMentArray[i].addEventListener("click", (e) => {
      let position = e.target.id;
      if (position == "left") {
        activeCell.style.textAlign = "start";
      } else if (position == "right") {
        activeCell.style.textAlign = "end";
      } else {
        activeCell.style.textAlign = "center";
      }

      for (let i = 0; i < alignMentArray.length; i++) {
        if (alignMentArray[i].id != e.id) {
          alignMentArray[i].classList.remove("selected");
        }
      }
      e.target.classList.add("selected");
    });
  }

  let cellId = e.target.id;
  display_cell.innerText = cellId;
  activeCell = document.getElementById(cellId);
}

function underLinedStyling(e) {
  let underLinedButton = e.target;
  if (underLinedButton.classList.contains("selected")) {
    activeCell.style.textDecoration = "none";
    removeSelected(underLinedButton);
  } else {
    activeCell.style.textDecoration = "underline";
    addSelected(underLinedButton);
  }
}

function boldStyling(e) {
  //   console.log(e.target);
  if (e.target.classList.contains("selected")) {
    e.target.classList.remove("selected");
    activeCell.style.fontWeight = "400";
    // console.log(activeCell.style.fontWeight);
  } else {
    // console.log(activeCell.style.fontWeight);
    activeCell.style.fontWeight = "600";
    e.target.classList.add("selected");
  }
  //   console.log("lksnf");
}

function italicStyling(e) {
  let italic = e.target;
  if (italic.classList.contains("selected")) {
    italic.classList.remove("selected");
    activeCell.style.fontStyle = "normal";
  } else {
    italic.classList.add("selected");
    activeCell.style.fontStyle = "italic";
  }
}

function loadMenuStyles(activeCellStatus) {
  // console.log(activeCellStatus.fontColor);
  // console.log(activeCellStatus.bgColor);
  fonSizeInput.value = activeCellStatus.fontSize;
  if (activeCellStatus.isBold) {
    addSelected(boldButton);
  } else {
    removeSelected(boldButton);
  }
  if (activeCellStatus.isItalic) {
    addSelected(italicButton);
  } else {
    removeSelected(italicButton);
  }

  //   console.log(activeCellStatus.notUnderlined);
  if (activeCellStatus.notUnderlined) {
    removeSelected(underlinedButton);
  } else {
    addSelected(underlinedButton);
  }

  //   console.log(activeCellStatus.alignMent);
  if (activeCellStatus.alignMent == "center") {
    centerButton.classList.add("selected");
    removeSelected(rightButton);
    removeSelected(leftButton);
  } else if (activeCellStatus.alignMent == "end") {
    rightButton.classList.add("selected");
    removeSelected(leftButton);
    removeSelected(centerButton);
  } else {
    leftButton.classList.add("selected");
    removeSelected(centerButton);
    removeSelected(rightButton);
  }
  //   console.log(activeCellStatus.fontFamily);
  if (activeCellStatus.fontFamily === '"Times New Roman"') {
    fontFamilySelect.value = "Times New Roman";
  } else {
    fontFamilySelect.value = activeCellStatus.fontFamily;
  }

  // activeCellStatus.isUnderlined
  //     ? addSelected(underlinedButton)
  //     : removeSelected(underlinedButton);
}

function addSelected(element) {
  element.classList.add("selected");
}

function removeSelected(element) {
  element.classList.remove("selected");
}

const functionInput = document.querySelector("#function-container>div>input");
// console.log(functionInput);
functionInput.addEventListener("keyup", (e) => {
  if (!activeCell) {
    alert("Please select a cell then write");
    return;
  }

  activeCell.innerText = e.target.value;
  // console.log(e.target.value);
});

let addButton = document.getElementById("sheet-add");
const footer = document.getElementById("footer");
let count = 2;
addButton.addEventListener("click", (e) => {
  let p = document.createElement("p");
  p.addEventListener("mouseup", (e) => {
    if (e.button == 2) {
      e.target.remove();
    }
  });
  p.innerText = `sheet ${count}`;
  footer.appendChild(p);
  count++;
});

let copyfrom;
const copyButton = document.getElementById("copy");
copyButton.addEventListener("click", (e) => {
  copyfrom = activeCell;
  navigator.clipboard.writeText(activeCell.innerText);
  activeCell.style.backgroundColor = "lightblue";
});

const pasteButton = document.getElementById("paste");
pasteButton.addEventListener("click", async (e) => {
  activeCell.innerText = await navigator.clipboard.readText();
  copyfrom.style.backgroundColor = "#ecf0f1";
});
