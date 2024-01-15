/* Keep frontmatter to ensure Jekyll variables are processed */

const LOCATIONS = [

  {
    name: "Stainborough Castle",
    description: "The Earl's folly, standing upon the highest point of Stainborough Park",
    photos: [ 
      { file: "/images/interactive-map/sc-0.jpg", desc: "Stainborough Castle in the Present Day" },
      { file: "/images/interactive-map/sc-1.jpg", desc: "Stainborough Castle 2" },
      { file: "/images/interactive-map/sc-2.jpg", desc: "Stainborough Castle 3" }
    ],
    text: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ],
    externalLinks: [
      { label: "One article", link: "yes.html", desc: "a brief description" },
      { label: "Another article", link: "no.html", desc: "a brief description" }
    ],
    internalLinks: [

      <!-- Iterate through all the articles in _POSTS -->
      
      
  
        <!-- Filter any posts that are not published or flagged as latest -->
        
        
        
      
      
  
        <!-- Filter any posts that are not published or flagged as latest -->
        
        
        
      
      
  
        <!-- Filter any posts that are not published or flagged as latest -->
        
        
        
          
           // Add comma to separate objects

        { label: "Stainborough Castle Then & Now", link: "/Stainborough-Castle/", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." }
        
        
        
      
      
    ]      

  },

  {
    name: "Wentworth Castle",
    description: "The historic seat of the Earls of Strafford",
    photos: [ 
      { file: "assets/media/images/content/wc-0.jpg", desc: "Wentworth Castle 1" },
      { file: "assets/media/images/content/wc-1.jpg", desc: "Wentworth Castle 2" },
      { file: "assets/media/images/content/wc-2.jpeg", desc: "Wentworth Castle 3" }
    ],
    text: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ],
    links: [
      { label: "One WC article", link: "wc-yes.html", desc: "a brief description" },
      { label: "Another WC article", link: "wc-no.html", desc: "a brief description" },
      { label: "Yet another article", link: "ok.html", desc: "a brief description" }
    ]        
  }

];