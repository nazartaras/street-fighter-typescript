
class View {
    element:any;
    createElement(elem:{ tagName:string, className:string, attributes:any }):any {
      const element = document.createElement(elem.tagName);
      element.classList.add(elem.className);
      Object.keys(elem.attributes).forEach(key => element.setAttribute(key, elem.attributes[key]));
  
      return element;
    }
  }
  
  export default View;
  