window.onload = () => {
  
  const paramsString = document.location.search; 
  const searchParams = new URLSearchParams(paramsString);

 
  for (const param of searchParams) {
    const elementId = param[0];
    const elementValue = decodeURIComponent(param[1]);
    const element = document.getElementById(elementId);

    if (element !== null) {
      
      element.textContent = elementValue;

      
      if (elementId === "address") {
        element.href = `https://www.google.com/maps/search/?api=1&query=${elementValue}`;
      } else if (elementId === "email") {
        element.href = `mailto:${elementValue}?subject=Hello!&body=What's up?`;
      }
    }
  }
};
