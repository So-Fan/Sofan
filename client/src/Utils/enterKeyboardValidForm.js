export default async function handleKeyDown(event, verifierFormFunction) {
  // Si la touche pressée est "ENTRÉE", déclenchez le clic sur le bouton
  if (event.key === "Enter") {
   await verifierFormFunction();
  }
}
