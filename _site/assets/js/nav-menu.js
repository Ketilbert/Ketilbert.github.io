class navMenu {

  #toggle;
  #container;
  #links;

  #options;

  #open;
  #animating;

  constructor(toggle, container, links) {

    this.#toggle = toggle;
    this.#container = container;
    this.#links = links;

    this.#options = [];

    this.#open = false;
    this.#animating = false;
  }

  buildMenu() {

    let container = this.#container;
    let links = this.#links;

    // Build the menu options
    for(let a = 0; a < links.length; a++) {

      let option = document.createElement("a");
      option.className = "option";
      option.textContent = links[a].label;
      option.href = links[a].link;

      this.#options.push(option);
      container.appendChild(option);
    }

    this.#toggle.onclick = this.#toggleMenu.bind(this);
  }

  #calculateMenuHeight() {

    let calc = 0;
    for(let a = 0; a < this.#options.length; a++)
      calc += getCalculatedDimensions(this.#options[a]).height;

    return calc;
  }

  #toggleMenu() {
    
    // Set the height of the menu
    setCssVar("--menu-height", (this.#calculateMenuHeight() + "px"));
    
    if(!this.#animating) {

      this.#animating = true;

      if(this.#open) {
    
        this.#container.classList.add("menu-closing");
        this.#container.addEventListener("animationend", function() {

          if(event.animationName === "frames-menu-closing") {
            
            this.#container.classList.remove("menu-closing");
            this.#container.classList.remove("menu-container-open");
            this.#container.classList.add("menu-container-closed");
            this.#open = false;
            this.#animating = false;
          }
  
        }.bind(this));

      } else {
    
        this.#container.classList.add("menu-opening");
        this.#container.addEventListener("animationend", function() {

          if(event.animationName === "frames-menu-opening") {
                                
            this.#container.classList.remove("menu-opening");
            this.#container.classList.remove("menu-container-closed");
            this.#container.classList.add("menu-container-open");
            this.#open = true;
            this.#animating = false;
          }
  
        }.bind(this));
      }
    }
  }
}