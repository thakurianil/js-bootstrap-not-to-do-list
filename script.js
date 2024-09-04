const task = document.querySelector("#Task");
const hours = document.querySelector("#hours");

let data = [];

document.getElementById("Addtask").addEventListener("click", (event) => {
  event.preventDefault();
  const taskValue = task.value;
  const hoursValue = hours.value;
  const object = { taskValue, hoursValue, type: "entry", id: generateId() };
  data.push(object);
  //   console.log(data);
  displayList();
});

function calculateHours() {
  let savedHours = 0;
  let allocatedHours = 0;
  data.map((item) => {
    allocatedHours += parseInt(item.hoursValue);
    if (item.type == "bad") {
      savedHours += parseInt(item.hoursValue);
    }
  });
  let savedText = document.getElementById("saved");
  savedText.innerText = "You could have saved = "+savedHours+" hours";
  let allocatedText = document.getElementById("allocated");
  allocatedText.innerText = "The total hours allocated = "+allocatedHours+ " hours"
}

function swap(i) {
  let idValue = data.filter((item) => item.id == i);
  if (idValue[0].type == "bad") {
    idValue[0].type = "entry";
  } else {
    idValue[0].type = "bad";
  }

  displayList();
}

function deleteList(i) {
  let idValue = data.filter((item) => item.id !== i);
  data = idValue;
  displayList();
}

function generateId() {
  let id = "";
  const string =
    "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

  for (let i = 0; i < 6; i++) {
    const idValue = Math.floor(Math.random() * string.length);

    id += string[idValue];
    // console.log(id);
  }
  return id;
}

function displayList() {
  calculateHours();

  let entry = "";
  let entryList = document.getElementById("EntryList");
  let bad = "";
  let badList = document.getElementById("BadList");

  const displayEntryList = data.filter((item) => item.type == "entry");

  const displayBadList = data.filter((item) => item.type == "bad");

  entryList.innerHTML = displayListElement(displayEntryList, "");
  badList.innerHTML = displayListElement(displayBadList, "");
}

function displayListElement(displayEntryList, entry) {
  let direction = "right";
  displayEntryList.map((item) => {
    if (item.type == "bad") {
      direction = "left";
    }

    entry += `<tr>
                                <th scope="row">${item.id}</th>
                                <td>${item.taskValue}</td>
                                <td>${item.hoursValue}</td>
                                <td class="text-end">

                                    <button type="button" class="btn btn-danger" onclick="deleteList('${item.id}')"><i
                                            class="fa-solid fa-trash" id="delete${item.id}"></i></button>

                                    <button type="button" class="btn btn-success" onclick="swap('${item.id}')"><i
                                            class="fa-solid fa-arrow-${direction}" id="swap${item.id}"></i></button>
                                </td>
                            </tr> `;
  });
  return entry;
}
