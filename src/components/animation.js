// Simple utility for handling animation classes
export const fadeIn = {
    initial: "opacity-0",
    animate: "opacity-100",
    transition: "transition-opacity duration-300",
  }
  
  export const slideIn = {
    initial: "transform translate-y-4 opacity-0",
    animate: "transform translate-y-0 opacity-100",
    transition: "transition-all duration-300",
  }
  
  export const scaleIn = {
    initial: "transform scale-95 opacity-0",
    animate: "transform scale-100 opacity-100",
    transition: "transition-all duration-300",
  }
  