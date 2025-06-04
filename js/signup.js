let users = JSON.parse(localStorage.getItem("users")) || [];

localStorage.removeItem("users");
let form = document.querySelector(".form-sign-up");

form.onsubmit = function (e) {
  e.preventDefault();

  if (checkValidate(form)) {
    // trước khi tạo tài khoản dùng array.some() để kiểm tra xem tk khoản đã được đăng ký chưa
    if (users.some((u) => u.email === form.email.value)) {
      load_err("This email is already registered");
      return;
    };

    let newUser = {
      id: users.length + 1,
      email: form.email.value,
      username: form.username.value,
      password: form.password.value,
      role: null,
      status: null,
      birthday: null,
    };
    users.push(newUser);
    load_success("Signing up successfully");
    localStorage.setItem("users", JSON.stringify(users));

    form.email.value = "";
    form.username.value = "";
    form.password.value = "";
    setTimeout(() => {
      if (confirm("Do you want go to sign in of page")) {
        setTimeout(() => {
          window.location.href = "../pages/signin.html";
        }, 1000);
      }
    }, 2000);
  }
};

function checkValidate(form) {
  let check = true;
  if (
    form.email.value === "" &&
    form.username.value === "" &&
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

  if (form.username.value === "") {
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
  } else if (!validPassword(form.password.value)) {
    load_err(
      "The password must have at least one uppercase letter, one lowercase letter, and one number"
    );
    check = false;
    return check;
  }

  return check;
}

function validEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function validPassword(password) {
  return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}
