let url = window.location.search;
let params = new URLSearchParams(url);
const container = document.getElementById("container");

// Mengambil nilai "id" dari parameter URL
let articleId = params.get("id");

// Memeriksa apakah "id" tidak null sebelum melakukan permintaan API
if (articleId !== null) {
  // Fetch data for a specific article based on the "id" parameter
  fetch(`https://api-revou.mrizkiw.com/data/articles/${params.get("id")}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((detail) => {
      console.log(detail);

      // Create HTML content for the detail view
      let content = `
        <div>
          <h2>${detail.title}</h2>
          <p>${detail.desc}</p>
          <p>Category: ${detail.category}</p>
          <p>Subcategory: ${detail.subcategory}</p>
          <img src="${detail.img_url}" alt="${detail.title}" />
          <p>Publish Date: ${detail.publish_at}</p>
          <p>Source: <a href="${detail.source}" target="_blank">${detail.source}</a></p>
        </div>
      `;

      // Insert content into the container
      container.innerHTML = content;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
} else {
  console.error("Article ID is null");
}
