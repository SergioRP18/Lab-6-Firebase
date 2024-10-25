import './components/indexPadre';
import './types/Song';
import { getSongs, addSong } from './utils/Firebase';
import { Song } from './types/Song';

class AppContainer extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({mode:'open'});
    }

    async connectedCallback(){
        await this.renderSongs();
        await this.renderForm();
    }

    async renderSongs() {
        const data = await getSongs();
        this.shadowRoot!.innerHTML = '';

        await this.renderForm();

        data.forEach((element) => {
            const list = this.ownerDocument.createElement("app-song");
            list.setAttribute('image', element.image);
            list.setAttribute('name', element.title);
            list.setAttribute('author', element.author);
            list.setAttribute('album', element.album);
            list.setAttribute('dateAdded', String(element.dateAdded));
            list.setAttribute('duration', String(element.duration));
            this.shadowRoot?.appendChild(list);
        });
    }

    async renderForm(){
        if (!this.shadowRoot?.getElementById('song-form')) {
            const form = `
                <form id="song-form">
                    <input type="text" name="image" placeholder="Image URL" required>
                    <input type="text" name="title" placeholder="Title" required>
                    <input type="text" name="author" placeholder="Author" required>
                    <input type="text" name="album" placeholder="Album" required>
                    <label for="minutes">Minutes:</label>
                    <input type="number" name="minutes" placeholder="Minutes" min="0" max="59" required>
                    <button type="submit">Add Song</button>
                </form>
            `;
            this.shadowRoot!.innerHTML += form;
    
            const createForm = this.shadowRoot?.getElementById('song-form');
            createForm?.addEventListener('submit', this.handleAddSong.bind(this));
        }
    }

    async handleAddSong(event: Event){
        event.preventDefault();
        const createForm = event.target as HTMLFormElement;
        const minutes = Number((createForm.elements.namedItem('minutes') as HTMLInputElement).value) || 0;
        const totalSeconds = (minutes * 60);

        const song = {
            image: (createForm.elements.namedItem('image') as HTMLInputElement).value,
            title: (createForm.elements.namedItem('title') as HTMLInputElement).value, 
            author: (createForm.elements.namedItem('author') as HTMLInputElement).value,
            album: (createForm.elements.namedItem('album') as HTMLInputElement).value,
            dateAdded: new Date().toISOString(),
            duration: totalSeconds,
        };

        await addSong(song);
        createForm.reset();
        await this.renderSongs();
    }
}
customElements.define("app-container", AppContainer);