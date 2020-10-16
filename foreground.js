const tag = document.createElement("div");
tag.classList.add("thingdown-tag");
tag.innerHTML = "T";

document.querySelector("body").append(tag);

tag.addEventListener("mouseenter", () => {
  const modal = document.createElement("div");
  modal.classList.add("td-modal");

  const modalHeader = document.createElement("h2");

  modalHeader.classList.add("td-modal-header");
  modalHeader.innerHTML = "PUT THAT THING DOWN";

  modal.appendChild(modalHeader);
  document.querySelector("body").appendChild(modal);

  tag.addEventListener("mouseleave", () => {
    console.log("mouse leaving");
    // document.querySelector("body").removeChild(modal);
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { sku, product } = request;
});
