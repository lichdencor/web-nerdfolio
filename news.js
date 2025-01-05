// Fetch the news JSON data and render the news items
fetch("/news.json")
  .then((response) => response.json())
  .then((newsData) => {
    const newsList = document.getElementById("news-list");

    newsData.forEach((item) => {
      const newsItem = document.createElement("div");
      newsItem.classList.add("news-item");

      newsItem.innerHTML = `
        <h3>${item.title}</h3>
        <p><strong>Date:</strong> ${item.date}</p>
        <p>${item.description}</p>
        <a href="${item.link}">Read More</a>
      `;

      newsList.appendChild(newsItem);
    });
  })
  .catch((error) => console.error("Error loading news:", error));
