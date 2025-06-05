document.addEventListener("DOMContentLoaded", function () {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let index = JSON.parse(localStorage.getItem("editUser"));

  let form = document.querySelector(".edit-form");

  let activeChecked = document.querySelector(".active-checked");
  let deactivateChecked = document.querySelector(".deactivate-checked");

  if (users[index].status === "Active") {
    activeChecked.checked = true;
    deactivateChecked.checked = false;
  } else if (users[index].status === "Deactivate") {
    activeChecked.checked = false;
    deactivateChecked.checked = true;
  }

  if (users[index] && form) {
    form.userCode.value = renderId(users[index].id);
    form.userName.value = users[index].userName;
    form.email.value = users[index].email;
    form.password.value = users[index].password;
    form.role.value = users[index].role;
    form.date.value = users[index].birthday;
    form.status.value = users[index].status;
  }

  form.addEventListener("click", function (el) {
    el.preventDefault();
    if (el.target.classList.contains("backBtn")) {
      if (confirm("Bạn có chắc muốn hủy bỏ thay đổi?")) {
        window.location.href = "../pages/dashboard.html";
      }
    }

    if (el.target.classList.contains("saveBtn")) {
      if (checkValidate(form)) {
        users[index].userName = form.userName.value.trim();
        users[index].email = form.email.value.trim();
        users[index].password = form.password.value.trim();
        users[index].role = form.role.value.trim();
        users[index].birthday = form.date.value.trim();
        // const rawDate = form.date.value.trim();
        // users[index].birthday = formatToDDMMYYYY(rawDate);
        users[index].status = form.status.value.trim();

        localStorage.setItem("users", JSON.stringify(users));

        if (confirm("Bạn có chắc chắn muốn lưu không")) {
          window.location.href = "../pages/dashboard.html";
        }
      }
    }
  });

  activeChecked.addEventListener("change", function () {
    if (this.checked) {
      deactivateChecked.checked = false;
    }
  });

  deactivateChecked.addEventListener("change", function () {
    if (this.checked) {
      activeChecked.checked = false;
    }
  });
});

let dashboardBack = document.querySelector(".user-dashboard-bar-edit");
dashboardBack.addEventListener("click", function () {
  window.location.href = "../pages/dashboard.html";
});

function renderId(i) {
  return "TR" + String(i).padStart(3, 0);
}

// function formatToDDMMYYYY(dateString) {
//   if (!dateString) return "";
//   const [year, month, day] = dateString.split("-");
//   return `${day}/${month}/${year}`;
// }

function checkValidate(form) {
  let check = true;
  if (
    form.email.value === "" &&
    form.userName.value === "" &&
    form.password.value == ""
  ) {
    load_err("Please fill in fields");
    check = false;
    return check;
  }

  if (form.email.value === "") {
    load_err("Email cannot be empty");
    check = false;
    return check;
  } else if (!validEmail(form.email.value)) {
    load_err("Invalid email");
    check = false;
    return check;
  }

  if (form.userName.value === "") {
    load_err("Username cannot be empty");
    check = false;
    return check;
  }

  if (form.password.value === "") {
    load_err("Password cannot be empty");
    check = false;
    return check;
  } else if (form.password.value.length < 8) {
    load_err("Please, the password must be over 8 characters");
    check = false;
    return check;
  }

  return check;
}

function validEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
