const summary = {
  monthlyOrYearly: "monthly",
  plan: { name: "", price: 0 },
  addons: [],
  total: 0,
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("month-year-checkbox")
    .addEventListener("change", toggleCheckboxValue);
  document.getElementById("total-price-title").innerHTML =
    `Total (per ${summary.monthlyOrYearly === "monthly" ? "month" : "year"})`;
});

const toggleCheckboxValue = () => {
  const checkbox = document.getElementById("month-year-checkbox");
  const isChecked = checkbox.checked;
  summary.plan.price = 0;

  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("selected-plan");
  });

  document.getElementById("plan-name").innerText = "";
  document.getElementById("plan-total-price").innerText = "";

  document
    .getElementById("month")
    .classList.toggle("selected-checkbox", !isChecked);
  document
    .getElementById("year")
    .classList.toggle("selected-checkbox", isChecked);

  document.querySelectorAll(".free-months").forEach((item) => {
    item.style.display = isChecked ? "block" : "none";
  });

  document.querySelectorAll(".card-price").forEach((item) => {
    item.innerHTML = `$${isChecked ? item.dataset.yearly : item.dataset.monthly}/${isChecked ? "yr" : "mo"}`;
  });

  document.querySelectorAll(".add-on-price").forEach((item) => {
    item.innerHTML = `${isChecked ? item.dataset.yearly : item.dataset.monthly}`;
  });

  summary.monthlyOrYearly = isChecked ? "yearly" : "monthly";
  document.getElementById("total-price-title").innerHTML =
    `Total (per ${summary.monthlyOrYearly === "monthly" ? "month" : "year"})`;
  resetAddOns();
  updateTotalPrice(0);
};

let curCard = null;
const handleCardButton = (event) => {
  if (curCard) curCard.classList.remove("selected-plan");

  curCard = event.target;
  curCard.classList.add("selected-plan");

  summary.plan.name = curCard.dataset.name;
  summary.plan.price = parseInt(
    summary.monthlyOrYearly === "monthly"
      ? curCard.dataset.monthly
      : curCard.dataset.yearly
  );
  summary.total = summary.plan.price;

  document.getElementById("plan-name").innerText = `${summary.plan.name} (${
    summary.monthlyOrYearly === "monthly" ? "monthly" : "yearly"
  })`;
  document.getElementById("plan-total-price").innerText =
    `$${summary.plan.price}/${summary.monthlyOrYearly === "monthly" ? "mo" : "yr"}`;
  updateTotalPrice();
  handleAddOnClick();
};

const handleAddOnClick = (event) => {
  const addOn = event?.currentTarget;
  const parentDiv = addOn?.closest(".add-on");
  const price = parseInt(addOn?.dataset[summary.monthlyOrYearly]);

  if (addOn?.checked) {
    summary.addons.push({ name: addOn?.value, price });
  } else {
    summary.addons = summary.addons.filter(
      (addon) => addon.name !== addOn.value
    );
  }

  parentDiv?.classList.toggle("selected-add-on", addOn.checked);
  updateAddOnSummary();
  updateTotalPrice();
};

const resetAddOns = () => {
  summary.addons = [];
  document.querySelectorAll(".add-on").forEach((addOn) => {
    addOn.checked = false;
    addOn.closest(".add-on").classList.remove("selected-add-on");
  });

  document.querySelectorAll(".add-on-checkbox").forEach((addOn) => {
    addOn.checked = false;
  });
  updateAddOnSummary();
  updateTotalPrice();
};

const updateAddOnSummary = () => {
  const section = document.getElementById("add-ons-summary");
  section.innerHTML = summary.addons
    .map(
      (addon) => `
        <div class="add-on-summary">
          <span class="add-on-name">${addon.name}</span>
          <span class="add-on-summary-price">+$${addon.price}/${summary.monthlyOrYearly === "monthly" ? "mo" : "yr"}</span>
        </div>
      `
    )
    .join("");
};

const updateTotalPrice = (total) => {
  summary.total = total
    ? total
    : summary.plan.price +
      summary?.addons?.reduce((sum, addon) => {
        return sum + parseInt(addon.price);
      }, 0);

  document.getElementById("total-price").innerText =
    `$${summary.total}/${summary.monthlyOrYearly === "monthly" ? "mo" : "yr"}`;
};
