---
---
/* Keep frontmatter to ensure Jekyll variables are processed */

class mapPin {

  #index;
  #labelText;
  #cssAlias;
  #labelTransform;
  #link;

  #pin;
  #label;
  #carouselPhotos;
  #carouselButtons;

  #mouseOver;
  #pinEmphasised;
  #pinAnimating;
  #scrollTop;
  
  constructor(index, labelText, cssAlias, labelTransform, link) {

    this.#index = index;
    this.#labelText = labelText;
    this.#cssAlias = cssAlias;
    this.#labelTransform = labelTransform;
    this.#link = link;

    this.#carouselPhotos = [];
    this.#carouselButtons = [];

    this.#mouseOver = false;
    this.#pinEmphasised = false;
    this.#pinAnimating = false;
  }

  buildPin(target) {

    let pin = document.createElement("div");
    pin.classList.add("map-pin");
    pin.classList.add("diminished-pin");
    pin.classList.add(this.#cssAlias);
    pin.id = ("map-pin-" + this.#index);

    pin.onmouseover = this.#emphasise.bind(this);
    pin.onmouseout = this.#diminish.bind(this);

    pin.onclick = this.#openInfo.bind(this);

    target.appendChild(pin);
    this.#pin = pin;

    let label = document.createElement("p");
    label.classList.add("map-label");
    label.classList.add("diminished-label");
    label.classList.add(this.#cssAlias);
    label.classList.add(this.#labelTransform);
    label.id = ("map-label-" + this.#index);
    label.innerHTML = this.#labelText.replaceAll(" ", "<br>");
    target.appendChild(label);
    this.#label = label;    
  }

  #emphasise() {

    this.#mouseOver = true;

    if(!this.#pinAnimating) {

      this.#pinAnimating = true;

      let pin = this.#pin;
      pin.classList.add("emphasise-pin");

      let label = this.#label;
      label.classList.add("emphasise-label");

      pin.addEventListener("animationend", function() {

        if(event.animationName === "frames-emphasise-pin") {
          
          pin.classList.remove("diminished-pin");
          pin.classList.add("emphasised-pin");
          pin.classList.remove("emphasise-pin");

          label.classList.remove("diminished-label");
          label.classList.add("emphasised-label");
          label.classList.remove("emphasise-label");

          this.#pinAnimating = false;
          this.#pinEmphasised = true;
          if(!this.#mouseOver)
            this.#diminish();
        }

      }.bind(this));
    }
  }

  #diminish() {

    this.#mouseOver = false;

    if(!this.#pinAnimating) {
      
      this.#pinAnimating = true;

      let pin = this.#pin;
      pin.classList.add("diminish-pin");

      let label = this.#label;
      label.classList.add("diminish-label");      
      
      pin.addEventListener("animationend", function() {

        if(event.animationName === "frames-diminish-pin") {
          
          pin.classList.remove("emphasised-pin");
          pin.classList.add("diminished-pin");
          pin.classList.remove("diminish-pin");

          label.classList.remove("emphasised-label");
          label.classList.add("diminished-label");
          label.classList.remove("diminish-label");

          this.#pinAnimating = false;
          this.#pinEmphasised = false;
          if(this.#mouseOver)
            this.#emphasise();
        }

      }.bind(this));
    }
  }

  #openInfo() {

    if(this.#link !== null) {

      document.location = ("{{ site.baseurl }}/explore/" + this.#link);

    } else {

      this.#populateInfo();
      
      let modal = document.getElementById("modal-panel");
      modal.style.display = "block";
      modal.classList.add("open-modal");
      
      // This prevents the main scrollbar from appearing on the info panel
      document.body.style.overflow = "hidden";

      let close = document.getElementById("info-panel-close");
      close.onclick = this.#closeInfo.bind(this);

      modal.addEventListener("animationend", function() {

        if(event.animationName === "frames-open-modal") {    

          modal.classList.remove("modal-panel-closed");
          modal.classList.add("modal-panel-open");
          modal.classList.remove("open-modal");
        }
      
      }.bind(this));
    }
  }

  #closeInfo() {

    let modal = document.getElementById("modal-panel");
    modal.classList.add("close-modal");

    let close = document.getElementById("info-panel-close");
    close.onclick = null;

    modal.addEventListener("animationend", function() {

      if(event.animationName === "frames-close-modal") {    

        modal.classList.remove("modal-panel-open");
        modal.classList.add("modal-panel-close");
        modal.classList.remove("close-modal");
        modal.style.display = "none";
        this.#depopulateInfo();

        // This reinstates the main scrollbar on the info panel
        document.body.style.overflow = "auto";        
      }
    
    }.bind(this));
  } 
  
  #populateInfo() {

    let info = LOCATIONS[this.#index];

    // Add the info page name and description
    document.getElementById("info-panel-title").textContent = info.name;
    document.getElementById("info-panel-subtitle").textContent = info.description;

    // Build the image carousel
    let photos = info.photos;
    let carousel = document.getElementById("info-carousel-images");
    for(let a = 0; a < photos.length; a++) {

      let photoElem = document.createElement("img");
      photoElem.id =("info-carousel-image-" + a);
      photoElem.classList.add("info-carousel-image");
      
      if(a === 0) {
        
        photoElem.classList.add("active-info-carousel-image");
        document.getElementById("info-carousel-label").textContent = photos[a].desc;
      }

      photoElem.src = document.getElementById("waiting").src;
      
      let photoClass = new Image();
      photoClass.src = photos[a].file;
      photoClass.onload = function() {

        photoElem.src = photoClass.src;
        if(photoClass.width >= photoClass.height)
          photoElem.classList.add("landscape-info-carousel-image");
        else  
          photoElem.classList.add("portrait-info-carousel-image");
      }

      // Build the carousel controls
      let controls = document.getElementById("info-carousel-controls");
      let button = document.createElement("a");
      button.id = ("info-carousel-button-" + a);
      button.classList.add("info-carousel-button");

      if(a === 0)
        button.classList.add("active-info-carousel-button");

      // Setup the carousel control functionality 
      button.innerHTML = "&#8226;";
      button.onclick = function() { this.#cycleCarousel(a); }.bind(this);
      controls.appendChild(button);
    
      this.#carouselPhotos.push( { elem: photoElem, desc: photos[a].desc } );
      this.#carouselButtons.push(button);

      carousel.appendChild(photoElem);
    }

    // Add the text content
    let contentPanel = document.getElementById("text-content-panel");
    let text = info.text;
    for(let a = 0; a < text.length; a++) {

      let p = document.createElement("p");
      p.classList.add("text-content");

      if(a === (text.length - 1))
        p.classList.add("text-content-last");

      p.textContent = text[a];
      contentPanel.appendChild(p);
    }

    // If present, add the article external links
    let links = info.externalLinks;
    if(links.length > 0) {
    
      let heading = document.createElement("p");
      heading.className = "text-content-heading";
      heading.textContent = "External Links";
      contentPanel.appendChild(heading);
      
      for(let a = 0; a < links.length; a++) {

        let link = document.createElement("a");
        link.className = "further-link";
        link.href = links[a].link;
        link.textContent = links[a].label;
        contentPanel.appendChild(link);
      
        let desc = document.createElement("p");
        desc.classList.add("further-link-description");

        if(a === (link.length - 1))
          desc.classList.add("text-content-last");

        desc.textContent = links[a].desc;
        contentPanel.appendChild(desc);      
      }
    } 
    
    // If present, add the article internal links
    links = info.internalLinks;
    if(links.length > 0) {
    
      let heading = document.createElement("p");
      heading.className = "text-content-heading";
      heading.textContent = "Internal Links";
      contentPanel.appendChild(heading);
      
      for(let a = 0; a < links.length; a++) {

        let link = document.createElement("a");
        link.className = "further-link";
        link.href = links[a].link;
        link.textContent = links[a].label;
        contentPanel.appendChild(link);
      
        let desc = document.createElement("p");
        desc.classList.add("further-link-description");

        if(a === (link.length - 1))
          desc.classList.add("text-content-last");

        desc.textContent = links[a].desc;
        contentPanel.appendChild(desc);      
      }
    }     
  }

  #depopulateInfo() {
    
    // Remove the info page name
    document.getElementById("info-panel-title").textContent = "";
    document.getElementById("info-panel-subtitle").textContent = "";

    // Destroy the image carousel and the reset the image array
    this.#carouselPhotos = null;
    this.#carouselPhotos = [];
    document.getElementById("info-carousel-images").innerHTML = "";

    // Destroy the carousel controls
    this.#carouselButtons = null;
    this.#carouselButtons = [];
    document.getElementById("info-carousel-label").textContent = "";
    document.getElementById("info-carousel-controls").innerHTML = "";    
    
    // Destroy the text content
    document.getElementById("text-content-panel").innerHTML = ""; 
  }
  
  #cycleCarousel(index) {

    let photos = this.#carouselPhotos;
    let buttons = this.#carouselButtons;

    for(let a = 0; a < photos.length; a++) {

      let photo = photos[a].elem;
      let desc = photos[a].desc;
      let button = buttons[a];
      if(a === index) {

        if(!photo.classList.contains("active-info-carousel-image"))
          photo.classList.add("active-info-carousel-image")
        
        if(!button.classList.contains("active-info-carousel-button"))
          button.classList.add("active-info-carousel-button")  
        
        document.getElementById("info-carousel-label").textContent = desc;
      
      } else {

        if(photo.classList.contains("active-info-carousel-image"))
          photo.classList.remove("active-info-carousel-image")
      
        if(button.classList.contains("active-info-carousel-button"))
          button.classList.remove("active-info-carousel-button")        
      }
    }
  }
}