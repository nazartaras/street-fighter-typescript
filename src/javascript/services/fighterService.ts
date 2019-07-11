import {callApi} from '../helpers/apiHelper'

class FighterService {
    async getFighters() {
      try {
        const endpoint = 'fighters.json';
        const apiResult = await callApi(endpoint, 'GET');
  
        return JSON.parse(atob(apiResult.content));
      } catch (error) {
        throw error;
      }
    }
    async getFighterDetails(_id:number){
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
