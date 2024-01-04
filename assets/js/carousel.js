class imageCarousel {

  #container;
  #controls;
  #height;
  #images;
  #buttons;

  #current;
  #animating;

  constructor(container, controls) {

    this.#container = container;
    this.#controls = controls;
    this.#height = 0;
    this.#images = [];
    this.#buttons = [];

    this.#current = 0;
    this.#animating = false;
  }

  buildCarousel() {

    // Cycle through the source images on the document, add them to the carousel
    let count = 0;
    let complete = false;
    while(!complete) {

      let image = document.getElementById("carousel-image-" + count);
      if(image !== null) {

        if(count === 0) {

          let first = document.getElementById("first-image");
          this.#height = first.height;
          this.#container.style.height = (this.#height + "px");
        }

        image.style.height = (this.#height + "px");
        this.#images.push(image);
        this.#container.appendChild(image);

      } else {

        complete = true;
      }

      count++;
    }
  
    // Build the carousel controls
    for(let a = 0; a < this.#images.length; a++) {

      let button = document.createElement("p");
      button.id = ("carousel-button-" + a);
      button.classList.add("carousel-button");

      if(a === 0)
        button.classList.add("carousel-button-active");

      button.href = "#";
      button.innerHTML = "&#8226;";
      button.onclick = this.#cycle.bind(this, a);
      
      this.#buttons.push(button);
      this.#controls.appendChild(button);
    }
  }

  resizeCarousel() {}

  #cycle(index) {

    // Only process if the carousel is not currently animating and the selected image is not the current image
    if(!this.#animating && this.#current !== index) {

      let direction = (this.#current < index) ? "RIGHT" : "LEFT";

      let activeEnd = (direction === "RIGHT") ? "-100%" : "100%";
      setCssVar("--carousel-start-active", "0%");
      setCssVar("--carousel-end-active", activeEnd);

      let active = document.getElementById("carousel-image-" + this.#current);
      active.classList.add("carousel-slide-active");
      let activeButton = document.getElementById("carousel-button-" + this.#current);
      active.addEventListener("animationend", function(index, active, button) {

        if(event.animationName === "frames-carousel-slide-active") {
          
          active.classList.remove("carousel-slide-active");
          this.#makeInactive(active, button);
          this.#current = index;
          this.#animating = false;
        }

      }.bind(this, index, active, activeButton));

      let inactiveStart = (direction === "RIGHT") ? "100%" : "-100%";
      setCssVar("--carousel-start-inactive", inactiveStart);
      setCssVar("--carousel-end-inactive", "0%");

      let inactive = document.getElementById("carousel-image-" + index);
      inactive.style.left = inactiveStart;
      inactive.style.display = "block";
      inactive.classList.add("carousel-slide-inactive"); 
      let inactiveButton = document.getElementById("carousel-button-" + index);   
      inactive.addEventListener("animationend", function(inactive, button) {

        if(event.animationName === "frames-carousel-slide-inactive") {

          inactive.classList.remove("carousel-slide-inactive");
          this.#makeActive(inactive, button);
        }

      }.bind(this, inactive, inactiveButton));        
    }
  }

  #makeActive(image, button) {

    image.style.left = "0%";
    button.classList.add("carousel-button-active");
  }

  #makeInactive(image, button) {

    image.style.display = "none";
    button.classList.remove("carousel-button-active");    
  }
}