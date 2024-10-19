// convert second to hour/minute
function getTime(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  return `${hour} Hour ${minute} Minute ago`;
}

// load categories
const loadCategories = () => {
  const res = fetch(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  )
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// display categories
function displayCategories(categories) {
  categories.forEach((item) => {
    const categoryContainer = document.getElementById("categories");

    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class=" border border-red-600 py-1 lg:py-2 px-3 lg:px-5 rounded-md font-medium categoryBtn">${item.category}</button>
        `;

    categoryContainer.appendChild(buttonContainer);
  });
}

// load videos
const loadVideos = (searchText = '') => {
  const category = document.getElementById("videos");
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      displayVideos(data.videos); // load all videows
    });
};
loadCategories();

// video details by id 
const videoDetails = async (videoId) => {
  console.log(videoId);
  const url = (`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
  const res = await fetch(url);
  const data = await res.json()
  displayVideoDetails(data.video);
}

// display video details 
const displayVideoDetails = (video) => {
  console.log(video);
  const detailsContainer = document.getElementById('modalDetails');

  detailsContainer.innerHTML = `
  <img class="w-full object-cover max-h-56" src="${video.thumbnail}"/>
  <p class="py-3">${video.description}</p>
  `
  document.getElementById('customModal').showModal();
}

// display Videos
function displayVideos(videos) {
    const videoContainer = document.getElementById("videoSection");
    videoContainer.innerHTML = "";

    if (videos.length === 0) {
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
        <div class="h-[500px] flex flex-col justify-center items-center gap-5">
            <img src="./assets/Icon.png"/>
            <h1 class="font-bold text-2xl text-red-600 text-center">NO CONTENT AVAILABLE</h1>
        </div>
        `;
    } else {
        videoContainer.classList.add('grid')
}

  videos.forEach((video) => {
    const div = document.createElement("div");
    div.className = "bg-base-100";
    div.innerHTML = `
                    <figure class="h-52 relative">
                      <img src="${
                        video.thumbnail
                      }" class="h-full w-full object-cover rounded-xl"/>
                      ${
                        video.others.posted_date?.length == 0
                          ? ""
                          : `
                        <span class="absolute bg-black text-white p-1 bottom-2 right-2 text-xs rounded-md px-2"> 
                        ${getTime(video.others.posted_date)}</span>`
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
                            <div class="flex items-center gap-3">
                            <p class="text-gray-500">${video.others.views}</p>
                            <button onclick="videoDetails('${video.video_id}')" class="py-1 px-2 bg-red-600 rounded-md text-white font-medium text-xs">Details</button>
                            </div>
                          </div>
                      </div>
        `;
    videoContainer.append(div);
  });
}
loadVideos();

// remove active button
const removeActive = () => {
    const categoryBtn = document.getElementsByClassName("categoryBtn");
    for (let btn of categoryBtn) {
        btn.classList.remove("active")
    }
}

// load category wise video and active button
const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
      .then((data) => {
          removeActive()
          const activeBtn = document.getElementById(`btn-${id}`);
          activeBtn.classList.add('active');

        displayVideos(data.category); 
    })
    .catch((error) => console.log(error));
};

// search videos 
document.getElementById('searchInput').addEventListener('keyup', (event) => {
  loadVideos(event.target.value)
})