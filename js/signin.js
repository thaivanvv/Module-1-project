let users = JSON.parse(localStorage.getItem("users")) || [];
// Lấy tài khoản vừa đăng ký từ sign up. sau khi lấy thì xóa thông tin tài khoản để không bị thấy 
localStorage.clear();

let form = document.querySelector(".form-sign-in");

console.log(users);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let emailToCheck = form.email.value;
  let passwordToCheck = form.password.value;
  let index = users.findIndex((el) => el.email === emailToCheck);

  if (checkValidate(form)) {
    if (index !== -1) {
      if (passwordToCheck === users[index].password) {
        load_success("Đăng nhập thành công");
        setTimeout(() => {
          window.location.href = "../pages/dashboard.html";
        }, 2000);
      } else {
        load_err("Mật khẩu không chính xác");
        return;
      }
    } else {
      load_err("Tài khoản Email không tồn tại");
      return;
    }
  }

  form.email.value = "";
  form.password.value = "";
  localStorage.setItem("users",JSON.stringify(users));
});

function checkValidate(form) {
  let check = true;
  if (
    form.email.value === "" &&
    form.password.value == ""
  ) {
    load_err("Hãy điền vào các ô");
    check = false;
    return check;
  }

  if (form.email.value === "") {
    load_err("Email không được để trống");
    check = false;
    return check;
  }

  if (form.password.value === "") {
    load_err("Password không được để trống");
    check = false;
    return check;
  }

  return check;
}