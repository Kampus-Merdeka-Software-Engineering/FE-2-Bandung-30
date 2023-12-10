const API_URL = "https://api-revou.mrizkiw.com/data/articles/category/";
const SORT_ORDER = "desc";
const SORT_BY = "publish_at";

const fetchData = async (category) => {
  try {
    let response = await fetch(
      `${API_URL}${category}?pageSize=100&sortOrder=${SORT_ORDER}&sortBy=${SORT_BY}`
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
  mainLink.href = `../../detail.html?id=${data[0].id}`;
  mainLink.classList.add("article-link");
  mainArticle.appendChild(mainLink);

  const mainImage = document.createElement("img");
  mainImage.classList.add("image-main-article");
  mainImage.src = data[0].img_url;
  mainLink.appendChild(mainImage);

  const mainTitle = document.createElement("h1");
  mainTitle.classList.add("news-title");
  mainTitle.textContent = data[0].title;
  mainLink.appendChild(mainTitle);

  const mainDesc = document.createElement("p");
  mainDesc.textContent = data[0].desc;
  mainArticle.appendChild(mainDesc);

  const combinedInfoParagraph = document.createElement("p");
  combinedInfoParagraph.classList.add("category");
  combinedInfoParagraph.textContent = `${data[0].category} `;

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

  const secondaryArticlesContainer = document.querySelector(
    ".secondary-articles"
  );

  for (let i = 11; i < Math.min(data.length, 13); i++) {
    const secondaryArticle = document.createElement("article");
    secondaryArticle.classList.add("secondary-article");

    const secondaryLink = document.createElement("a");
    secondaryLink.href = `../../detail.html?id=${data[i].id}`;
    secondaryLink.classList.add("article-link");
    secondaryArticle.appendChild(secondaryLink);

    const secondaryImage = document.createElement("img");
    secondaryImage.classList.add("image-secondary-article");
    secondaryImage.src = data[i].img_url;
    secondaryLink.appendChild(secondaryImage);

    const secondaryTitle = document.createElement("h1");
    secondaryTitle.classList.add("secondary-title");
    secondaryTitle.textContent = data[i].title;
    secondaryLink.appendChild(secondaryTitle);

    const combinedInfoParagraph = document.createElement("p");

    combinedInfoParagraph.textContent = `${data[i].category}`;

    const publishDate = new Date(data[i].publish_at);
    const currentDate = new Date();
    const timeDifference = currentDate - publishDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const publishDateSpan = document.createElement("span");
    publishDateSpan.classList.add("publish-date");
    publishDateSpan.textContent = ` • ${daysAgo} hari yang lalu`;

    combinedInfoParagraph.appendChild(publishDateSpan);

    secondaryArticle.appendChild(combinedInfoParagraph);

    secondaryArticlesContainer.appendChild(secondaryArticle);
    if (i === 12) {
      break;
    }
  }

  const popularArticlesContainer = document.querySelector(".article-list");

  for (let i = 6; i < Math.min(data.length, 11); i++) {
    const popularArticle = document.createElement("article");
    popularArticle.classList.add("article-list-item");

    const popularLink = document.createElement("a");
    popularLink.href = `../../detail.html?id=${data[i].id}`;
    popularLink.classList.add("article-link");
    popularArticle.appendChild(popularLink);

    const popularImage = document.createElement("img");
    popularImage.src = data[i].img_url;
    popularLink.appendChild(popularImage);

    const popularTitle = document.createElement("h1");
    popularTitle.textContent = data[i].title;
    popularLink.appendChild(popularTitle);

    const categoryParagraph = document.createElement("p");
    categoryParagraph.textContent = `${data[i].category}`;
    popularArticle.appendChild(categoryParagraph);
    categoryParagraph.style.fontSize = "12px";
    categoryParagraph.style.color = "#ad2139";
    categoryParagraph.style.fontWeight = "700";

    popularArticlesContainer.appendChild(popularArticle);
    if (i === 10) {
      break;
    }
  }

  const newsSection = document.querySelector(".berita");

  for (let i = 1; i < Math.min(data.length, 6); i++) {
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

    const combinedInfoParagraph = document.createElement("p");

    const publishDateSpan = document.createElement("span");
    publishDateSpan.classList.add("publish-date");
    publishDateSpan.textContent = `• ${daysAgo} hari yang lalu`;

    combinedInfoParagraph.innerHTML = `${data[i].category}  `;
    combinedInfoParagraph.appendChild(publishDateSpan);

    articleTitle.appendChild(combinedInfoParagraph);
    articleLink.appendChild(articleTitle);

    newsSectionArticle.appendChild(articleLink);

    beritaTerbaru.appendChild(newsSectionArticle);
    newsSection.appendChild(beritaTerbaru);

    if (i === 5) {
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
