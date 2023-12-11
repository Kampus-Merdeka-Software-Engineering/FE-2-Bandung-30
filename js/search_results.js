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

const API_URL = "https://api-revou.mrizkiw.com/data/articles";

let url = window.location.search;
let params = new URLSearchParams(url);
const container = document.getElementById("container");

const formatDate = (publishDate) => {
  const dateObj = new Date(publishDate);
  const currentDate = new Date();

  const timeDifference = Math.floor(
    (currentDate - dateObj) / (1000 * 60 * 60 * 24)
  );
  if (timeDifference === 0) {
    return "Hari ini";
  } else if (timeDifference === 1) {
    return "Kemarin";
  } else {
    return `${timeDifference} hari yang lalu`;
  }
};

const template = (item) => {
  const formattedDate = formatDate(item.publish_at);
  return `<div>
          <div class="box-article">
        <img src="${item.img_url}" alt="Image">
        <h1>${item.title}
        <p class="paragraf">${item.desc}</p>
        <p class="category">${item.category}<time> • ${formattedDate}</time></p>
        <a class="link-article" href="${item.source}"><p class="read-more-link"><span>Baca Selengkapnya</span></p></a>
        </h1>
        </div>
    </div>`;
};

const keyword = params.get("keyword");

if (keyword) {
  fetch(`${API_URL}/?title=${encodeURIComponent(keyword)}&pageSize=150`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item) => {
          let content = template(item);
          container.innerHTML += content;
        });
      } else {
        container.innerHTML = "<h2>Maaf, hasil tidak ditemukan</h2>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
} else {
  console.error("No search keyword found in the URL");
}
