// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
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

// Menutup dropdown yang lain ketika suatu dropdown dibuka
function toggleDropdown(dropdownMenu) {
  document.querySelectorAll(".dropdown-menu").forEach(function (menu) {
    if (menu !== dropdownMenu) {
      menu.style.display = "none";
    }
  });

  // Toggle dropdown yang dipilih
  dropdownMenu.style.display =
    dropdownMenu.style.display === "none" || dropdownMenu.style.display === ""
      ? "block"
      : "none";
}

// Toggle class active untuk search form
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

// Klik di luar elemen
const sb = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});
