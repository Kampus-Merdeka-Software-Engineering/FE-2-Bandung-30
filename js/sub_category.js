const fetchData = async (subcategory) => {
  try {
    let response = await fetch(
      `https://api-revou.mrizkiw.com//data/articles/subcategory/${subcategory}?pageSize=100`
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
  // Display main article
  const mainArticle = document.createElement("div");
  mainArticle.classList.add("main-article");

  const mainImage = document.createElement("img");
  mainImage.classList.add("image-main-article");
  mainImage.src = data[0].img_url;
  mainArticle.appendChild(mainImage);

  const mainTitle = document.createElement("h1");
  mainTitle.classList.add("news-title");

  const titleText = document.createTextNode(data[0].title);
  mainTitle.appendChild(titleText);

  const mainDesc = document.createElement("p");
  mainDesc.classList.add("main-description");
  mainDesc.textContent = data[0].desc;
  mainTitle.appendChild(mainDesc);

  const categoryAndDateParagraph = document.createElement("p");

  const categorySpan = document.createElement("span");
  categorySpan.textContent = `${data[0].category} `;
  categorySpan.style.color = "#ad2139";
  categorySpan.style.fontSize = "14px";
  categorySpan.style.fontWeight = "700";
  categoryAndDateParagraph.appendChild(categorySpan);

  const publishDate = new Date(data[0].publish_at);
  const currentDate = new Date();
  const timeDifference = currentDate - publishDate;
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const publishDateSpan = document.createElement("span");
  publishDateSpan.classList.add("publish-date");
  publishDateSpan.textContent = ` • ${daysAgo} hari yang lalu`;
  categoryAndDateParagraph.appendChild(publishDateSpan);

  mainTitle.appendChild(categoryAndDateParagraph);

  mainArticle.appendChild(mainTitle);
  container.appendChild(mainArticle);

  //display news section

  const newsSection = document.querySelector(".berita");

  for (let i = 1; i < data.length; i++) {
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

    if (i === 5) {
      break;
    }
  }
};

const displayTeknologiInformasi = async () => {
  const data = await fetchData("Teknologi Informasi");
  if (data) {
    displayData(data);
  }
};

const displaySains = async () => {
  const data = await fetchData("Sains");
  if (data) {
    displayData(data);
  }
};

const displayTelekomunikasi = async () => {
  const data = await fetchData("Telekomunikasi");
  if (data) {
    displayData(data);
  }
};

const displayTren = async () => {
  const data = await fetchData("Tren");
  if (data) {
    displayData(data);
  }
};

const displayMobil = async () => {
  const data = await fetchData("Mobil");
  if (data) {
    displayData(data);
  }
};

const displayMotor = async () => {
  const data = await fetchData("Motor");
  if (data) {
    displayData(data);
  }
};

const displayFilm = async () => {
  const data = await fetchData("Film");
  if (data) {
    displayData(data);
  }
};

const displayMusik = async () => {
  const data = await fetchData("Musik");
  if (data) {
    displayData(data);
  }
};

const displaySelebriti = async () => {
  const data = await fetchData("Selebriti");
  if (data) {
    displayData(data);
  }
};

const displayHealth = async () => {
  const data = await fetchData("Health");
  if (data) {
    displayData(data);
  }
};

const displayFood = async () => {
  const data = await fetchData("Food");
  if (data) {
    displayData(data);
  }
};

const displayTravel = async () => {
  const data = await fetchData("Travel");
  if (data) {
    displayData(data);
  }
};

const displayInfoPolitik = async () => {
  const data = await fetchData("Info politik");
  if (data) {
    displayData(data);
  }
};

const displayHukumKriminal = async () => {
  const data = await fetchData("Hukum Kriminal");
  if (data) {
    displayData(data);
  }
};

const displayPeristiwa = async () => {
  const data = await fetchData("Peristiwa");
  if (data) {
    displayData(data);
  }
};

const displayKeuangan = async () => {
  const data = await fetchData("Keuangan");
  if (data) {
    displayData(data);
  }
};

const displayEnergi = async () => {
  const data = await fetchData("Energi");
  if (data) {
    displayData(data);
  }
};

const displayBisnis = async () => {
  const data = await fetchData("Bisnis");
  if (data) {
    displayData(data);
  }
};

const displaySepakbola = async () => {
  const data = await fetchData("Sepakbola");
  if (data) {
    displayData(data);
  }
};

const displayMotoGP = async () => {
  const data = await fetchData("Moto GP");
  if (data) {
    displayData(data);
  }
};

const displayBadminton = async () => {
  const data = await fetchData("Badminton");
  if (data) {
    displayData(data);
  }
};
