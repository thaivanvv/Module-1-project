let dashboard = document.querySelector(".user-dashboard-bar-edit");
let signOut = document.querySelector(".body-column-bottom");
document.addEventListener("DOMContentLoaded", function () {
  localStorage.removeItem("editUser");
  let users = JSON.parse(localStorage.getItem("users")) || [];

  let form = document.querySelector(".edit-form");

  let activeChecked = document.querySelector(".active-checked");
  let deactivateChecked = document.querySelector(".deactivate-checked");

  if (form) {
    form.userCode.value = renderId(users.length + 1);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!checkValidate(form)) {
      return;
    }

    let statusValue = document.querySelector('input[name="status"]:checked');
    if (!statusValue) {
      alert("Please select a status");
      return;
    }

    let user = {
      userName: form.userName.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value.trim(),
      role: form.role.value.trim(),
      birthday: form.date.value.trim(),
      status: statusValue.value,
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    if (confirm("Bạn có chắc chắn muốn lưu không")) {
      window.location.href = "../pages/dashboard.html";
    }
  });

  deactivateChecked.addEventListener("change", function () {
    if (this.checked) {
      activeChecked.checked = false;
    }
  });
});

function renderId(i) {
  return "TR" + String(i).padStart(3, 0);
}

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

dashboard.addEventListener("click", function () {
  window.location.href = "../pages/dashboard.html";
});

signOut.addEventListener("click", function () {
  window.location.href = "../pages/signin.html";
});
