export enum Attribute {
    "uid"="uid",
    "image" = "image",
    "name" = "name",
    "author" = "author",
    "album" = "album",
    "dateAdded" = "dateAdded",
    "duration" = "duration",
}

class AppSong extends HTMLElement {
    uid?: number;
    image?: string;
    name?: string;
    author?: string;
    album?: string;
    dateAdded?: number;
    duration?: number;
    
    static get observedAttributes(){
        return Object.keys(Attribute)
    }

    attributeChangedCallback(propName:Attribute, oldValue: string | undefined, newValue: string | undefined){
        switch(propName){
            case Attribute.uid:
                this.uid = newValue ? Number(newValue) : undefined;
                break;

            case Attribute.dateAdded:
                this.dateAdded = newValue ? Number(newValue) : undefined;
                break;

            case Attribute.duration:
                this.duration = newValue ? Number(newValue) : undefined;
                break;

            default:
                this[propName] = newValue;
                break;
        }
        this.render();        
    }

    constructor(){
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot)
            this.shadowRoot.innerHTML = `
                <section>
                    <div class="container">
                        <img src= "${this.image}">
                        <h1>${this.name}</h1>
                        <h4>${this.author}</h4>
                        <p>${this.album}</p>
                        <span><b>${this.dateAdded}<b></span>
                        <span>${this.duration}</span>
                    </div>
                </section>
        `;
    }
};
customElements.define("app-song", AppSong);
export default AppSong;