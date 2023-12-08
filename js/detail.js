const API_URL = "https://api-revou.mrizkiw.com/data/articles";

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
  return `<div>
        <a "href="#" class="category-link">${item.category}</a>
        <h1>${item.title}</h1>
        <time>Diterbitkan ${formattedDate}</time>
        <p class="referensi">Oleh CNN INDONESIA</p>
        <img src="${item.img_url}">
        <p>${item.desc}</p>
        <a class="link-article" href="${item.source}"><p class="read-more-link"><span>Baca Selengkapnya</span></p></a>
    </div>`;
};

fetch(`${API_URL}/id/${params.get("id")}`)
  .then((response) => response.json())
  .then((data) => {
    let content = template(data);
    container.innerHTML = content;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
