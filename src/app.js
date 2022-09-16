import style from "./css/style.css";
import { renderGame, newSnakePart, renderFood } from "./js/renderGame";

const startScreen = renderGame.startScreen(startGame);

let map = null;
let snake = null;
let food = [];
let foodInterval = null;
let gameInterval = null;

//functions
const snakeInit = () => {
   const direction = snake.direction[1];
   const { x, y } = nextAreaCords(direction);
   const nextArea = document.querySelector(`div[data-x='${x}'][data-y='${y}']`);

   if (checkGameOver(nextArea)) {
      stopGame();
      return;
   }

   if (nextArea === food[0]) eatFood(direction, x, y);
   changeSnakePosition(x, y);
   snake.direction[0] = direction;
};

const eatFood = () => {
   food[0].classList.remove("food");
   food.pop();
   newSnakePart(snake.parts);
};

const nextAreaCords = direction => {
   let { x, y } = snake.parts[0].dataset;
   switch (direction) {
      case "right":
         x++;
         break;
      case "left":
         x--;
         break;
      case "up":
         y--;
         break;
      case "down":
         y++;
         break;
   }
   return { x, y };
};

const checkGameOver = nextArea => {
   const partsTouchSnake = snake.parts.map(el => el === nextArea);
   if (nextArea === null || partsTouchSnake.includes(true)) return true;
};

const moveSnakeBodyElement = (part, cssClass, x, y) => {
   const el = document.querySelector(`div[data-x='${x}'][data-y='${y}']`);
   part.classList.remove(cssClass);
   el.classList.add(cssClass);

   return el;
};

const changeSnakePosition = (newX, newY) => {
   let { x, y } = snake.parts[0].dataset;

   for (let i = 0; i < snake.parts.length; i++) {
      const templateX = snake.parts[i].dataset.x;
      const templateY = snake.parts[i].dataset.y;

      snake.parts[i] = moveSnakeBodyElement(snake.parts[i], "snake-body", x, y);

      x = templateX;
      y = templateY;
   }
   snake.parts[0] = moveSnakeBodyElement(snake.parts[0], "snake-head", newX, newY);
};

const keyBind = key => {
   if (key.keyCode === 68 && snake.direction[0] !== "left") snake.direction[1] = "right";
   if (key.keyCode === 65 && snake.direction[0] !== "right") snake.direction[1] = "left";
   if (key.keyCode === 87 && snake.direction[0] !== "down") snake.direction[1] = "up";
   if (key.keyCode === 83 && snake.direction[0] !== "up") snake.direction[1] = "down";
};

const createFood = () => {
   if (food.length === 0) {
      const renderedFood = renderFood(map);
      food.push(renderedFood);
   }
};

function stopGame() {
   clearInterval(gameInterval);
   clearInterval(foodInterval);

   document.body.prepend(startScreen);
   setTimeout(() => startScreen.classList.add("active"), 100);
}

function startGame() {
   if (map !== null) map.remove();

   map = renderGame.map();
   document.body.append(map);

   snake = renderGame.snake(map);
   food = [];

   foodInterval = setInterval(createFood, 1000);
   gameInterval = setInterval(() => snakeInit(snake), 100);

   startScreen.remove();
   startScreen.classList.remove("active");
}

addEventListener("DOMContentLoaded", () => {
   document.body.prepend(startScreen);
   startScreen.classList.add("active");

   window.addEventListener("keydown", keyBind);
   addEventListener("DOMContentLoaded", () => {});
});
