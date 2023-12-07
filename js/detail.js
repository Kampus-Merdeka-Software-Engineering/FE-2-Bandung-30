let url = window.location.search;
let params = new URLSearchParams(url);
const container = document.getElementById("container");

const template = (item) => {
  return `<div>
        <img src=${item.img_url}>
        <h1>${item.title}</h1>
        <p>${item.desc}</p>
        <a href="${item.source}"><p>Baca Selengkapnya >>></p></a>
     
    </div>`;
};

fetch(`https://api-revou.mrizkiw.com/data/articles/id/${params.get("id")}`)
  .then((response) => response.json())
  .then((data) => {
    let content = template(data);
    container.innerHTML = content;
  });
