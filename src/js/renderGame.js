const boardRows = 15;
const boardColumns = 15;

const renderMap = () => {
   const mapContener = document.createElement("section");
   mapContener.id = "game";
   mapContener.classList.add("game");

   for (let row = 0; row < boardRows; row++) {
      for (let column = 0; column < boardColumns; column++) {
         const el = document.createElement("div");
         el.dataset.x = column;
         el.dataset.y = row;
         el.className = "";
         mapContener.append(el);
      }
   }

   return mapContener;
};

//startScreen

const renderStartScreen = buttonCallback => {
   const startScreen = document.createElement("div");
   startScreen.classList.add("startScreen");

   const contenet = document.createElement("div");
   contenet.classList.add("startScreen__content");

   const title = document.createElement("h1");
   title.classList.add("startScreen__tittle");
   title.textContent = "Powodzenia";

   const btn = document.createElement("button");
   btn.classList.add("startScreen__button");
   btn.textContent = "Zagraj";
   btn.addEventListener("click", buttonCallback);

   contenet.append(title, btn);
   startScreen.append(contenet);

   return startScreen;
};

//food

const renderFood = mapContener => {
   const areas = [...mapContener.children].filter(el => el.className == "");
   const indexArea = Math.floor(Math.random() * areas.length + 1);

   if (indexArea === undefined) return;
   const { x, y } = areas[indexArea].dataset;

   const food = document.querySelector(`div[data-x='${x}'][data-y='${y}']`);
   food.classList.add("food");

   return food;
};

//snake

const newSnakePart = snakeArr => {
   const { x, y } = snakeArr[snakeArr.length - 1].dataset;

   const newBodyPart = document.querySelector(`div[data-x='${x}'][data-y='${y}']`);
   newBodyPart.classList.add("snake-body");
   snakeArr.push(newBodyPart);
};

const createSnake = head => {
   const snakeParts = [head];
   head.classList.add("snake-head");

   for (let index = 0; index < 2; index++) {
      newSnakePart(snakeParts);
   }

   return snakeParts;
};

const randomDirection = () => {
   const direction = Math.floor(Math.random() * 4 + 1);
   switch (direction) {
      case 1:
         return "right";
      case 2:
         return "left";
      case 3:
         return "up";
      case 4:
         return "down";
   }
};

const renderSnake = mapContener => {
   const goodAreas = [...mapContener.children].filter(el => el.dataset.x > 2 && el.dataset.x < 8 && el.dataset.y > 2 && el.dataset.y < 8);
   const areaIndex = Math.floor(Math.random() * goodAreas.length);
   const newDirection = randomDirection();

   const parts = createSnake(goodAreas[areaIndex]);
   return { size: 2, direction: [null, newDirection], parts };
};

const renderGame = {
   startScreen: renderStartScreen,
   map: renderMap,
   snake: renderSnake,
};
//export

export { renderGame, newSnakePart, renderFood };
