import View from './view';

export interface IFighterView{
    createFighter: ()=> void;
    createName: ()=>any;
    createImage: ()=>any;


}

class FighterView extends View {
  constructor(fighter:{_id:number, name:string, source: string}, handleClick:any) {
    super();

    this.createFighter(fighter, handleClick);
  }

  createFighter(fighter:{_id:number, name:string, source: string}, handleClick:any) {
    const { name, source } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);
    this.element = this.createElement({ tagName: 'div', className: 'fighter',attributes:{} });
    this.element.append(imageElement, nameElement);
    this.element.addEventListener('click', (event: EventTarget) => handleClick(event, fighter), false);
  }

  createName(name:string) {
    const nameElement = this.createElement({ tagName: 'span', className: 'name',attributes:{} });
    nameElement.innerText = name;
    return nameElement;
  }

  createImage(source:string) {
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