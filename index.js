const userInput = document.querySelector('input#user-input');
const confirmationButton = document.querySelector('button#confirm');
const shapeArea = document.querySelector('div#shape-area');

let clickTimeout = null;

const shapeClick = (ev) => {
  const childArr = Array.from(shapeArea.children);

  if (!clickTimeout) {
    clickTimeout = setTimeout(() => {
      const clickTargetIndex = childArr.findIndex((child) => child === ev.target);

      if (clickTargetIndex > 0) shapeArea.removeChild(childArr[clickTargetIndex - 1]);

      clickTimeout = null;
    }, 250);
  }
};

const shapeDblClick = (ev) => {
  clearTimeout(clickTimeout);

  const childArr = Array.from(shapeArea.children);
  const clickTargetIndex = childArr.findIndex((child) => child === ev.target);

  if (clickTargetIndex < childArr.length - 1) shapeArea.removeChild(childArr[clickTargetIndex + 1]);

  clickTimeout = null;
};

confirmationButton.onclick = () => {
  shapeArea.innerHTML = '';
  const usedColors = new Set();

  fetch(`${window.location.href.replace(/(:\d*)?\/$/, '')}:8080/api?payload=${userInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      const chosenAmount = data;

      for (let index = 0; index < chosenAmount; index += 1) {
        const newShape = document.createElement('div');

        newShape.className = 'shape';
        if (chosenAmount % 2 === 0) {
          newShape.classList.add('circle');
        }

        let colorR, colorG, colorB, colorString;
        do {
          colorR = Math.round(Math.random() * 255);
          colorG = Math.round(Math.random() * 255);
          colorB = Math.round(Math.random() * 255);
          colorString = `${colorR}, ${colorG}, ${colorB}`;
        } while (usedColors.has(colorString));
        usedColors.add(colorString);

        newShape.style.backgroundColor = `RGB(${colorString})`;

        newShape.onclick = shapeClick;
        newShape.ondblclick = shapeDblClick;

        shapeArea.appendChild(newShape);
      }
    });
};
