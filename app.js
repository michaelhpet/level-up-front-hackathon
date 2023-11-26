const HIDDEN_CLASS = "hidden";

function app() {
  /**
   * Disable form submit
   */
  const searchForm = document.querySelector("form");
  searchForm.onsubmit = function (e) {
    e.preventDefault();
  };

  /*
   * Menu interactions
   */
  const notificationTrigger = document.querySelector("#notification_menu");
  const notificationContent = document.querySelector(
    "#notification_menu_content"
  );

  notificationTrigger.onclick = function (e) {
    e.stopPropagation();
    const isExpanded =
      notificationTrigger.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      notificationContent.style.opacity = 0;
      notificationContent.style.visibility = "hidden";
      notificationTrigger.setAttribute("aria-expanded", "false");
    } else {
      notificationContent.style.visibility = "visible";
      notificationContent.style.opacity = 1;
      notificationTrigger.setAttribute("aria-expanded", "true");
    }
  };

  const profileTrigger = document.querySelector("#profile_menu");
  const profileContent = document.querySelector("#profile_menu_content");
  const profileMenuItems = profileContent.querySelectorAll('[role="menuitem"]');

  const firstMenuItem = profileMenuItems.item(0);
  const lastMenuItem = profileMenuItems.item(profileMenuItems.length - 1);

  profileContent.open = function () {
    profileContent.style.visibility = "visible";
    profileContent.style.opacity = 1;
    profileTrigger.setAttribute("aria-expanded", "true");
    const timeoutId = setTimeout(() => {
      firstMenuItem.focus();
      clearTimeout(timeoutId);
    }, 100);
  };

  profileContent.close = function () {
    profileContent.style.opacity = 0;
    profileContent.style.visibility = "hidden";
    profileTrigger.setAttribute("aria-expanded", "false");
    const timeoutId = setTimeout(() => {
      profileTrigger.focus();
      clearTimeout(timeoutId);
    }, 100);
  };

  profileMenuItems.forEach((menuItem, menuItemIndex) => {
    menuItem.onkeydown = function (e) {
      const previousMenuItem = profileMenuItems.item(menuItemIndex - 1);
      const nextMenuItem = profileMenuItems.item(menuItemIndex + 1);
      const isFirstMenuItem = menuItemIndex === 0;
      const isLastMenuItem = menuItemIndex === profileMenuItems.length - 1;

      if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        if (isFirstMenuItem) lastMenuItem.focus();
        else previousMenuItem.focus();
        return;
      }
      if (["ArrowRight", "ArrowDown"].includes(e.key)) {
        if (isLastMenuItem) firstMenuItem.focus();
        else nextMenuItem.focus();
        return;
      }

      if (e.key === "Escape") {
        profileContent.close();
        return;
      }
    };
  });

  profileTrigger.onclick = function (e) {
    e.stopPropagation();
    const isExpanded = profileTrigger.getAttribute("aria-expanded") === "true";

    if (isExpanded) profileContent.close();
    else profileContent.open();
  };

  /*
   * Handle trial callout removal
   */
  const trialCallout = document.querySelector(".trial_callout_container");
  const trialCalloutCancelButton =
    trialCallout.querySelector(".icon_button_flat");

  trialCalloutCancelButton.onclick = function () {
    trialCallout.style.opacity = 0;
    trialCallout.style.visibility = "hidden";
    const timeoutId = setTimeout(() => {
      trialCallout.classList.add(HIDDEN_CLASS);
      clearTimeout(timeoutId);
    }, 100);
  };

  /*
   * Accordion expand/collapse interactions
   */
  const accordionTrigger = document.querySelector("#accordion_trigger");
  const accordionContent = document.querySelector("#accordion_content");
  const accordionTriggerIcon = document.querySelector(
    "#accordion_trigger_icon"
  );

  accordionContent.expand = function () {
    accordionContent.setAttribute("aria-expanded", "true");
    accordionTriggerIcon.style.transform = "rotate(180deg)";
  };

  accordionContent.collapse = function () {
    accordionContent.setAttribute("aria-expanded", "false");
    accordionTriggerIcon.style.transform = "rotate(0deg)";
  };

  accordionTrigger.onclick = function () {
    const isExpanded =
      accordionContent.getAttribute("aria-expanded") === "true";
    if (isExpanded) accordionContent.collapse();
    else accordionContent.expand();
  };

  /*
   * Guide steps check/uncheck and expand/collapse interactions
   */
  const steps = document.querySelectorAll(".step_container");
  steps.forEach((step, stepIndex) => {
    const stepButtons = step.querySelectorAll('button:not([role="checkbox"])');
    stepButtons.forEach((button) => {
      button.onfocus = function () {
        const accordionIsExpanded =
          accordionContent.getAttribute("aria-expanded") === "true";

        const stepIsNotExpanded =
          step.getAttribute("aria-expanded") === "false";

        if (accordionIsExpanded) {
          if (stepIsNotExpanded) step.expand();
        } else {
          accordionContent.expand();
          if (stepIsNotExpanded) step.expand();
        }
      };
    });

    const stepTitle = step.querySelector(".step_info_container p");
    const checkbox = step.querySelector(".step_checkbox");

    stepTitle.onclick = function () {
      const isNotExpanded = step.getAttribute("aria-expanded") === "false";
      if (isNotExpanded) step.expand();
    };

    checkbox.defaultAriaLabel = checkbox.getAttribute("aria-label");
    checkbox.currentStep = step;
    checkbox.nextStep = steps.item(stepIndex + 1);

    const uncheckedIcon = checkbox.querySelector(".checkbox_unchecked_icon");
    const checkedIcon = checkbox.querySelector(".checkbox_checked_icon");
    const loadingIcon = checkbox.querySelector(".checkbox_loading_icon");

    checkbox.onfocus = function () {
      const accordionIsNotExpanded =
        accordionContent.getAttribute("aria-expanded") === "false";
      if (accordionIsNotExpanded) accordionContent.expand();
    };

    function checkCheckbox() {
      uncheckedIcon.classList.add(HIDDEN_CLASS);
      checkedIcon.classList.add(HIDDEN_CLASS);
      loadingIcon.classList.remove(HIDDEN_CLASS);
      checkbox.setAttribute("aria-label", "Loading. Please wait!");

      const timeoutId = setTimeout(() => {
        uncheckedIcon.classList.add(HIDDEN_CLASS);
        loadingIcon.classList.add(HIDDEN_CLASS);
        checkedIcon.classList.remove(HIDDEN_CLASS);
        checkbox.setAttribute("aria-checked", "true");
        checkbox.setAttribute(
          "aria-label",
          checkbox.defaultAriaLabel.replace("done", "not done")
        );

        const nextIncompleted =
          Array.from(steps)
            .filter((_, i) => i > stepIndex)
            .find((step) => {
              const checkbox = step.querySelector(".step_checkbox");
              return checkbox.getAttribute("aria-checked") === "false";
            }) ??
          Array.from(steps).find((step) => {
            const checkbox = step.querySelector(".step_checkbox");
            return checkbox.getAttribute("aria-checked") === "false";
          });

        checkbox.currentStep.collapse();
        if (nextIncompleted) nextIncompleted.expand();

        clearTimeout(timeoutId);
        updateProgress();
      }, 200);
    }

    function uncheckCheckbox() {
      checkedIcon.classList.add(HIDDEN_CLASS);
      uncheckedIcon.classList.add(HIDDEN_CLASS);
      loadingIcon.classList.remove(HIDDEN_CLASS);
      checkbox.setAttribute("aria-label", "Loading. Please wait!");

      const timeoutId = setTimeout(() => {
        checkedIcon.classList.add(HIDDEN_CLASS);
        loadingIcon.classList.add(HIDDEN_CLASS);
        uncheckedIcon.classList.remove(HIDDEN_CLASS);
        checkbox.setAttribute("aria-checked", "false");
        checkbox.setAttribute("aria-label", checkbox.defaultAriaLabel);

        checkbox.currentStep.expand();

        clearTimeout(timeoutId);
        updateProgress();
      }, 200);
    }

    checkbox.onclick = function () {
      const isChecked = checkbox.getAttribute("aria-checked") === "true";
      if (isChecked) uncheckCheckbox();
      else checkCheckbox();
      checkbox.blur();
    };

    step.expand = function () {
      const expandedSteps = document.querySelectorAll(
        '.step_container[aria-expanded="true"]'
      );
      expandedSteps.forEach((step) => step.collapse());
      const stepImage = step.querySelector(".step_image_container");
      stepImage.style.opacity = 1;
      step.style.maxHeight = step.scrollHeight + 32 + "px";
      step.style.background = "#f3f3f3";
      step.setAttribute("aria-expanded", "true");
    };

    step.collapse = function () {
      const stepImage = step.querySelector(".step_image_container");
      stepImage.style.opacity = 0;
      step.style.maxHeight = "40px";
      step.style.background = "transparent";
      step.setAttribute("aria-expanded", "false");
    };
  });

  /**
   * Update guide steps progress
   */
  function updateProgress() {
    const checkboxes = document.querySelectorAll(".step_checkbox");
    const progressBarText = document.querySelector(
      ".accordion_progress_container p"
    );
    const progressBarLine = document.querySelector("#progress_bar_line");

    const totalChecked = Array.from(checkboxes).filter((checkbox) => {
      return checkbox.getAttribute("aria-checked") === "true";
    }).length;

    const percentage = Math.round((totalChecked / checkboxes.length) * 100);

    progressBarText.innerHTML = `${totalChecked} / ${checkboxes.length} completed`;
    progressBarLine.style.width = `${percentage}%`;
  }
}

app();
