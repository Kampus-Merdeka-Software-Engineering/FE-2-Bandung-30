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

const displayContainer = async () => {
  try {
    let response = await fetch("https://api-revou.mrizkiw.com/data/articles");
    let data = await response.json();

    if (Array.isArray(data)) {
      console.log(data);

      const title = document.createElement("h1");
      title.textContent = data[1].title;
      container.replaceChild(title, container.childNodes[0]);

      const animeImage = document.createElement("img");
      animeImage.src = data[1].img_url;
      container.appendChild(animeImage);

      const desc = document.createElement("p");
      desc.textContent = data[1].desc;
      container.appendChild(desc);
    } else {
      console.error("Data is not an array");
    }
  } catch (error) {
    document.getElementById("container").innerHTML = JSON.stringify(error);
  }
};

displayContainer();

function submitContactUs(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  // Kirim data form ke server menggunakan Fetch API
  fetch("https://api-revou.mrizkiw.com/submit-contactus", {
    // Sesuaikan dengan URL server Anda
    method: "POST",
    //mode: 'cors', // Aktifkan mode CORS
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}

function submitFormPengaduan(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  // Kirim data form ke server menggunakan Fetch API
  fetch("https://api-revou.mrizkiw.com/submit-formpengaduan", {
    // Sesuaikan dengan URL server Anda
    method: "POST",
    //mode: 'cors', // Aktifkan mode CORS
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}