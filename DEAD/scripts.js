document.addEventListener("DOMContentLoaded", () => {
  const modelViewer = document.querySelector(`model-viewer[src="projects/rockingchair/model.glb"]`);
  if (!modelViewer) {
    return;
  }
  const sceneSymbol = Object.getOwnPropertySymbols(modelViewer).find(x => x.description === "scene");
  window.scene = modelViewer[sceneSymbol];

  function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }

  const rotateMax = 0.20;
  const rotateIncrement = 0.005;
  let direction = 1;
  let currentRotation = 0;
  function rotate() {
    if (currentRotation >= rotateMax || currentRotation <= rotateMax * -1) {
      direction *= -1;
    }
    currentRotation += rotateIncrement * direction;
    const rotationProgress = 1 - Math.abs(currentRotation) / rotateMax;
    const expo = easeOutQuad(rotationProgress);
    scene.children[0].rotation.z = rotateMax * expo * direction;
    window.requestAnimationFrame(rotate);
  }

  window.requestAnimationFrame(rotate);
});
