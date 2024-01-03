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

    /***************
     * CODE TO CYCLE THROUGH IMAGES DYNAMICALLY!!!!
     * ALSO put IN RESIZE FUNCTION TO RECALCULATE ON RESIZE
     * DO THIS IN NAVBAR ALSO
     * AND POSITION IMAGES - MAY NEED TO DO AWAY WITH CLASSES AND USE IDs
     */
    let firstImage = document.getElementById("carousel-source-0");
    let secondImage = document.getElementById("carousel-source-1");
    let thirdImage = document.getElementById("carousel-source-2");
    let height = firstImage.height;
    this.#height = height;
  
    this.#container.style.height = (height + "px");
    document.getElementById("carousel-image-0").style.height = (height + "px");
    document.getElementById("carousel-image-1").style.height = (height + "px");
    document.getElementById("carousel-image-2").style.height = (height + "px");
    this.#images.push(firstImage); this.#images.push(secondImage); this.#images.push(thirdImage);

    // Build the carousel controls
    for(let a = 0; a < this.#images.length; a++) {

      let button = document.createElement("a");
      button.classList.add("carousel-button");

      if(a === 0)
        button.classList.add("carousel-button-active");

      button.href = "#";
      button.innerHTML = a;
      button.onclick = this.#cycle.bind(this, a);

      this.#buttons.push(button);
      this.#controls.appendChild(button);
    }
  }

  #cycle(index) {

    // Only process if the carousel is not currently animating and the selected image is not the current image
    if(!this.#animating && this.#current !== index) {

      let direction = (this.#current < index) ? "RIGHT" : "LEFT";

      let activeEnd = (direction === "RIGHT") ? "-100%" : "100%";
      setCssVar("--carousel-start-active", "0%");
      setCssVar("--carousel-end-active", activeEnd);

      let active = document.getElementById("carousel-image-" + this.#current);
      active.classList.add("carousel-slide-active");
      active.addEventListener("animationend", function(index, active) {

        if(event.animationName === "frames-carousel-slide-active") {
          
          active.classList.remove("carousel-slide-active");
          this.#makeInactive(active);
          this.#current = index;
          this.#animating = false;
        }

      }.bind(this, index, active));

      let inactiveStart = (direction === "RIGHT") ? "100%" : "-100%";
      setCssVar("--carousel-start-inactive", inactiveStart);
      setCssVar("--carousel-end-inactive", "0%");

      let inactive = document.getElementById("carousel-image-" + index);
      inactive.style.left = inactiveStart;
      inactive.style.display = "block";
      inactive.classList.add("carousel-slide-inactive");    
      inactive.addEventListener("animationend", function(inactive) {

        if(event.animationName === "frames-carousel-slide-inactive") {

          inactive.classList.remove("carousel-slide-inactive");
          this.#makeActive(inactive);
        }

      }.bind(this, inactive));        
    }
  }

  #makeActive(elem) {

    elem.style.left = "0%";
  }

  #makeInactive(elem) {

    elem.style.display = "none";
  }
}