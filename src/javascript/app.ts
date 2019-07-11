import FightersView from './fightersView';
import {fighterService} from './services/fighterService'

class App {
    constructor() {
      this.startApp();
    }
  
    static rootElement = document.getElementById('root') as HTMLDivElement;
    static loadingElement = document.getElementById('loading-overlay') as HTMLDivElement;
  
    async startApp() {
      try {
        App.loadingElement.style.visibility = 'visible';
        const fighters = await fighterService.getFighters();
        const fightersView = new FightersView(fighters);
        const fightersElement = fightersView.element;
  
        App.rootElement.appendChild(fightersElement);
      } catch (error) {
        console.warn(error);
        App.rootElement.innerText = 'Failed to load data';
      } finally {
        App.loadingElement.style.visibility = 'hidden';
      }
    }
  }
  
  export default App;