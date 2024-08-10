let products = [
  {
    id: 1,
    name: "Headstone",
    image: "../assets/products/head-1.jpg",
  },
  {
    id: 2,
    name: "Headstone",
    image: "../assets/products/head2.jpg",
  },
  {
    id: 3,
    name: "Headstone",
    image: "../assets/products/head3.jpg",
  },
  {
    id: 4,
    name: "Tombstone",
    image: "../assets/products/tomb-1.jpg",
  },
  {
    id: 5,
    name: "Tombstone",
    image: "../assets/products/tomb-2.jpg",
  },
  {
    id: 6,
    name: "Headstone",
    image: "../assets/products/head4.jpg",
  },
  {
    id: 7,
    name: "Headstone",
    image: "../assets/products/head5.jpg",
  },
  {
    id: 8,
    name: "Tombstone",
    image: "../assets/products/tomb3.jpg",
  },
  {
    id: 9,
    name: "Headstone",
    image: "../assets/products/head6.jpg",
  },
  {
    id: 10,
    name: "Headstone",
    image: "../assets/products/head7.jpg",
  },
  {
    id: 11,
    name: "Tombstone",
    image: "../assets/products/tomb-4.jpg",
  },
  {
    id: 12,
    name: "Headstone",
    image: "../assets/products/head8.jpg",
  },
  {
    id: 13,
    name: "Headstone",
    image: "../assets/products/head9.jpg",
  },
  {
    id: 14,
    name: "Headstone",
    image: "../assets/products/head10.jpg",
  },
  {
    id: 15,
    name: "Headstone",
    image: "../assets/products/head11.jpg",
  },
  {
    id: 16,
    name: "Tombstone",
    image: "../assets/products/tomb5.jpg",
  },
  {
    id: 17,
    name: "Headstone",
    image: "../assets/products/head12.jpg",
  },
  {
    id: 18,
    name: "Headstone",
    image: "../assets/products/head13.jpg",
  },
  {
    id: 19,
    name: "Headstone",
    image: "../assets/products/head14.jpg",
  },
];

const productList = document.querySelector("#display-products");
// Display products in HTML

function displayProducts(products) {
  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = '<p class="no-results">Product not found</p>';
    return;
  }

  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.className = "product-item";
    productItem.innerHTML = `
            <h3 class="product-title">${product.name}</h3>
            <img class="product-image" src="${product.image}" alt="${product.name}">
        `;
    productList.appendChild(productItem);
  });
}

const searchInput = document.querySelector("#search");
// filter products function
const searchProducts = (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  displayProducts(filteredProducts);
};

searchInput.addEventListener("input", searchProducts);

displayProducts(products);

// search bar loop show/hide function

const searchIcon = document.getElementById("search-icon");

searchInput.addEventListener("focus", () => {
  searchIcon.classList.add("hidden");
});

searchInput.addEventListener("blur", () => {
  if (searchInput.value === "") {
    searchIcon.classList.remove("hidden");
  }
});

// toggle menu function

const burgerBtn = document.querySelector("#burgerBtn");
const navList = document.querySelector("#nav-list");

const toggleMenu = () => {
  burgerBtn.addEventListener("click", () => {
    if (navList.style.display === "none" || navList.style.display === "") {
      navList.style.display = "flex";
    } else {
      navList.style.display = "none";
    }
  });
};
toggleMenu();

//
let menuItems = {};
let aboutUs = {};
let product = {};
let address = {};
let selectedLanguage = "ENG";

const changeLanguage = () =>
  fetch("../assets/languages.json")
    .then((response) => response.json())
    .then((json) => {
      menuItems = json[selectedLanguage].menu;
      aboutUs = json[selectedLanguage].aboutUs;
      product = json[selectedLanguage].products;
      address = json[selectedLanguage].address
    })
    .then((bla) => {
      Object.keys(menuItems).forEach((element) => {
        const menuItem = document.getElementById(element);
        menuItem.innerHTML = menuItems[element];
      });
      document.getElementById("about-us-title").innerHTML = aboutUs.title;
      document.getElementById("about-us-description").innerHTML = aboutUs.description;

      document.getElementById("our-products-title").innerHTML = product.title
      let productsArray = []
      productsArray = products.map((element) => {
        return {...element, name : product.productTypes[element.name.toLowerCase()]}
      })
      searchInput.placeholder = product.placeholder
      //console.log(productsArray)
      displayProducts(productsArray);
      document.getElementById("address").innerHTML = address.address
      document.getElementById("street").innerHTML = address.street     

    });

changeLanguage();


const geoLanguage = document.querySelector("#GEO");
const engLanguage = document.querySelector("#ENG");

engLanguage.addEventListener("click", () => {
  selectedLanguage = "ENG";
  changeLanguage();
});

geoLanguage.addEventListener("click", () => {
  selectedLanguage = "GEO";
  changeLanguage();
});
