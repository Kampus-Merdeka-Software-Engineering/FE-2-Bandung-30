const container = document.getElementById("container");

const template = (item) => {
  return `
    <div>
      <a href="./detail.html?id=${item.id}">
        <p>Title: ${item.title}</p>
      </a>
    </div>
  `;
};

fetch("https://api-revou.mrizkiw.com/data/articles")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Raw Data:", data); // Tambahkan log untuk melihat struktur data

    if (data && data.data && Array.isArray(data.data)) {
      let formattedData = data.data.map((item) => {
        return {
          id: item.id,
          title: item.title,
          desc: item.description,
          category: item.category,
          subcategory: item.subcategory,
          img_url: item.image_url,
          publish_at: item.published_at,
          source: item.source_url,
        };
      });

      console.log("Formatted Data:", formattedData); // Tambahkan log untuk melihat data yang sudah diformat

      // Gabungkan template dengan data yang sudah diformat
      let content = formattedData.map((item) => template(item)).join("");

      // Masukkan konten ke dalam elemen kontainer
      container.innerHTML = content;
    } else {
      throw new Error("Invalid data format");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
