class ResponsiveAppLayout extends HTMLElement {

    get styles(){
        return `:host {padding:0}
        
.flex-container, :host {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: stretch;
}

.flex-container.vertical, :host {
    flex-direction: column;
}

.flex-container > * {
    order: 0;
    flex: 0 1 auto;
    align-self: auto;
}

.flex-container > .stretch, :host > .stretch {
    flex: 1 1 auto;
}	

header {
    z-index: 1;
    background-color: var(--header-background-color, #393939);
    height: var(--header-height, 48px);
    min-height: var(--header-height, 48px);
    line-height: var(--header-height, 48px);
    border-bottom: var(--header-border, none);
    box-shadow: var(--header-box-shadow, none);
}

.nav-toggle{
	display:none;
}

.wrapper {
  background-color: var(--main-background-color, inherit);
}

main > nav {
    background-color: var(--sidebar-background-color, #F8F8F8);
    width: var(--sidebar-width, 200px);
    min-width: var(--sidebar-width, 200px);
    transition: margin-left 0.25s ease-in-out;
    border-right: var(--sidebar-border, none);
    box-shadow: var(--sidebar-box-shadow, none);
}

main > *{
  overflow-y: auto;
}

main {
    overflow: hidden;
}


/* Responsive Layout */
@media screen and (max-width: ${this._breakpoint||768}px) {
	
	main:not(.open) > nav {
		margin-left: calc(-1 * var(--sidebar-width, 200px))
	}
	
	.nav-toggle{
		display:inline-block;
		margin: auto 1em;
		color: var(--toggle-color, #FFFFFF);
		font-weight: bold;
		cursor: pointer;
	}

	/* When body has class .overlap, then the content of .wrapper isn't squeezed while opening the nav */
	main.overlap  > nav {
		position: absolute;
		bottom: 0;
		top: var(--header-height, 48px);
		left: 0;
		z-index: 3;
        transform: scale(1);
        overflow-y: initial;
	}
    
    /*main:not(.open).overlap > nav:after{
        content:"";
        position: absolute;
        width: 0px;
        background:transparent;
        left: 0;
    }
	
	main.open.overlap > nav:after{
		background: rgba(0,0,0, 0.3);
		height: 100%;
		content:"";
		position: absolute;
		right: calc(-100vw + var(--sidebar-width, 200px));
        left: var(--sidebar-width, 200px);
    }*/

    main.overlap.open .wrapper {
        filter: var(--sidebar-open-main-filter, none);
    }	
}`
    }

    get template(){

        if(typeof this.__template == "undefined") {
            this.__template = document.createElement('template');
            this.__template.innerHTML = 
                `<style>${this.styles}</style>
                <header class="flex-container">
                    <span class="nav-toggle"><slot name="icon">&#9776;</slot></span>
                    <slot name="header"></slot>
                </header>
                <main class="flex-container stretch ${(this.overlap)?'overlap':''} ${(this.open)?'open':''} position-${this._position}">
                
                    <nav>
                        <slot name="sidebar"></slot>
                    </nav>
                    
                    <div class="wrapper stretch">
                        <slot name="main"></slot>
                    </div>
                
                </main>`
        }
        
        return this.__template.content.cloneNode(true);

    }

    constructor(){
        super();
        this._refs = {};
        this._position = 'left';
        this._breakpoint = 768;
        this.sidebarCloseSelector = '[data-sidebar-close]';
    }

    get overlap(){
        return this.hasAttribute('overlap');
    }

    set overlap(value){
        this._setBoolean('overlap', !!value);
    }

    get open(){
        return this.hasAttribute('open');
    }

    set open(value){
        const newValue = (value === false || value == null);
        this._setBoolean('open', value);
        if('inert' in HTMLElement.prototype && this._refs.nav){ 
            this._refs.nav.inert = (value === false || value == null)
        }
    }

    get position(){
      return this._position;
    }

    set position(value){
      if(value != this._position && ['left', 'right'].indexOf(value) > -1) this._position = value;
      // Update shadow DOM
      let p = (this._position === 'left');
      this._refs.main.classList[p?'add':'remove']('position-left');
      this._refs.main.classList[p?'remove':'add']('position-right');
    }

    get breakpoint(){
      return this._breakpoint;
    }

    set breakpoint( value ){
      let parsed = parseInt(value, 10);
      if( isNaN(parsed) || parsed === this._breakpoint) return;
      
      this._breakpoint = parsed;
      if (this._refs.styleSheet) { this._refs.styleSheet.cssText = this.styles; } else { this._refs.innerHTML = this.styles; }
    }

    _setBoolean(name,value){
        if(value === false || value == null) {
            if(this.hasAttribute(name)) this.removeAttribute(name);
        } else {
            if(!this.hasAttribute(name)) this.setAttribute(name, '');
        }

        if(this._refs.main) this._refs.main.classList[(value === false || value == null)?'remove':'add'](name)
    }

    connectedCallback(){

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild( this.template );

        this._refs.toggle = shadowRoot.querySelector('.nav-toggle');
        this._refs.main = shadowRoot.querySelector('main');
        this._refs.styleSheet = shadowRoot.querySelector('style');
        this._refs.nav = shadowRoot.querySelector('nav');

        let sidebar = shadowRoot.querySelector('slot[name="sidebar"');
        if(sidebar) {
            this._refs.sidebar = sidebar;
            sidebar.addEventListener('click', e => {

                if(!e || !e.target || !this.sidebarCloseSelector) return;

                if(e.target.matches( this.sidebarCloseSelector )) {
                    this.open = false;
                }

                e.stopImmediatePropagation();
            }, true);

        }

        if(this._refs.toggle && this._refs.main){
            this._refs.toggle.addEventListener('click', _ => {
                this.open = !this._refs.main.classList.contains('open');
            })
        }

        // Init inert
        if('inert' in HTMLElement.prototype){ 
            this._refs.nav.inert = (this.open === false || this.open == null) 
        }

    }

    static get observedAttributes() {
        return ['overlap', 'open', 'position', 'breakpoint'];
    }

    attributeChangedCallback(name, o, newValue){
        if(o !== newValue) this[name] = newValue;

    }

}

window.customElements.define('responsive-app-layout', ResponsiveAppLayout);