export enum ResearchTool {
  Define = 'define',
  ImageSearch = 'image-search',
  Translate = 'translate',
  WebSearch = 'web-search',
  WikipediaSearch = 'wikipedia-search'
}

export const allResearchTools = Object.values(ResearchTool) as ResearchTool[]

export enum InputTool {
  Hint = 'hint',  
}
