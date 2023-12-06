const fetchData = async (category) => {
  try {
    let response = await fetch(
      `https://api-revou.mrizkiw.com//data/articles/category/${category}?pageSize=100`
    );

    let data = await response.json();

    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Data is not an array");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const displayData = (data) => {
  const mainArticle = document.createElement("div");
  mainArticle.classList.add("main-article");

  const mainImage = document.createElement("img");
  mainImage.classList.add("image-main-article");
  mainImage.src = data[0].img_url;
  mainArticle.appendChild(mainImage);

  const mainTitle = document.createElement("h1");
  mainTitle.classList.add("news-title");
  mainTitle.textContent = data[0].title;
  mainArticle.appendChild(mainTitle);

  const mainDesc = document.createElement("p");
  mainDesc.textContent = data[0].desc;
  mainArticle.appendChild(mainDesc);

  const combinedInfoParagraph = document.createElement("p");

  combinedInfoParagraph.textContent = `${data[0].category} `;
  combinedInfoParagraph.style.color = "#ad2139";
  combinedInfoParagraph.style.fontSize = "14px";
  combinedInfoParagraph.style.fontWeight = "700";

  // Add publication date
  const publishDate = new Date(data[0].publish_at);
  const currentDate = new Date();
  const timeDifference = currentDate - publishDate;
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const publishDateSpan = document.createElement("span");
  publishDateSpan.classList.add("publish-date");
  publishDateSpan.textContent = `• ${daysAgo} hari yang lalu`;

  combinedInfoParagraph.appendChild(publishDateSpan);

  mainArticle.appendChild(combinedInfoParagraph);

  container.appendChild(mainArticle);

  // Display secondary articles
  const secondaryArticlesContainer = document.querySelector(
    ".secondary-articles"
  );

  for (let i = 1; i < data.length; i++) {
    const secondaryArticle = document.createElement("article");
    secondaryArticle.classList.add("secondary-article");

    const secondaryImage = document.createElement("img");
    secondaryImage.src = data[i].img_url;
    secondaryArticle.appendChild(secondaryImage);

    const secondaryTitle = document.createElement("h1");
    secondaryTitle.classList.add("secondary-title");
    secondaryTitle.textContent = data[i].title;
    secondaryArticle.appendChild(secondaryTitle);

    const combinedInfoParagraph = document.createElement("p");

    combinedInfoParagraph.textContent = `${data[0].category}`;
    combinedInfoParagraph.style.color = "#ad2139";
    combinedInfoParagraph.style.fontSize = "14px";
    combinedInfoParagraph.style.fontWeight = "700";

    // Add publication date
    const publishDate = new Date(data[0].publish_at);
    const currentDate = new Date();
    const timeDifference = currentDate - publishDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const publishDateSpan = document.createElement("span");
    publishDateSpan.classList.add("publish-date");
    publishDateSpan.textContent = `• ${daysAgo} hari yang lalu`;

    combinedInfoParagraph.appendChild(publishDateSpan);

    secondaryArticle.appendChild(combinedInfoParagraph);

    secondaryArticlesContainer.appendChild(secondaryArticle);
    if (i === 2) {
      break;
    }
  }

  const popularArticlesContainer = document.querySelector(".article-list");

  for (let i = 3; i < Math.min(data.length, 9); i++) {
    const popularArticle = document.createElement("article");
    popularArticle.classList.add("article-list-item");

    const popularImage = document.createElement("img");
    popularImage.src = data[i].img_url;
    popularArticle.appendChild(popularImage);

    const popularLink = document.createElement("a");
    popularLink.href = "#";
    popularLink.classList.add("article-header");
    popularLink.textContent = data[i].title;
    popularArticle.appendChild(popularLink);

    const categoryParagraph = document.createElement("p");
    categoryParagraph.textContent = `${data[i].category}`;
    popularArticle.appendChild(categoryParagraph);
    categoryParagraph.style.fontSize = "  12px";
    categoryParagraph.style.color = "#ad2139";
    categoryParagraph.style.fontWeight = "700";

    popularArticlesContainer.appendChild(popularArticle);
    if (i === 8) {
      break;
    }
  }

  const newsSection = document.querySelector(".berita");

  // Display berita terbaru
  for (let i = 9; i < Math.min(data.length, 14); i++) {
    const beritaTerbaru = document.createElement("article");
    beritaTerbaru.classList.add("berita-terbaru");

    const newsSectionArticle = document.createElement("article");
    newsSectionArticle.classList.add("berita-article");

    const articleImage = document.createElement("img");
    articleImage.src = data[i].img_url;
    newsSectionArticle.appendChild(articleImage);

    const articleTitle = document.createElement("h1");
    articleTitle.classList.add("terbaru-title");
    articleTitle.textContent = data[i].title;

    const publishDate = new Date(data[i].publish_at);

    const currentDate = new Date();
    const timeDifference = currentDate - publishDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const combinedInfoParagraph = document.createElement("p");

    const publishDateSpan = document.createElement("span");
    publishDateSpan.classList.add("publish-date");
    publishDateSpan.textContent = `• ${daysAgo} hari yang lalu`;

    combinedInfoParagraph.innerHTML = `${data[i].category}  `;
    combinedInfoParagraph.appendChild(publishDateSpan);

    articleTitle.appendChild(combinedInfoParagraph);
    newsSectionArticle.appendChild(articleTitle);

    beritaTerbaru.appendChild(newsSectionArticle);
    newsSection.appendChild(beritaTerbaru);
    if (i === 13) {
      break;
    }
  }

  const beritaUtamaArticlesContainer = document.querySelector(".berita-utama");

  for (let i = 14; i < Math.min(data.length, 18); i++) {
    const beritaUtamaArticle = document.createElement("article");
    beritaUtamaArticle.classList.add("berita-utama-article");

    const utamaImage = document.createElement("img");
    utamaImage.classList.add("img-utama");
    utamaImage.src = data[i].img_url;
    beritaUtamaArticle.appendChild(utamaImage);

    const utamaLink = document.createElement("a");
    utamaLink.href = "#";
    utamaLink.classList.add("article-header");
    utamaLink.textContent = data[i].title;
    beritaUtamaArticle.appendChild(utamaLink);

    beritaUtamaArticlesContainer.appendChild(beritaUtamaArticle);
    if (i === 17) {
      break;
    }
  }

  const rekomendasiBeritaArticlesContainer = document.querySelector(
    ".rekomendasi-berita"
  );

  for (let i = 18; i < Math.min(data.length, 22); i++) {
    const rekomendasiBeritaArticle = document.createElement("article");
    rekomendasiBeritaArticle.classList.add("berita-utama-article");

    const rekomendasiImage = document.createElement("img");
    rekomendasiImage.classList.add("img-utama");
    rekomendasiImage.src = data[i].img_url;
    rekomendasiBeritaArticle.appendChild(rekomendasiImage);

    const rekomendasiLink = document.createElement("a");
    rekomendasiLink.href = "#";
    rekomendasiLink.classList.add("article-header");
    rekomendasiLink.textContent = data[i].title;
    rekomendasiBeritaArticle.appendChild(rekomendasiLink);

    rekomendasiBeritaArticlesContainer.appendChild(rekomendasiBeritaArticle);

    if (i === 21) {
      break;
    }
  }
};

const displayOtomotif = async () => {
  const otomotifData = await fetchData("otomotif");
  if (otomotifData) {
    displayData(otomotifData);
  }
};

const displayGayaHidup = async () => {
  const gayaHidupData = await fetchData("Gaya Hidup");
  if (gayaHidupData) {
    displayData(gayaHidupData);
  }
};

const displayOlahraga = async () => {
  const olahragaData = await fetchData("olahraga");
  if (olahragaData) {
    displayData(olahragaData);
  }
};

const displayHiburan = async () => {
  const hiburanData = await fetchData("hiburan");
  if (hiburanData) {
    displayData(hiburanData);
  }
};

const displayTeknologi = async () => {
  const teknologiData = await fetchData("teknologi");
  if (teknologiData) {
    displayData(teknologiData);
  }
};

const displayPolitik = async () => {
  const politikData = await fetchData("politik");
  if (politikData) {
    displayData(politikData);
  }
};

const displayEkonomi = async () => {
  const ekonomiData = await fetchData("ekonomi");
  if (ekonomiData) {
    displayData(ekonomiData);
  }
};

const displayHome = async () => {
  const categories = [
    "otomotif",
    "olahraga",
    "gaya hidup",
    "hiburan",
    "teknologi",
    "politik",
    "ekonomi",
  ];
  let combinedData = [];

  for (const category of categories) {
    const categoryData = await fetchData(category);

    if (categoryData) {
      combinedData = combinedData.concat(categoryData);
    } else {
      console.error(`No data available for category: ${category}`);
    }
  }

  // Shuffle the combined data array
  combinedData = shuffleArray(combinedData);

  // Display combined data
  displayData(combinedData);
};

// Function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function submitContactUs(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  // Kirim data form ke server menggunakan Fetch API
  fetch("https://api-revou.mrizkiw.com/submit-contactus", {
    // Sesuaikan dengan URL server Anda
    method: "POST",
    //mode: 'cors', // Aktifkan mode CORS
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}

function submitFormPengaduan(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  // Kirim data form ke server menggunakan Fetch API
  fetch("https://api-revou.mrizkiw.com/submit-formpengaduan", {
    // Sesuaikan dengan URL server Anda
    method: "POST",
    //mode: 'cors', // Aktifkan mode CORS
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
}
