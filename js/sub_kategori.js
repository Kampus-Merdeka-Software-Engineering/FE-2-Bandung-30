const API_URL = "https://api-revou.mrizkiw.com/data/articles/subcategory/";
const SORT_ORDER = "desc";
const SORT_BY = "publish_at";

const fetchData = async (subcategory) => {
  try {
    let response = await fetch(
      `${API_URL}${subcategory}?pageSize=100&sortOrder=${SORT_ORDER}&sortBy=${SORT_BY}`
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

  const mainLink = document.createElement("a");
  mainLink.href = `../../detail.html?id=${data[5].id}`;
  mainLink.classList.add("article-link");
  mainArticle.appendChild(mainLink);

  const mainImage = document.createElement("img");
  mainImage.classList.add("image-main-article");
  mainImage.src = data[5].img_url;
  mainLink.appendChild(mainImage);

  const mainTitle = document.createElement("h1");
  mainTitle.classList.add("news-title");
  mainTitle.textContent = data[5].title;
  mainLink.appendChild(mainTitle);

  const mainDesc = document.createElement("p");
  mainDesc.textContent = data[5].desc;
  mainTitle.appendChild(mainDesc);

  const categoryAndDateParagraph = document.createElement("p");

  const categorySpan = document.createElement("span");
  categorySpan.textContent = `${data[5].category} `;
  categorySpan.classList.add("category");
  categoryAndDateParagraph.appendChild(categorySpan);

  const publishDate = new Date(data[5].publish_at);
  const currentDate = new Date();
  const timeDifference = currentDate - publishDate;
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const publishDateSpan = document.createElement("span");
  publishDateSpan.classList.add("publish-date");
  publishDateSpan.textContent = ` • ${daysAgo} hari yang lalu`;
  categoryAndDateParagraph.appendChild(publishDateSpan);

  mainTitle.appendChild(categoryAndDateParagraph);

  mainArticle.appendChild(mainLink);
  container.appendChild(mainArticle);

  const newsSection = document.querySelector(".berita");

  for (let i = 0; i < Math.min(data.length, 5); i++) {
    const beritaTerbaru = document.createElement("article");
    beritaTerbaru.classList.add("berita-terbaru");

    const newsSectionArticle = document.createElement("article");
    newsSectionArticle.classList.add("berita-article");

    const articleLink = document.createElement("a");

    articleLink.href = `../../detail.html?id=${data[i].id}`;

    const articleImage = document.createElement("img");
    articleImage.src = data[i].img_url;
    articleLink.appendChild(articleImage);

    const articleTitle = document.createElement("h1");
    articleTitle.classList.add("terbaru-title");
    articleTitle.textContent = data[i].title;

    const publishDate = new Date(data[i].publish_at);

    const currentDate = new Date();
    const timeDifference = currentDate - publishDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));

    let timeAgoText;

    if (daysAgo > 0) {
      timeAgoText = `${daysAgo} hari yang lalu`;
    } else if (hoursAgo > 0) {
      timeAgoText = `${hoursAgo} jam yang lalu`;
    } else {
      timeAgoText = `${minutesAgo} menit yang lalu`;
    }

    const combinedInfoParagraph = document.createElement("p");

    const publishDateSpan = document.createElement("span");
    publishDateSpan.classList.add("publish-date");
    publishDateSpan.textContent = `• ${timeAgoText}`;

    combinedInfoParagraph.innerHTML = `${data[i].category}  `;
    combinedInfoParagraph.appendChild(publishDateSpan);

    articleTitle.appendChild(combinedInfoParagraph);
    articleLink.appendChild(articleTitle);

    newsSectionArticle.appendChild(articleLink);

    beritaTerbaru.appendChild(newsSectionArticle);
    newsSection.appendChild(beritaTerbaru);

    if (i === 4) {
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
