let users = JSON.parse(localStorage.getItem("users")) || [
  {
    id: 1,
    userName: "thai",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 2,
    userName: "thai",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 3,
    userName: "thai",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 1,
    userName: "thai",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 2,
    userName: "thai",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 3,
    userName: "thai",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 1,
    userName: "thai",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 2,
    userName: "thai",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 3,
    userName: "aaa",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 1,
    userName: "thai",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 2,
    userName: "aaa",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 3,
    userName: "aaa",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 1,
    userName: "thai",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 2,
    userName: "thai",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
  {
    id: 3,
    userName: "aaa",
    email: "aaa@gmail.com",
    role: "admin",
    birthday: "10/2/2002",
  },
];

localStorage.clear();

console.log(users);
let content = document.querySelector("#content");
let pageContent = document.querySelector(".pages-content");
let signOut = document.querySelector(".body-column-bottom");
let arrowLeft = document.querySelector(".arrow-left");
let btnContent = document.querySelector(".col-7");
let searchInput = document.querySelector(".dashboard-search");

arrowLeft.addEventListener("click", function () {
  alert("error");
});

function renderUsers() {
  let currentPage = JSON.parse(localStorage.getItem("currentPage")) || 1;
  let userPerPage = 5;
  let pageShow = (currentPage - 1) * userPerPage;
  let totalPage = Math.ceil(users.length / userPerPage);
  let currentListUser = [];

  let inputElement = searchInput.querySelector("input");
  let iconSearch = searchInput.querySelector(".fa-magnifying-glass");

  iconSearch.addEventListener("click", searchName);

  function searchName() {
    let keyword = inputElement.value.trim().toLowerCase();

    let searchFilterUser = users.filter((user) =>
      user.userName.toLowerCase().includes(keyword)
    );

    renderFilteredUserName(searchFilterUser);
    renderId();
  }

  for (let i = pageShow; i < pageShow + 5; i++) {
    if (i < users.length) {
      currentListUser.push(users[i]);
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
              <div class="user-status status-active">
                <div class="dot active-dot"></div>
                <span class="active">active</span>
              </div>
            </td>
            <td class="col-7 td">
              <img src="../assets/icons/delete-icon.png" class="delBtn" />
              <img
                src="../assets/icons/edit-icon.png"
                class="editBtn"
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
      localStorage.setItem("currentPage", page);
      renderUsers();
    });
  }

}

function renderFilteredUserName(userList) {
  let contentSearch = "";
  userList.forEach((el) => {
    contentSearch += `<tr>
      <td class="col-1 td">${renderId(el.id)}</td>
      <td class="col-2 td">${el.userName}</td>
      <td class="col-3 td">${el.email}</td>
      <td class="col-4 td">${el.role}</td>
      <td class="col-5 td">${el.birthday}</td>
      <td class="col-6 td">
        <div class="user-status status-active">
          <div class="dot active-dot"></div>
          <span class="active">active</span>
        </div>
      </td>
      <td class="col-7 td">
        <img src="../assets/icons/delete-icon.png" class="delBtn" />
        <img src="../assets/icons/edit-icon.png" class="editBtn" />
      </td>
    </tr>`;
  });

  content.innerHTML = contentSearch;
}


renderUsers();

function renderId(i) {
  return "TR" + String(i).padStart(3, 0);
}

signOut.addEventListener("click", function () {
  window.location.href = "../pages/signin.html";
});
