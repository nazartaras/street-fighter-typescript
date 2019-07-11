import View from './view';
  import FighterView from './fighterView';
  import { fighterService } from './services/fighterService';
  import {Fighter, IFighter} from './fighter'
import App from './app';


class FightersView extends View {
    handleClick: (event:EventTarget, fighter:{_id:number, name:string, source: string}) => void; 
  constructor(fighters:Array<{_id:number, name:string, source: string}>) {
    super();
    
    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
  }
  rootElement = document.getElementById('root') as HTMLDivElement;
  fightersDetailsMap = new Map();
  selectedFighters : Array<IFighter> = [];


  createFighters(fighters:Array<{_id:number, name:string, source: string}>) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters', attributes : {id:'fighters-container'}} );
    this.element.append(...fighterElements);
  }

  async handleFighterClick(event: EventTarget, fighter:{_id:number, name:string, source: string}) {
    let fightersViewHtml = document.getElementById('fighters-container') as HTMLDivElement;
    fightersViewHtml.style.display = 'none';
    if(this.fightersDetailsMap.has(fighter._id)){
      this.appendStats(fighter._id);
    }
    else{
    const fighterDetails = await fighterService.getFighterDetails(fighter._id);
    this.fightersDetailsMap.set(fighter._id, fighterDetails);
    this.appendStats(fighter._id);
    console.log(this.fightersDetailsMap);
      }
    // get from map or load info and add to fightersMap
    // show modal with fighter info
    // allow to edit health and power in this modal
  } 
  appendStats(_id:number):void{
    const stats = this.createStats(_id);
    this.rootElement.insertBefore(stats, this.rootElement.firstChild);
    let statusFightName = document.getElementById('statusFightName') as HTMLDivElement;
    let defInput = document.getElementById('def') as HTMLInputElement;
    let atcInput = document.getElementById('atc') as HTMLInputElement;
    let hpInput = document.getElementById('hp') as HTMLInputElement;
    let btnOK = document.getElementById('btnOK') as HTMLButtonElement;
    let btnSelect = document.getElementById('btnSelect') as HTMLButtonElement;
    statusFightName.innerHTML= this.fightersDetailsMap.get(_id).name + "'s stats";
    defInput.value = this.fightersDetailsMap.get(_id).defense;
    atcInput.value = this.fightersDetailsMap.get(_id).attack;
    hpInput.value = this.fightersDetailsMap.get(_id).health;
    btnOK.innerHTML="OK";
    btnSelect.innerHTML="Select";
    btnOK.onclick = ()=>{
      this.changeStats(_id);
    }
    btnSelect.onclick = ()=>{
      this.changeStats(_id);
      const heroForFight = new Fighter(this.fightersDetailsMap.get(_id));
      this.selectedFighters.push(heroForFight);
      if(this.selectedFighters.length==2){
        this.createBattlefield(this.selectedFighters[0],this.selectedFighters[1]);
        this.runFight(this.selectedFighters[0],this.selectedFighters[1]);
      }
    }
  }
  changeStats(_id:number):void{
    let fightersViewHtml = document.getElementById('fighters-container') as HTMLDivElement;
    const child = document.getElementById('stats') as HTMLDivElement; 
    let defInput = document.getElementById('def') as HTMLInputElement;
    let atcInput = document.getElementById('atc') as HTMLInputElement;
    let hpInput = document.getElementById('hp') as HTMLInputElement;
    this.fightersDetailsMap.get(_id).defense =  defInput.value;
    this.fightersDetailsMap.get(_id).attack = atcInput.value;
    this.fightersDetailsMap.get(_id).health =  hpInput.value;
    this.rootElement.removeChild(child);
    fightersViewHtml.style.display = 'flex';
  }
  
  createStats(_id:number):HTMLDivElement{
    const attributes = {id: "stats"}
    const defense = this.createDef();
    const gif = this.createGif(this.fightersDetailsMap.get(_id).source);
    const attack = this.createAtc();
    const health = this.createHp();
    const name = this.createFigterName();
    const okButton = this.createOkButton();
    const selectButton = this.createSelectButton();
    const stats = this.createElement({
       tagName: 'div',
       className: 'stats',
       attributes
    });
    stats.append(name, gif, defense,attack,health,okButton,selectButton);
    
 
   return stats;
   }
   createFigterName():HTMLDivElement{
   const attributes = {id: 'statusFightName'}
   const fighterName = this.createElement({
     tagName: 'div',
     className: 'statusName',
     attributes
   })
   return fighterName;
   }
   createGif(source:string):HTMLImageElement {
    const attributes = { src: source };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }
   createDef():HTMLInputElement{
    const attributes = {value : "10",id:'def', title: "defense stat"}
    const defStat = this.createElement({
     tagName: 'input',
     className: 'def',
     attributes
   });
   return defStat;
   }
   createAtc():HTMLInputElement{
    const attributes = {value : "10", id: "atc" , title: "attack stat"}
    const atcStat = this.createElement({
      tagName: 'input',
      className: 'atc',
      attributes
    });
    return atcStat;
   }
   createHp():HTMLInputElement{
    const attributes = {value : "10", id: "hp", title: "health stat"}
    const hpStat = this.createElement({
      tagName: 'input',
      className: 'hp',
      attributes
    });
    return hpStat;
   }
   createOkButton():HTMLButtonElement{
    const attributes = {value : "10", id: "btnOK"}
    const okBtn = this.createElement({
      tagName:'button',
      className:'okBtn',
      attributes
    })

    return okBtn;
   }
   createSelectButton():HTMLButtonElement{
    const attributes = {value : "10", id: "btnSelect"}
    const selectBtn = this.createElement({
      tagName:'button',
      className:'selectBtn',
      attributes
    })

    return selectBtn;
   }
   createBattlefield(hero1:IFighter, hero2:IFighter){
     let j = 0;
     let lengthFighters = document.getElementsByClassName('fighter').length;
    for(let i=0; i<lengthFighters; i++){
      if( document.getElementsByClassName('fighter')[i-j].children[1].innerHTML==hero1.name || document.getElementsByClassName('fighter')[i-j].children[1].innerHTML==hero2.name){
    }
    else{
    document.getElementsByClassName('fighter')[i-j].remove();
    j++;
  }
   }
   document.getElementsByClassName('fighters')[0].classList.remove('fighters');
   this.rootElement.children[0].classList.add('ready-for-fight');
   document.getElementsByClassName('fighter')[1].children[0].classList.add('image-fight');
   const winnerText = this.createWinnerText();
   document.getElementsByClassName('ready-for-fight')[0].insertBefore(winnerText,document.getElementsByClassName('ready-for-fight')[0].firstChild).style.display="none";
   document.getElementsByClassName('fighter')[0].insertBefore(this.createHealthBar(hero1), document.getElementsByClassName('fighter')[0].firstChild);
   document.getElementsByClassName('fighter')[1].insertBefore(this.createHealthBar(hero2), document.getElementsByClassName('fighter')[1].firstChild);
   const backBtn = this.createRestoreToDefaultButton();
   document.getElementsByClassName('ready-for-fight')[0].appendChild(backBtn).style.display="none";
   let btnBack = document.getElementById('btnBack') as HTMLButtonElement;
   btnBack.onclick = ()=>{
     this.rootElement.children[0].remove();
     new App();
   };
}
createHealthBar(fighter:IFighter): HTMLProgressElement{
  const attributes = {value : fighter.health, max: fighter.health}
    const hpStat = this.createElement({
      tagName: 'progress',
      className: 'hpBar',
      attributes
    });
    return hpStat;
}
createWinnerText():HTMLHeadingElement{
  const winnerText = this.createElement({
      tagName: 'h1',
      className: 'winner-text',
      attributes:{}
    });
    return winnerText;
 }
createRestoreToDefaultButton():HTMLButtonElement{
  const attributes = {id: "btnBack"}
    const backBtn = this.createElement({
      tagName:'button',
      className:'backBtn',
      attributes
    })

    return backBtn;
}
runFight(hero1:IFighter, hero2:IFighter){
     
  setInterval(fight, 1000, hero1, hero2);
}

}
function fight(hero1:IFighter, hero2:IFighter){
  let heroHitPower1;
  let heroHitPower2;
  let heroDefensePower1;
  let heroDefensePower2;
  let fighterOneProgressBar = document.getElementsByClassName('fighter')[0].children[0] as HTMLProgressElement;
  let fighterSecondProgressBar =  document.getElementsByClassName('fighter')[1].children[0] as HTMLProgressElement;
    heroDefensePower1 = hero1.getBlockPower();
    heroDefensePower2 = hero2.getBlockPower();
    heroHitPower1 =  hero1.getHitPower();
    heroHitPower2 =  hero2.getHitPower();
    if(heroHitPower1>heroDefensePower2){
      hero2.health -= heroHitPower1 - heroDefensePower2;
      if(document.getElementsByClassName('fighter')[1].children[2].innerHTML==hero2.name)
      fighterSecondProgressBar.value = hero2.health;
      else
      fighterOneProgressBar.value = hero2.health;
      console.log(hero2.name+" : "+hero2.health);
  }
      if(hero2.health>0 && heroHitPower2>heroDefensePower1){
          hero1.health -= heroHitPower2 - heroDefensePower1;
          if(document.getElementsByClassName('fighter')[1].children[2].innerHTML==hero1.name)
          fighterSecondProgressBar.value = hero1.health;
      else
      fighterOneProgressBar.value = hero1.health;
      }
      console.log(hero1.name+" : "+hero1.health);
  if(hero1.health<1||hero2.health<1){
      for(let i=0; i<100; i++){
  window.clearInterval(i); 
  }
  if(hero1.health>hero2.health)
  showWinner(hero1.name);
  else
  showWinner(hero2.name);

}
function showWinner(name:string){
    let winner_text = document.getElementsByClassName('winner-text')[0] as HTMLHeadingElement;
    let backBtn = document.getElementsByClassName('backBtn')[0] as HTMLButtonElement;
  if(document.getElementsByClassName('fighter')[1].children[2].innerHTML==name){
      document.getElementsByClassName('fighter')[0].remove();
  }
  else{
      document.getElementsByClassName('fighter')[1].remove();
  }
  winner_text.style.display="block";
  winner_text.innerHTML = name + "'s victory";
  backBtn.style.display="block";
  backBtn.innerHTML="Back to hero menu"
}  
}



export default FightersView;