import React, { useEffect, useRef } from "react";

const GRID_SIZE = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;

function getRandomFoodPosition() {
  return {
    x: Math.floor(Math.random() * (400 / GRID_SIZE)) * GRID_SIZE,
    y: Math.floor(Math.random() * (400 / GRID_SIZE)) * GRID_SIZE,
  };
}

const Game = ({setScore}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    food = getRandomFoodPosition();

    function drawRect(x, y, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, GRID_SIZE, GRID_SIZE);
    }

    function update() {
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

      if (head.x === food.x && head.y === food.y) {
        score++;
        setScore(score);
        food = getRandomFoodPosition();
      } else {
        snake.pop();
      }

      if (
        head.x < 0 ||
        head.x >= 400 ||
        head.y < 0 ||
        head.y >= 400 ||
        snake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        alert(`Game Over! Your score: ${score}`);
        snake = [{ x: 200, y: 200 }];
        direction = { x: 0, y: 0 };
        score = 0;
        food = getRandomFoodPosition();
      }

      snake.unshift(head);
    }

    function draw() {
      ctx.clearRect(0, 0, 400, 400);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, 400, 400);
      snake.forEach((segment) => drawRect(segment.x, segment.y, "green"));
      drawRect(food.x, food.y, "red");
    }

    function gameLoop() {
      update();
      draw();
      setTimeout(gameLoop, 100);
    }

    gameLoop();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) direction = { x: 0, y: -GRID_SIZE };
          break;
        case "ArrowDown":
          if (direction.y === 0) direction = { x: 0, y: GRID_SIZE };
          break;
        case "ArrowLeft":
          if (direction.x === 0) direction = { x: -GRID_SIZE, y: 0 };
          break;
        case "ArrowRight":
          if (direction.x === 0) direction = { x: GRID_SIZE, y: 0 };
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} width={380} height={380} style={{ border: "2px solid black" }}></canvas>
    </div>
  );
};

export function changeDirection(dir) {
  switch (dir) {
    case "up":
      if (direction.y === 0) direction = { x: 0, y: -GRID_SIZE };
      break;
    case "down":
      if (direction.y === 0) direction = { x: 0, y: GRID_SIZE };
      break;
    case "left":
      if (direction.x === 0) direction = { x: -GRID_SIZE, y: 0 };
      break;
    case "right":
      if (direction.x === 0) direction = { x: GRID_SIZE, y: 0 };
      break;
  }
}

export default Game;
