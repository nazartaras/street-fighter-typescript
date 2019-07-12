import View from './view';


export interface IFighterUndetailed{
  _id:number;
  name: string;
  source:string;
}

class FighterView extends View {
  element!: HTMLElement;
  constructor(fighter:IFighterUndetailed, handleClick:any) {
    super();

    this.createFighter(fighter, handleClick);
  }

  private createFighter(fighter:IFighterUndetailed, handleClick:any) {
    const { name, source } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);
    this.element = this.createElement({ tagName: 'div', className: 'fighter',attributes:{} });
    this.element.appendChild(imageElement);
    this.element.appendChild(nameElement);
    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  private createName(name:string):HTMLSpanElement {
    const nameElement = this.createElement({ tagName: 'span', className: 'name',attributes:{} });
    nameElement.innerText = name;
    return nameElement;
  }

  private createImage(source:string):HTMLImageElement {
    const attributes = { src: source };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }
}

export default FighterView;