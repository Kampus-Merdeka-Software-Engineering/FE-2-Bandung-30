const API_URL = "https://api-revou.mrizkiw.com/data/articles";

let url = window.location.search;
let params = new URLSearchParams(url);
const container = document.getElementById("container");

const template = (item) => {
  return `<div>
        <img src="${item.img_url}" alt="Image">
        <h1>${item.title}</h1>
        <p>${item.desc}</p>
        <a href="${item.source}"><p>Baca Selengkapnya >>></p></a>
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
        container.innerHTML = "<p>No results found</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
} else {
  console.error("No search keyword found in the URL");
}
