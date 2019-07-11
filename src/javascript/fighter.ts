export interface IFighter{
    readonly name : string;
    health : number;
    defense: number;
    attack: number;
    readonly source: string;
    getHitPower: ()=> number;
    getBlockPower: ()=> number;
} 

export class Fighter implements IFighter{
    name: string;
    health: number;
    defense: number;
    attack: number;
    source: string;
    constructor(fighter:{_id:number, name:string, source: string, health:number, defense:number, attack:number }){
        this.name = fighter.name;
        this.health = fighter.health;
        this.defense = fighter.defense;
        this.attack = fighter.attack;
        this.source = fighter.source;
    }
    getHitPower():number{
        let criticalHitChance = randomInteger(1,2);
        let power = this.attack * criticalHitChance;
        return power;
    }

    getBlockPower():number{
        let dodgeChance = randomInteger(1,2);
        let power  = this.defense * dodgeChance;
        return power;
    }
}
function randomInteger(min:number, max:number):number {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}