// load categories
const categories = async () => {
  const category = document.getElementById("categories");
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  )
    .then((res) => res.json())
    .then((data) => {
      let item = data.categories.map((cate) => cate.category);
      item.forEach((categoryName) => {
        const button = document.createElement("button");
        button.className =
          "bg-gray-300 py-1 lg:py-2 px-3 lg:px-5 rounded-md font-medium hover:bg-red-500 hover:text-white";
        button.innerText = categoryName;
        category.appendChild(button);
      });
    });
};

const videos = async () => {
  const category = document.getElementById("videos");
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  )
    .then((res) => res.json())
    .then((data) => loadVideos(data.videos));
};
categories();

function loadVideos(videoObject) {
  videoObject.forEach((video) => {
    console.log(video);

    const videoContainer = document.getElementById("videoContainer");
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="bg-base-100">
                    <figure class="h-52 relative">
                      <img src="${
                        video.thumbnail
                      }" class="h-full w-full object-cover rounded-xl"/>
                      ${
                        video.others.posted_date?.length==0? "" : `<span class="absolute bg-black text-white p-1 bottom-2 right-2 rounded-md px-2">
                      ${
                        video.others.posted_date
                      }</span>`
                      }
                      
                    </figure>
                    <div class="flex py-5 pr-5 gap-5">
                        <div class="avatar">
                            <div class="w-12 h-12 rounded-full object-cover">
                              <img src="${video.authors[0].profile_picture}"/>
                            </div>
                          </div>
                          <div>
                            <h1 class="text-xl font-semibold">${
                              video.title
                            }</h1>
                            <div class="flex items-center gap-2">
                              <h2 class="text-md font-medium text-gray-500">${
                                video.authors[0].profile_name
                              }</h2>
                              ${
                                video.authors[0].verified === true
                                  ? `<img src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" class="w-5 h-5"/>`
                                  : ""
                              }
                            </div>
                            <p class="text-gray-500">${video.others.views}</p>
                          </div>
                      </div>
                </div>
        `;
    videoContainer.appendChild(div);
  });
}
videos();
