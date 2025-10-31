"use strict";

const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

const addItem = (e) => {
  e.preventDefault();

  const newInput = itemInput.value;
  //   input validation
  if (newInput === "") {
    alert("Add something to the list");
    return;
  }

  //   create a new list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newInput));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // adding li to the DOM
  itemList.appendChild(li);
  checkUI();

  itemInput.value = "";
};

const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;

  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);

  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
};

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      // i(target) -> button -> li
      e.target.parentElement.parentElement.remove();

      checkUI();
    }
  }
};

const clearItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
  
  // #2 option
  // itemList.innerHTML = "";
};

const checkUI = () => {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
};

// Event listeners

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);

checkUI();
