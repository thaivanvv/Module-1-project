let users = JSON.parse(localStorage.getItem("users")) || [];

let form = document.querySelector(".form-sign-up");

form.onsubmit = function (e) {
  e.preventDefault();

  if (checkValidate(form)) {
    // trước khi tạo tài khoản dùng array.some() để kiểm tra xem tk khoản đã được đăng ký chưa
    if (users.some((u) => u.email === form.email.value)) {
      load_err("Email này đã tồn tại");
      return;
    };

    let newUser = {
      id: users.length + 1,
      email: form.email.value,
      username: form.username.value,
      password: form.password.value,
      role: "",
      status: "",
      birthday: "",
    };
    users.push(newUser);
    load_success("Đăng nhập thành công");
    localStorage.setItem("users", JSON.stringify(users));

    form.email.value = "";
    form.username.value = "";
    form.password.value = "";
    setTimeout(() => {
      if (confirm("Bạn có muốn chuyển qua trang đăng nhập không")) {
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
    load_err("Hãy điền vào tất cả các ô");
    check = false;
    return check;
  }

  if (form.email.value === "") {
    load_err("Email không được để trống");
    check = false;
    return check;
  } else if (!validEmail(form.email.value)) {
    load_err("Email không đúng");
    check = false;
    return check;
  }

  if (form.username.value === "") {
    load_err("Tên người dùng không được để trống");
    check = false;
    return check;
  }

  if (form.password.value === "") {
    load_err("Mật khẩu không được để trống");
    check = false;
    return check;
  } else if (form.password.value.length < 8) {
    load_err("Mật khẩu không phải trên 8 chữ số");
    check = false;
    return check;
  } else if (!validPassword(form.password.value)) {
    load_err(
      "mật khẩu phải có ít nhất một chữ in hoa va số"
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
