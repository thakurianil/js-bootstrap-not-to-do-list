const task = document.querySelector("#Task");
const hours = document.querySelector("#hours");

// let data = [];
const displayDataFromLocalStorage = () => {
  let tempData = JSON.parse(localStorage.getItem("data"));

  data = tempData ? tempData : [];
  displayList();
};

document.getElementById("Addtask").addEventListener("click", (event) => {
  event.preventDefault();
  const taskValue = task.value;
  const hoursValue = +hours.value;
  const object = {
    taskValue,
    hoursValue,
    type: "entry",
    id: generateId(),
    isSelected: false,
  };
  data.push(object);
  displayList();
  const toastLiveExample = document.getElementById("liveToast");

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();

  const loadAddSound = document.getElementById("addSound");
  const loadDeleteSOund = document.getElementById("deleteSound");

  toastBootstrap.show();
  loadAddSound.play();
});
function selected(e) {
  let selectedId = e.value;
  let selectedChecked = e.checked;
  let taskFound = data.find((item) => item.id == selectedId);
  taskFound.isSelected = selectedChecked;
}

function calculateHours() {
  let savedHours = data.reduce((acc, item) => {
    if (item.type == "bad") {
      return acc + item.hoursValue;
    } else {
      return acc + 0;
    }
  }, 0);

  let allocatedHours = data.reduce((acc, item) => {
    return acc + item.hoursValue;
  }, 0);
  let savedText = document.getElementById("saved");
  savedText.innerText = "You could have saved = " + savedHours + " hours";
  let allocatedText = document.getElementById("allocated");
  allocatedText.innerText =
    "The total hours allocated = " + allocatedHours + " hours";
}

function swap(i) {
  let idValue = data.find((item) => item.id == i);
  idValue.type = idValue.type == "entry" ? "bad" : "entry";
  displayList();
}

function deleteList(i) {
  data = data.filter((item) => item.id !== i);
  const toastLiveExample = document.getElementById("liveToast");

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  const loadDeleteSOund = document.getElementById("deleteSound");

  toastBootstrap.show();
  loadDeleteSOund.play();
  displayList();
}

function generateId() {
  let id = "";
  const string =
    "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

  for (let i = 0; i < 6; i++) {
    const idValue = Math.floor(Math.random() * string.length);
    id += string[idValue];
  }
  return id;
}

function displayList() {
  localStorage.setItem("data", JSON.stringify(data));

  let entryList = document.getElementById("EntryList");
  let badList = document.getElementById("BadList");

  const displayEntryList = data.filter((item) => item.type == "entry");

  const displayBadList = data.filter((item) => item.type == "bad");

  entryList.innerHTML = displayListElement(displayEntryList, "");
  badList.innerHTML = displayListElement(displayBadList, "");
  calculateHours();
}
function deleteSelected() {
  let deleteList = data.filter((item) => item.isSelected !== true);
  data = deleteList;
  const toastLiveExample = document.getElementById("liveToast");

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  const loadDeleteSOund = document.getElementById("deleteSound");

  toastBootstrap.show();
  loadDeleteSOund.play();
  displayList();
}
function swapSelected(e) {
  console.log(e.value);

  let swapList = data.filter((item) => item.isSelected == true);
  console.log(swapList);
  swapList.forEach((item) => {
    if (e.value == "bad") {
      item.type = "entry";
      item.isSelected = false;
    } else {
      item.type = "bad";
      item.isSelected = false;
    }
  });

  displayList();
}

function selectedAll(e) {
  let selectedValue = e.value;

  let selectedChecked = e.checked;

  console.log(selectedChecked);

  let selectedAllList = data.filter((item) => {
    if (item.type == selectedValue && selectedChecked == true) {
      item.isSelected = true;
    } else {
      item.isSelected = false;
    }
  });

  displayList();

  // console.log(selectedAllList);

  // let taskFound = data.find(item=>item.id==selectedId);
  // taskFound.isSelected = selectedChecked;
}
function displayListElement(displayEntryList, entry) {
  let direction = "right";
  displayEntryList.map((item) => {
    if (item.type == "bad") {
      direction = "left";
    }

    entry += `<tr>
                                <th scope="row">${item.id}</th>
                                <td><input type="checkbox" onchange="selected(this)" value="${
                                  item.id
                                }"  ${item?.isSelected ? "checked" : ""}></td>
                                <td>${item.taskValue}</td>
                                <td>${item.hoursValue}</td>
                                <td class="text-end">

                                    <button type="button" class="btn btn-danger" onclick="deleteList('${
                                      item.id
                                    }')"><i
                                            class="fa-solid fa-trash" id="delete${
                                              item.id
                                            }"></i></button>

                                    <button type="button" class="btn btn-success" onclick="swap('${
                                      item.id
                                    }')"><i
                                            class="fa-solid fa-arrow-${direction}" id="swap${
      item.id
    }"></i></button>
                                </td>
                            </tr> `;
  });
  return entry;
}

displayDataFromLocalStorage();
