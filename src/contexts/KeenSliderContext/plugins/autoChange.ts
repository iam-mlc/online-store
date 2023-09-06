import { KeenSliderHooks, KeenSliderInstance } from "keen-slider/react";

type Milliseconds = number;

const autoChange = (
  slider: KeenSliderInstance<{}, {}, KeenSliderHooks>,
  changePeriod: Milliseconds
) => {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;
  function clearNextTimeout() {
    clearTimeout(timeout);
  }
  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 2000);
  }
  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout)
  slider.on("animationEnded", nextTimeout)
  slider.on("updated", nextTimeout)
//   slider.on("destroyed", () => {
//     slider.container.removeEventListener("mouseover", () => {
//       mouseOver = true;
//       clearNextTimeout();
//     });
//     slider.container.removeEventListener("mouseout", () => {
//       mouseOver = false;
//       nextTimeout();
//     });
//   });
};

export default autoChange;