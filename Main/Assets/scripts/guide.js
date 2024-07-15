document.addEventListener("DOMContentLoaded", function () {
  console.log("Guide script loaded");
  document.getElementById("playPauseBtn").click();
  const hidingBack = document.getElementById("hidingBack");

  const steps = [
    {
      element: document.querySelector(".planet.future_mars"),
      title: "Future Mars Position",
      content:
        "This yellow dashed circle represents the position of mars after 8 months, which is the duration of the journey from earth to mars...",
    },
    {
      element: document.querySelector(".venus-orbit"),
      title: "Hohmann Transfer Orbit",
      content:
        "This red dashed eliptical shape represents the Hohmann transfer orbit.",
    },
    {
      element: document.querySelector("#date-slider"),
      title: "Date picking slider",
      content:
        "This Date slider makes it easy to go through the timeline of the period between September 2024 to November 2032.",
    },
    {
      element: document.querySelector(".placeholder"),
      title: "Date Display & Controls",
      content:
        "Here you can view the current date of the simulation, you can pause or play the simulation and it tells you if the current date is a launch date or not .",
    },
    {
      element: document.querySelector(".sun"),
      title: "Note:",
      content:
        "Whenever there is a launch window you will notice all the red glowing colors will turn green. And you will notice that whenever there is a laucnch window, the postition of future mars is exactly opposite to earth.  .",
    },
    {
      element: document.querySelector(".placeholder"),
      title: "Finally...",
      content:
        "Here you can view the current date of the simulation, you can pause or play the simulation and it tells you if the current date is a launch date or not .",
    },
  ];

  console.log("Steps:", steps);

  let currentStep = 0;

  function createPopover(step) {
    const popover = document.createElement("div");
    popover.classList.add("custom-popover");
    popover.innerHTML = `
              
              <div class="popover-arrow"></div>
              <div class="popover-header">
                  <h3>${step.title}</h3>
              </div>
              <div class="popover-body">
                  ${step.content}
                  <button id="next-btn">Next</button>
              </div>
          `;
    document.body.appendChild(popover);

    const rect = step.element.getBoundingClientRect();
    popover.style.top = `${rect.top - popover.offsetHeight - 10}px`;
    popover.style.left = `${
      rect.left + rect.width / 2 - popover.offsetWidth / 2
    }px`;

    const arrow = popover.querySelector(".popover-arrow");
    arrow.style.top = `${popover.offsetHeight}px`;
    arrow.style.left = `${popover.offsetWidth / 2 - 10}px`;

    return popover;
  }

  function showStep(index) {
    const step = steps[index];
    if (!step.element) {
      console.error("Element not found for step", index, step);
      return;
    }

    console.log("Showing step", index, step);

    const popover = createPopover(step);

    const nextButton = popover.querySelector("#next-btn");
    if (nextButton) {
      if (index === steps.length - 1) {
        nextButton.textContent = "Close";
      }
      nextButton.addEventListener("click", () => {
        console.log("Next button clicked");
        popover.remove();
        currentStep++;
        if (currentStep < steps.length) {
          showStep(currentStep);
        } else {
          document.getElementById("playPauseBtn").click();
          hidingBack.style.setProperty('height', '0vh');

        }
      });
    } else {
      console.error("Next button not found");
    }
  }

  // Start the guide
  showStep(currentStep);
});
