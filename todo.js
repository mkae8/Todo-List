const boards = document.querySelectorAll(".board");
const todoElement = document.querySelector("#todo");
const inProgressElement = document.querySelector("#inprogress");
const stuckElement = document.querySelector("#stuck");
const doneElement = document.querySelector("#done");

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36);
};

const CardElement = (props) => {
  const { id, title, description, priority, status } = props;
  return `
    <div class="card" draggable="true" data-id=${id}>
      ${
        status === "done"
          ? `<div class="checked"><i class="fas fa-check"></i></div>`
          : `<div class="done" onclick="makeDone('${id}')"><i class="fas fa-check"></i></div>`
      }
      <div class="details">
        <h4>${title}</h4>
        <p>${description}</p>
        <div class="priority">
          ${priority}
        </div>
      </div>
      <div class="actions">
        <div class="done" onclick="remove('${id}')">
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div class="done" onclick="edit('${id}')">
          <i class="fa-solid fa-pen-to-square"></i>
        </div>
      </div>
    </div>
  `;
};

let data = [
  {
    id: uid(),
  },
];

const render = () => {
  todoElement.innerHTML = "";
  inProgressElement.innerHTML = "";
  stuckElement.innerHTML = "";
  doneElement.innerHTML = "";

  let todo = [];
  let inProgress = [];
  let stuck = [];
  let done = [];

  data.forEach((item) => {
    if (item.status === "todo") {
      todo.push(CardElement({ ...item }));
    } else if (item.status === "inprogress") {
      inProgress.push(CardElement({ ...item }));
    } else if (item.status === "stuck") {
      stuck.push(CardElement({ ...item }));
    } else if (item.status === "done") {
      done.push(CardElement({ ...item }));
    }

    document.querySelector("#todo-count").innerHTML = todo.length;
    document.querySelector("#inprogress-count").innerHTML = inProgress.length;
    document.querySelector("#stuck-count").innerHTML = stuck.length;
    document.querySelector("#done-count").innerHTML = done.length;
  });

  todo.sort((a, b) => {
    const aP = a.priority === "High" ? 3 : a.priority === "Medium" ? 2 : 1;
    const bP = b.priority === "High" ? 3 : b.priority === "Medium" ? 2 : 1;

    return aP - bP;
  });

  inProgress.sort((a, b) => {
    const aP = a.priority === "High" ? 3 : a.priority === "Medium" ? 2 : 1;
    const bP = b.priority === "High" ? 3 : b.priority === "Medium" ? 2 : 1;

    return aP - bP;
  });

  stuck.sort((a, b) => {
    const aP = a.priority === "High" ? 3 : a.priority === "Medium" ? 2 : 1;
    const bP = b.priority === "High" ? 3 : b.priority === "Medium" ? 2 : 1;

    return aP - bP;
  });

  done.sort((a, b) => {
    const aP = a.priority === "High" ? 3 : a.priority === "Medium" ? 2 : 1;
    const bP = b.priority === "High" ? 3 : b.priority === "Medium" ? 2 : 1;

    return aP - bP;
  });

  todo.forEach((item) => {
    todoElement.innerHTML += item;
  });

  inProgress.forEach((item) => {
    inProgressElement.innerHTML += item;
  });

  stuck.forEach((item) => {
    stuckElement.innerHTML += item;
  });

  done.forEach((item) => {
    doneElement.innerHTML += item;
  });

  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text", event.target.getAttribute("data-id"));
    });
  });
};

const setData = (arr) => {
  data = arr;
  render();
};

const edit = (id) => {
  const item = data.find((item) => item.id === id);
  document.querySelector("#title").value = item.title;
  document.querySelector("#description").value = item.description;
  document.querySelector("#status").value = item.status;
  document.querySelector("#priority").value = item.priority;
  document.querySelector(".backdrop").classList.add("active");

  remove(id);
};

const remove = (id) => {
  setData(data.filter((item) => item.id !== id));
};

const makeDone = (id) => {
  setData(
    data.map((item) => {
      if (item.id === id) {
        item.status = "done";
      }
      return item;
    })
  );
};

const onSubmit = (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const status = document.querySelector("#status").value;
  const priority = document.querySelector("#priority").value;

  if (title && description) {
    setData([
      ...data,
      {
        id: uid(),
        status,
        title,
        priority,
        description,
      },
    ]);

    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#status").value = "";
    document.querySelector("#priority").value = "";

    document.querySelector(".backdrop").classList.remove("active");
  }

  if (!title) {
    document.querySelector("#title").classList.add("error");
  }

  if (!description) {
    document.querySelector("#description").classList.add("error");
  }
};

render();

boards.forEach((board) => {
  board.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  board.addEventListener("drop", (event) => {
    const status = board.querySelector(".cards").id;
    const id = event.dataTransfer.getData("text");

    setData(
      data.map((item) => {
        if (item.id === id) {
          item.status = status;
        }
        return item;
      })
    );
  });
});

document.querySelector(".away").addEventListener("click", () => {
  document.querySelector(".backdrop").classList.remove("active");
});

document.querySelectorAll(".add-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".backdrop").classList.add("active");
  });
});

document.querySelector("form").addEventListener("submit", onSubmit);
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("error");
  });
});

document.querySelectorAll("textarea ").forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("error");
  });
});
