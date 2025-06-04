let errBox = document.createElement("div");
errBox.id = "err_box";
document.body.appendChild(errBox);

function load_err(message) {
  const errBox = document.querySelector("#err_box");

  errBox.innerHTML = `
        <div class="notice-box-err active">
            <div class="left">
                <i class="fa-brands fa-hive"></i>
            </div>
            <div class="right">
                <div class="top">
                    <span>Error</span>
                </div>
                <div class="down">
                    <span>${message}</span>
                </div>
            </div>
            <div class="close_btn">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
    `;

  setTimeout(() => {
    errBox.innerHTML = "";
  }, 1000);
}

let successBox = document.createElement("div");
successBox.id = "success-box";
document.body.appendChild(successBox);
function load_success(message) {
  const successBox = document.querySelector("#success-box");

  successBox.innerHTML = `
    <div class="notice_box_success active">
        <div class="left">
            <img src="../assets/icons/check_icon.png">
        </div>
        <div class="right">
            <span>${message}</span>
        </div>
    </div>
    `;

  setTimeout(() => {
    successBox.innerHTML = "";
  }, 3000);
}
