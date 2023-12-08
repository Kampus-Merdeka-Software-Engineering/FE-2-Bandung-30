const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

document
  .querySelectorAll(".dropdown-toggle")
  .forEach(function (dropdownToggle) {
    dropdownToggle.addEventListener("click", function () {
      var dropdownMenu = this.parentElement.querySelector(".dropdown-menu");
      toggleDropdown(dropdownMenu);
    });
  });

function toggleDropdown(dropdownMenu) {
  document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
    if (menu !== dropdownMenu) {
      menu.style.display = "none";
    }
  });

  dropdownMenu.style.display =
    dropdownMenu.style.display === "none" || dropdownMenu.style.display === ""
      ? "block"
      : "none";
}

function submitContactUs(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  fetch("https://api-revou.mrizkiw.com/submit-contactus", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => response.text())
    .then((data) => {
      Swal.fire({
        icon: "success",
        title: "Terima Kasih!",
        text: "Pesan Anda telah berhasil dikirim.",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan. Silakan coba lagi.",
      });
    });
}

function submitFormPengaduan(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  fetch("https://api-revou.mrizkiw.com/submit-formpengaduan", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => {
      if (response.ok) {
        return response.text().then((data) => {
          Swal.fire({
            title: "Terima Kasih!",
            text: "Keluhan Anda sangat berarti bagi kami. Kami akan segera menindaklanjuti dan memberikan tanggapan.",
            icon: "success",
          });
        });
      } else {
        return response.json().then((errorData) => {
          Swal.fire({
            title: "Error",
            text: "Nomor telepon harus berupa angka dan dimulai dengan 08 serta minimal 10 angka dan tidak lebih dari 15 angka.",
            icon: "error",
          });
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);

      Swal.fire({
        title: "Error",
        text: "Nomor telepon harus berupa angka dan dimulai dengan 08 serta minimal 10 angka dan tidak lebih dari 15 angka.",
        icon: "error",
      });
    });
}
