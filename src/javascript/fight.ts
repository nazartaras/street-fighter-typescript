import { IFighter } from './fighter'

export function fight(hero1:IFighter, hero2:IFighter):void{
    let heroHitPower1 : number;
    let heroHitPower2 : number;
    let heroDefensePower1 : number;
    let heroDefensePower2 : number;
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
}
  function showWinner(name:string):void{
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
