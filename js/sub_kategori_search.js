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
      window.location.href = `../search_results.html?keyword=${encodeURIComponent(
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
