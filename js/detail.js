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
        <a class="category-link" href="${WEB_URL}/berita/${lowerCaseCategory}/${lowerCaseCategory}.html">${item.category}</a>
        <h1>${item.title}</h1>
        <time>Diterbitkan ${formattedDate}</time>
        <a class="referensi" href="https://www.cnnindonesia.com/">Oleh CNN INDONESIA</a>
        <img src="${item.img_url}">
        <p>${item.desc}</p>
        <a class="link-article" href="${item.source}"><p class="read-more-link"><span>Baca Selengkapnya</span></p></a>
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
