let curStep;

// const handleStepButton = (event) => {
//   const defaultEvent = document.getElementById("step-1");
//   curStep
//     ? curStep.classList.remove("fill-button")
//     : defaultEvent.classList.remove("fill-button");
//   curStep = event.target;
//   curStep.classList.add("fill-button");

//   switch (parseInt(curStep.innerText)) {
//     case 1:
//       document.getElementById("summary").style.display = "none";
//       document.getElementById("personal-info").style.display = "flex";
//       document.getElementById("select-plan").style.display = "none";
//       document.getElementById("pick-addons").style.display = "none";
//       break;
//     case 2:
//       document.getElementById("summary").style.display = "none";
//       document.getElementById("personal-info").style.display = "none";
//       document.getElementById("pick-addons").style.display = "none";
//       document.getElementById("select-plan").style.display = "flex";
//       break;
//     case 3:
//       document.getElementById("summary").style.display = "none";
//       document.getElementById("personal-info").style.display = "none";
//       document.getElementById("select-plan").style.display = "none";
//       document.getElementById("pick-addons").style.display = "flex";
//       break;
//     case 4:
//       console.log(curStep.innerText);

//       document.getElementById("summary").style.display = "flex";
//       document.getElementById("personal-info").style.display = "none";
//       document.getElementById("select-plan").style.display = "none";
//       document.getElementById("pick-addons").style.display = "none";
//       break;
//   }
// };

const handlePersonalInfoNext = () => {
  document.getElementById("summary").style.display = "none";
  document.getElementById("step-4").classList.remove("fill-button");
  console.log(document.querySelectorAll(".step")[3]);

  let valid = true;
  document.querySelectorAll(".personal-info-input").forEach((input) => {
    if (!input.value) {
      valid = false;
      document.getElementById(`${input.name}-error`).style.display = "block";
    } else {
      document.getElementById(`${input.name}-error`).style.display = "none";
    }
  });

  if (valid) {
    curStep = document.getElementsByClassName("step-button")[1];
    document.getElementById("step-1").classList.remove("fill-button");
    curStep.classList.add("fill-button");
    document.getElementById("personal-info").style.display = "none";
    document.getElementById("select-plan").style.display = "flex";
  }
};

const handleSelectPlanNext = () => {
  curStep = document.getElementsByClassName("step-button")[2];
  document.getElementById("step-2").classList.remove("fill-button");
  curStep.classList.add("fill-button");
  document.getElementById("select-plan").style.display = "none";
  document.getElementById("pick-addons").style.display = "flex";
};

const handleSelectPlanBack = () => {
  curStep = document.getElementsByClassName("step-button")[0];
  document.getElementById("step-2").classList.remove("fill-button");
  curStep.classList.add("fill-button");
  document.getElementById("select-plan").style.display = "none";
  document.getElementById("personal-info").style.display = "flex";
};

const handlePickAddOnsNext = () => {
  curStep = document.getElementsByClassName("step-button")[3];
  document.getElementById("step-3").classList.remove("fill-button");
  curStep.classList.add("fill-button");
  document.getElementById("pick-addons").style.display = "none";
  document.getElementById("summary").style.display = "flex";
};

const handlePickAddOnsBack = () => {
  curStep = document.getElementsByClassName("step-button")[1];
  document.getElementById("step-3").classList.remove("fill-button");
  curStep.classList.add("fill-button");
  document.getElementById("pick-addons").style.display = "none";
  document.getElementById("select-plan").style.display = "flex";
};

const handleSummaryBack = () => {
  curStep = document.getElementsByClassName("step-button")[2];
  document.getElementById("step-4").classList.remove("fill-button");
  curStep.classList.add("fill-button");
  document.getElementById("summary").style.display = "none";
  document.getElementById("pick-addons").style.display = "flex";
};

const handleChangePlan = () => {
  const curStep = document.querySelectorAll(".step-button")[1];
  curStep && handlePersonalInfoNext();
};
