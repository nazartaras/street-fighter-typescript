import {callApi} from '../helpers/apiHelper'
import {IFighterUndetailed} from '../fighterView'
import {IFighter} from '../fighter'

class FighterService {
    public async getFighters():Promise<Array<IFighterUndetailed>>{
      try {
        const endpoint = 'fighters.json';
        const apiResult = await callApi(endpoint, 'GET');
  
        return JSON.parse(atob(apiResult.content));
      } catch (error) {
        throw error;
      }
    }
    async getFighterDetails(_id:number):Promise<IFighter>{
        try{
            const endpoint1 = 'details/fighter/'+_id+'.json';
            const apiResult1 = await callApi(endpoint1, 'GET');
     
            return JSON.parse(atob(apiResult1.content));
         }
         catch (error) {
           throw error;
         }
    }
  }
 export const fighterService = new FighterService();
