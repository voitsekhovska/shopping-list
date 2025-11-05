"use strict";

const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => addItemToDOM(item));

  checkUI();
};

const onAddItemSubmit = (e) => {
  e.preventDefault();

  const newInput = itemInput.value;
  //   input validation
  if (newInput === "") {
    alert("Add something to the list");
    return;
  }

  // check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newInput)) {
      alert("This item already exists");
      return;
    }
  }

  // create DOM element
  addItemToDOM(newInput);

  // add item to the local storage
  addItemToStorage(newInput);

  checkUI();
};

const addItemToDOM = (item) => {
  //   create a new list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // adding li to the DOM
  itemList.appendChild(li);
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

// handler function
const onItemClick = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    // i(target) -> button -> li
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
};

const removeItem = (item) => {
  if (confirm("Are you sure?")) {
    // remove from DOM
    item.remove();

    // remove from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
};

const clearItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // remove from the storage
  localStorage.removeItem("items");

  checkUI();

  // #2 option
  // itemList.innerHTML = "";
};

const setItemToEdit = (item) => {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update item';
  formBtn.classList.add("edit-mode-btn");

  itemInput.value = item.textContent;
};

const filterItems = (e) => {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

// Storage

const addItemToStorage = (item) => {
  const itemsFromStorage = getItemsFromStorage();

  // adding a new item to array
  itemsFromStorage.push(item);

  // convert JSON to string
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = (item) => {
  let itemsFromStorage;

  // checking if there items in a storage
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();

  // filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // re-set the local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const checkIfItemExists = (item) => {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

const checkUI = () => {
  itemInput.value = "";

  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  isEditMode = false;

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.classList.remove("edit-mode-btn");
};

// initializing

const init = () => {
  // Event listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onItemClick);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
};

init();
