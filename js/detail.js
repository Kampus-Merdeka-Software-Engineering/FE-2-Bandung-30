const API_URL = "https://api-revou.mrizkiw.com/data/articles";
const WEB_URL =
  "https://kampus-merdeka-software-engineering.github.io/FE-2-Bandung-30";

let url = window.location.search;
let params = new URLSearchParams(url);
const container = document.getElementById("container");

const formatDate = (publishDate) => {
  const dateObj = new Date(publishDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return dateObj.toLocaleDateString("id-ID", options);
};

const template = (item) => {
  const formattedDate = formatDate(item.publish_at);
  const lowerCaseCategory = item.category.toLowerCase();

  return `<div>
  <a class="category-link" href="${WEB_URL}/berita/${item.category
    .replace(/\s+/g, "_")
    .toLowerCase()}/${item.category.replace(/\s+/g, "_").toLowerCase()}.html">${
    item.category
  }</a>
        <h1>${item.title}</h1>
        <time>Diterbitkan ${formattedDate}</time>
        <a class="referensi" href="https://www.cnnindonesia.com/">Oleh CNN INDONESIA</a>
        <img src="${item.img_url}">
        <p>${item.desc}</p>
        <a class="link-article" href="${
          item.source
        }"><p class="read-more-link"><span>Baca Selengkapnya</span></p></a>
    </div>`;
};

const idParam = params.get("id");
if (idParam) {
  fetch(`${API_URL}/id/${idParam}`)
    .then((response) => response.json())
    .then((data) => {
      let content = template(data);
      container.innerHTML = content;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
} else {
  console.error("No 'id' parameter found in the URL");
}

const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
};

const sb = document.querySelector("#search-button");

document.addEventListener("click", function (e) {
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }
});

searchBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();

    const keyword = searchBox.value.trim();
    if (keyword !== "") {
      window.location.href = `../berita/search_results.html?keyword=${encodeURIComponent(
        keyword
      )}`;
    }
  }
});

async function performSearch(keyword) {
  let searchResults;

  try {
    const apiUrl = `${API_URL}/?title=${encodeURIComponent(
      keyword
    )}&pageSize=150`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    searchResults = await response.json();

    displaySearchResults(searchResults);
  } catch (error) {
    console.error("Error during search:", error);
  }
}

function displaySearchResults(results) {
  const resultList = document.getElementById("search-results-list");
  resultList.innerHTML = "";

  results.forEach((article) => {
    const resultContainer = document.createElement("div");
    const content = template(article);

    resultContainer.innerHTML = content;
    resultList.appendChild(resultContainer);
  });
}
