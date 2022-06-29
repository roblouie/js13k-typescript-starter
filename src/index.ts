import { drawEngine } from './core/draw-engine';
import { menuState } from './game-states/menu.state';
import { createGameStateMachine, gameStateMachine } from './game-state-machine';

createGameStateMachine(menuState);

window.onload = () => {
  const canvas = document.querySelector<HTMLCanvasElement>('#c')!;
  drawEngine.initialize(canvas);
  update(0);
}

let previousTime = 0;
const maxFps = 60;
const interval = 1000 / maxFps;

function update(currentTime: number) {
  const delta = currentTime - previousTime;

  // For simplicity, the frame rate is fixed at 60fps
  if (delta >= interval || !previousTime) {
    previousTime = currentTime - (delta % interval);

    drawEngine.context.clearRect(0, 0, drawEngine.width, drawEngine.height);
    
    // Although the game is currently set at 60fps, the state machine accepts a time passed to onUpdate
    // If you'd like to unlock the framerate, you can instead use an interval passed to onUpdate to 
    // adjust your physics so they are consistent across all frame rates.
    // If you do not limit your fps or account for the interval your game will be far too fast or far too 
    // slow for anyone with a different refresh rate than you.
    gameStateMachine.getState().onUpdate(delta);
  }
  requestAnimationFrame(update);
}
