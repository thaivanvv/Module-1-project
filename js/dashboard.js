let users = JSON.parse(localStorage.getItem("users")) || [
  {
    id: 1,
    userName: "thai",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Active",
  },
  {
    id: 2,
    userName: "thai",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Deactivate",
  },
  {
    id: 3,
    userName: "thai",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Active",
  },
  {
    id: 1,
    userName: "thai",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Active",
  },
  {
    id: 2,
    userName: "thai",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Active",
  },
  {
    id: 3,
    userName: "thai",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Active",
  },
  {
    id: 1,
    userName: "thai",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Active",
  },
  {
    id: 2,
    userName: "thai",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Active",
  },
  {
    id: 3,
    userName: "aaa",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Deactivate",
  },
  {
    id: 1,
    userName: "thai",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Deactivate",
  },
  {
    id: 2,
    userName: "aaa",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Active",
  },
  {
    id: 3,
    userName: "aaa",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Active",
  },
  {
    id: 1,
    userName: "thai",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Deactivate",
  },
  {
    id: 2,
    userName: "thai",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Active",
  },
  {
    id: 3,
    userName: "aaa",
    email: "aaa@gmail.com",
    password: "adsadsadsad",
    role: "admin",
    birthday: "10/2/2002",
    status: "Active",
  },
];

localStorage.clear();

console.log(users);
let content = document.querySelector("#content");
let pageContent = document.querySelector(".pages-content");
let signOut = document.querySelector(".body-column-bottom");
let arrowLeft = document.querySelector(".arrow-left");
let arrowRight = document.querySelector(".arrow-right");
let btnContent = document.querySelector(".col-7");
let searchInput = document.querySelector(".dashboard-search");
let addNewUser = document.querySelector(".add-new-user-bar");
let form = document.querySelector(".edit-form");

let inputElement = searchInput.querySelector(".inputToSearch");
let iconSearch = searchInput.querySelector(".fa-magnifying-glass");

iconSearch.addEventListener("click", searchName);

function searchName() {
  let keyword = inputElement.value.trim().toLowerCase();

  if (keyword === "") {
    renderUsers(users);
    return;
  }

  let searchFilterUser = users.filter((user) =>
    user.userName.toLowerCase().includes(keyword)
  );

  renderUsers(searchFilterUser);
}

content.addEventListener("click", function (el) {
  if (el.target.classList.contains("delBtn")) {
    let index = parseInt(el.target.dataset.index);
    if (!isNaN(index)) {
      users.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users)); // Cập nhật dữ liệu
      renderUsers(users); // Render lại danh sách
    }
  }

  if (el.target.classList.contains("editBtn")) {
    let index = parseInt(el.target.dataset.index);
    if (!isNaN(index)) {
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("editUser", JSON.stringify(index));
      window.location.href = "../pages/editUser.html";
    } else {
      load_err("Xảy ra lỗi. Hãy thử lại!");
      return;
    }
  }
});

function renderId(i) {
  return "TR" + String(i).padStart(3, 0);
}

function renderUsers(userList = users) {
  let currentPage = JSON.parse(localStorage.getItem("currentPage")) || 1;
  let userPerPage = 5;
  let pageShow = (currentPage - 1) * userPerPage;
  let totalPage = Math.ceil(userList.length / userPerPage);
  let currentListUser = [];

  for (let i = pageShow; i < pageShow + 5; i++) {
    if (i < userList.length) {
      currentListUser.push(userList[i]);
    } else {
      break;
    }
  }

  let contentUser = "";
  for (let i = 0; i < currentListUser.length; i++) {
    contentUser += `
  <tr>
      <td class="col-1 td">${renderId(currentListUser[i].id)}</td>
            <td class="col-2 td">${currentListUser[i].userName}</td>
            <td class="col-3 td">${currentListUser[i].email}</td>
            <td class="col-4 td">${currentListUser[i].role}</td>
            <td class="col-5 td">${currentListUser[i].birthday}</td>
            <td class="col-6 td">
              ${renderStatus(currentListUser[i].status)}
            </td>
            <td class="col-7 td">
              <img src="../assets/icons/delete-icon.png" data-index="${pageShow} + ${i}" class="delBtn" />
              <img
                src="../assets/icons/edit-icon.png"
                class="editBtn"
                data-index="${pageShow} + ${i}"
              />
      </td>
  </tr>
  `;
  }

  content.innerHTML = contentUser;

  let pages = "";
  for (let i = 1; i <= totalPage; i++) {
    let activeClass = i === currentPage ? "active" : "";
    pages += `<button class="page ${activeClass}" value="${i}">${i}</button>`;
  }
  pageContent.innerHTML = pages;

  let listPage = document.querySelectorAll(".page");
  for (let i = 0; i < listPage.length; i++) {
    listPage[i].addEventListener("click", function () {
      let page = listPage[i].getAttribute("value");
      listPage.forEach((btn) => btn.classList.remove("active"));
      listPage[i].classList.add("active");
      if (listPage[i] === listPage.length) {
        listPage[i].classList.add("final-page");
      }
      localStorage.setItem("currentPage", page);
      renderUsers();
    });
  }
}
renderUsers();

addNewUser.addEventListener("click", function () {
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "../pages/addNewUser.html";
});

signOut.addEventListener("click", function () {
  window.location.href = "../pages/signin.html";
});

function renderStatus(status) {
  let contentStatus = "";
  if (status === "Active") {
    contentStatus += `<div class="user-status status-active">
      <div class="dot active-dot"></div>
      <span class="active">active</span>
    </div>`;
  } else if (status === "Deactivate") {
    contentStatus += `<div class="user-status status-deactivate">
      <div class="dot deactivate-dot"></div>
      <span class="deactivate">Deactivate</span>
    </div>`;
  }

  return contentStatus;
}
