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
    ${displayListItems(features)}
   </ol>
   <hr class="h-px my-4 bg-gray-300 border-0 ">

  <div class="card-actions justify-between">
    <div>
        <h2 class="card-title">${name}</h2>
        <p>${published_in} </p>
    </div>
    <button class="btn btn-info btn-outline" onclick="handleShowDetails('${id}')">Show Details</button>
  </div>
 </div>
  `;

    cardContainer.appendChild(div);
  });
};

const displayListItems = (items) => {
  let elements = "";
  items.forEach((item) => {
    elements += `<li class="text-sm">${item} </li>`;
  });
  return elements;
};

const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  displayDetails(data.data);
  show_details_modal.showModal();
};

const displayDetails = (data) => {
  const {
    description,
    image_link,
    features,
    integrations,
    input_output_examples,
    pricing,
  } = data;
  const modalContentContainer = document.getElementById(
    "modal-content-container"
  );
  let featureList = [];
  for (const item in features) {
    const { feature_name } = features[item];
    featureList.push(feature_name);
  }
  modalContentContainer.textContent = "";
  const divContent = document.createElement("div");
  const divImage = document.createElement("div");
  divContent.innerHTML = `
    <p class="font-semibold mb-4">${description} </p>
    <div class="grid grid-cols-3 gap-4">
        ${displayPricing(pricing)}
    </div>
    <div class="flex justify-between pt-4">
        <div>
            <p class="font-semibold">Features </p>
            <ul class="list-disc list-inside ">
            ${displayListItems(featureList)}
            </ul>
        </div>
        <div>
            <p class="font-semibold">Integrations </p>
            <ul class="list-disc list-inside ">
            ${displayListItems(integrations)}
            </ul>
        </div>
    </div>
  `;
  divImage.innerHTML = `
    <div class="text-center">
        <img
        src=${image_link[0]} 
        />
        <p class="font-semibold mt-4">${input_output_examples[0].input}</p>
        <small>${input_output_examples[0].output}</small>
    </div>
  `;
  modalContentContainer.appendChild(divContent);
  modalContentContainer.appendChild(divImage);
};

const displayPricing = (pricing) => {
  let elements = "";
  const textColor = ["text-lime-600", "text-orange-600", "text-red-600"];
  let count = 0;
  pricing.forEach((item) => {
    elements += `
        <div class="${textColor[count]} card bg-base-200 flex justify-center items-center rounded-none p-2">
           
            <small class="text-center font-semibold">${item.price}</small>
            <small class="font-semibold">${item.plan}</small>

        </div>
    `;
    count++;
  });
  return elements;
};
