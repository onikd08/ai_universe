const loadData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const { tools } = data.data;
  displayData(tools);
};

loadData();

const displayData = (data) => {
  const cardContainer = document.getElementById("card-container");
  data.forEach((tool) => {
    const { id, name, description, image, published_in, features, links } =
      tool;
    const div = document.createElement("div");
    div.classList = "card card-compact bg-base-200 shadow-lg";
    div.innerHTML = `
  <figure>
  <img
    src=${image}
    alt=${name}
  />
 </figure>
 <div class="card-body">
    <h2 class="card-title"> Features </h2>
   <ol class="list-decimal list-inside ">
    ${displayFeatures(features)}
   </ol>
   <hr class="h-px my-4 bg-gray-300 border-0 ">

  <div class="card-actions justify-between">
    <div>
        <h2 class="card-title">${name}</h2>
        <p>${published_in} </p>
    </div>
    <button class="btn btn-primary">Buy Now</button>
  </div>
 </div>
  `;

    cardContainer.appendChild(div);
  });
};

const displayFeatures = (features) => {
  let element = "";
  features.forEach((feature) => {
    element += `<li>${feature} </li>`;
  });
  return element;
};
