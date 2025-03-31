export default function fitText(
  textElement: HTMLElement,
  maxFontSize: number,
  minFontSize: number = 1,
  shrinkingStep: number = 0.25,
  containerVirtualHorizontalPadding: number = 0.5,
  unit: string = 'em'
 ) {
  const container = textElement.parentNode as HTMLElement
  
  const isOverflown = () => {
    const containerViewportWidth = container.clientWidth - 16 * containerVirtualHorizontalPadding * 2;
    // console.log("textElement.clientWidth:", textElement.clientWidth, "containerViewportWidth:", containerViewportWidth, "container.clientWidth:", container.clientWidth)
    return textElement.clientWidth > containerViewportWidth
  }

  let fontSize = maxFontSize
  
  while(fontSize >= minFontSize) {
    textElement.style.fontSize = `${fontSize}${unit}`
    
    if (!isOverflown()) {
      break
    }
    
    fontSize -= shrinkingStep
  }
}
