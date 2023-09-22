interface UpdateElementPositionParams {
  elementToUpdate: HTMLElement;
  referenceElement: HTMLElement;
  containerElement?: HTMLElement;
}

const updateElementPosition = ({
  elementToUpdate,
  referenceElement,
  containerElement,
}: UpdateElementPositionParams) => {
  let scrollLeft = 0;
  let scrollTop = 0;
  let containerPosition;
  const referenceElementPosition = referenceElement.getBoundingClientRect();

  if (containerElement) {
    scrollLeft = containerElement.scrollLeft;
    scrollTop = containerElement.scrollTop;
    containerPosition = containerElement.getBoundingClientRect();
  } else {
    const body = document.getElementsByTagName("body")[0];
    scrollLeft = window.scrollX;
    scrollTop = window.scrollY;
    containerPosition = body.getBoundingClientRect();
  }

  elementToUpdate.style.width = `${referenceElementPosition.width}px`;
  elementToUpdate.style.height = `${referenceElementPosition.height}px`;
  elementToUpdate.style.left = `${
    referenceElementPosition.left + scrollLeft
  }px`;
  elementToUpdate.style.right = `${referenceElementPosition.right}px`;
  elementToUpdate.style.top = `${
    referenceElementPosition.top - containerPosition.top + scrollTop
  }px`;
  elementToUpdate.style.bottom = `${
    referenceElementPosition.bottom - containerPosition.top
  }px`;
  elementToUpdate.style.borderRadius =
    window.getComputedStyle(referenceElement).borderRadius;
};

export default updateElementPosition;
