function calculateSpacing(width, theme) {
  const currentWidth = theme["breakpoints"]["values"][width];
  if (currentWidth >= theme["breakpoints"]["values"]["lg"]) {
    // 10px margin for large screens and above
    return 8; 
  } else if (currentWidth >= theme["breakpoints"]["values"]["md"]) {
    // You can adjust this value if you want specific margin for medium screens (tablets)
    return 2;  
  }
  // Adjust this value for specific margin for small screens (mobile devices)
  return 2;  
}

export default calculateSpacing;
