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
        container.innerHTML = "<p>No results found</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
} else {
  console.error("No search keyword found in the URL");
}
