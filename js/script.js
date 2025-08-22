let logoutBtn = document.querySelector("#logout")
if (logoutBtn) {
    if (localStorage.getItem("email")) {
        logoutBtn.style.display = "inline"
    }

    logoutBtn.addEventListener("click", function () {
     
        localStorage.clear()
        window.location = "login.html";
    });
}


let userD = document.querySelector("#user")
let links = document.querySelector(".auth-buttons")
if (userD) {
    if (localStorage.getItem("email")) {
        links.remove()
        links.style.display = "none"
        userD.innerHTML = `Hello! ${localStorage.getItem("firstname")}`
    }
}
// /////////////////////////////////////////////////////////////////////////
let select = document.querySelector("#searchType")
let searchByName = document.querySelector(".option-1")
let searchByCategory = document.querySelector(".option-2")
let searchInput = document.querySelector("#searchInput")
let searchButton = document.querySelector("#searchButton")

function search() {
    let searchTerm = searchInput.value.toLowerCase();
    let products = document.querySelectorAll(".products .box");

    products.forEach(productCard => {
        let productName = productCard.querySelector(".product-name").textContent.toLowerCase();
        let productDescription = productCard.querySelector(".product-description").textContent.toLowerCase();

        if (select.value === "name" && productName.includes(searchTerm)) {
            productCard.parentElement.style.display = "block";
        } else if (select.value === "category") {
            let productId = productCard.querySelector("[data-id]").getAttribute("data-id");
            let productItem = product.find(item => item.id == productId);

            if (productItem && productItem.category.toLowerCase().includes(searchTerm)) {
                productCard.parentElement.style.display = "block";
            } else {
                productCard.parentElement.style.display = "none";
            }
        } else {
            productCard.parentElement.style.display = "none";
        }
    });
}

// Add event listeners if they don't exist
if (searchInput) {
    searchInput.addEventListener("input", search);
}

if (searchByName) {
    searchByName.addEventListener("click", () => {
        select.value = "name";
        search();
    });
}

if (searchByCategory) {
    searchByCategory.addEventListener("click", () => {
        select.value = "category";
        search();
    });
}
if (searchButton) {
    searchButton.addEventListener("click", search);
}

// searchByName.addEventListener("click", search);
// searchByCategory.addEventListener("click", search);
// searchInput.addEventListener("input", search);




let cart_products = document.querySelector(".carts_products")
let product_divs_cart = document.querySelector(".carts_products")
let product_icon = document.querySelector(".cart-icon i")
product_icon.addEventListener("click", openCart)
if (localStorage.getItem("email")) {
    product_icon.style.display = "inline";
}
function openCart() {
    cart_products.classList.toggle("active")
}
function addEventListenersToButtons() {
    let add_to_Cart = document.querySelectorAll(".add-to-cart");

    add_to_Cart.forEach(button => {
        button.addEventListener("click", (event) => {
            const productId = event.target.getAttribute("data-id");
            const productItem = product.find(item => item.id == productId);
            addtoCart(productItem);
            const allMatchingButtons = document.querySelectorAll(`.add-to-cart[data-id="${productId}"]`);
            const allDeleteButtons = document.querySelectorAll(`.btn-danger[data-id="${productId}"]`);
            allMatchingButtons.forEach(btn => {
                btn.classList.add("active");
            });
            allDeleteButtons.forEach(btn => {
                btn.style.display = 'inline';
            });
        });
    });

    let removeButtons = document.querySelectorAll(".remove-from-cart");
    removeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productId = event.target.getAttribute("data-id");
            removeFromCart(productId);
        });
    });
}

addEventListenersToButtons();

let add_to_favorite = document.querySelectorAll(".add_to_favorite")

add_to_favorite.forEach(button => {

    button.addEventListener("click", (event) => {
        const productId = event.target.closest('.add_to_favorite').getAttribute("data-id");
        const productItem = product.find(item => item.id == productId);
        // console.log(`Added ${productItem.name} to favorites`);
        addtofavorite(productItem)
        const allMatchingButtons = document.querySelectorAll(`.add_to_favorite[data-id="${productId}"]`);
        allMatchingButtons.forEach(btn => {
            btn.classList.add("text-danger");
        })
    })

})
function addtofavorite(productItem) {
    if (localStorage.getItem("email")) {
        let favorite = JSON.parse(localStorage.getItem("favorite")) || [];

        // تحقق مما إذا كان المنتج موجودًا بالفعل في المفضلة لتجنب التكرار
        const isAlreadyInFavorite = favorite.some(item => item.id === productItem.id);

        if (!isAlreadyInFavorite) {
            favorite.push({ ...productItem, quantity: 1 });
            localStorage.setItem("favorite", JSON.stringify(favorite));
            // console.log(`Added ${productItem.name} to favorites`);

            // تحديث حالة أزرار المفضلة فقط
            const allFavoriteButtons = document.querySelectorAll(`.add_to_favorite[data-id="${productItem.id}"]`);
            allFavoriteButtons.forEach(btn => {
                btn.classList.add("text-danger");
            });
        }

        updateFavorite();
    } else {
        window.location = "login.html";
    }
}
function updateFavorite() {
    const favoritecontainer = document.querySelector(".favorite_product_list");
    const favorite = JSON.parse(localStorage.getItem("favorite")) || [];

    if (favoritecontainer) {
        favoritecontainer.innerHTML = "";
    }

    favorite.forEach((item, index) => { // إضافة index هنا
        if (favoritecontainer) {
            favoritecontainer.innerHTML += `
             <div class="favorite-item text-center mx-2">
                <img src="${item.image}" alt="" class="img-fluid img-favorite">
                <h3 class="my-1">${item.name}</h3>
                <i class="fas fa-heart remove-favorite text-danger fs-6 my-2" data-index="${index}"></i>
            </div>
        `;
        }
        // <button class="remove-favorite btn btn-danger" data-index="${index}">remove</button>

    });

    // إضافة مستمعات الأحداث لأزرار الحذف
    const removeButtons = document.querySelectorAll(".remove-favorite");
    removeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productIndex = event.target.getAttribute("data-index");
            removeFromFavoritesByIndex(parseInt(productIndex));
        });
    });
}
updateFavorite()
// دالة جديدة للحذف بناءً على index
function removeFromFavoritesByIndex(index) {
    let favorite = JSON.parse(localStorage.getItem("favorite")) || [];

    // احفظ معرف المنتج قبل حذفه من المصفوفة للاستخدام لاحقًا
    const productId = favorite[index].id;

    // حذف العنصر من المصفوفة بناءً على index
    favorite.splice(index, 1);

    // تحديث التخزين المحلي
    localStorage.setItem("favorite", JSON.stringify(favorite));

    // تحديث واجهة المستخدم
    updateFavorite();

    // تحديث حالة أزرار المفضلة في الواجهة
    const allFavoriteButtons = document.querySelectorAll(`.add_to_favorite[data-id="${productId}"]`);
    allFavoriteButtons.forEach(btn => {
        btn.classList.remove("text-danger");
    });
}

function initializeFavoriteButtons() {
    const favorite = JSON.parse(localStorage.getItem("favorite")) || [];

    favorite.forEach(item => {
        const allFavoriteButtons = document.querySelectorAll(`.add_to_favorite[data-id="${item.id}"]`);
        allFavoriteButtons.forEach(btn => {
            btn.classList.add("text-danger");
        });
    });
}
initializeFavoriteButtons()

function addtoCart(productItem) {
    if (localStorage.getItem("email")) {

        let cart = JSON.parse(localStorage.getItem("cart")) || []

        cart.push({ ...productItem, quantity: 1 })

        localStorage.setItem("cart", JSON.stringify(cart))

        updateCart()
    }
    else {
        window.location = "login.html";
    }


}



function updateCart() {
    const cartContainer = document.querySelector(".cart-items")
    if (!cartContainer) return;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkout_items = document.getElementById("checkout_items")

    var totalPrice = 0;
    var totalcount = 0;
    cartContainer.innerHTML = "";
    if (checkout_items) {
        checkout_items.innerHTML = "";
    }
    cart.forEach((item, index) => {
        let total_Price_item = Math.round(item.price * item.quantity)
        totalPrice += total_Price_item;
        totalcount += item.quantity;
        cartContainer.innerHTML += `
        <div class="cart-item-inner-box d-flex align-items-center juistfiy-content-spacebetwen ">
                  <img src="${item.image}" alt="" class="img-fluid">

                  <div class="info-inner-box">
                    <h2 clss="fs-6">${item.name}</h2>
                    <div>
                      <button class="Quantity-decrease" data-index="${index}">-</button>
                      <span class="Quantity">${item.quantity}</span>
                      <button class="Quantity-increase" data-index="${index}">+</button>
                    </div>
                    <p class="Price">$${total_Price_item}</p>
                    <button href="#" class="btn btn-danger rounded-pill" data-index="${index}" data-id="${item.id}">remove fromcart</button>
                  </div>
                  
                </div>`
        // console.log(checkout_items)
        if (checkout_items) {
            checkout_items.innerHTML += `
         <div class="col-md-6 col-lg-4">
        <div class="checkout-item-inner-box">
        <img src="${item.image}" alt="" class="">

        <div class="checkout-info-inner-box">
          <h2>${item.name}</h2>
          <div>
            <button class="Quantity-decrease" data-index="${index}">-</button>
            <span class="Quantity">${item.quantity}</span>
            <button class="Quantity-increase" data-index="${index}">+</button>
          </div>
          <p class="Price">$${total_Price_item}</p>
          <button href="#" class="btn btn-danger rounded-pill" data-index="${index}" data-id="${item.id}">remove fromcart</button>
        </div>

      </div>
      </div>`
        }
    })
    let cartLength = cart.length
    let badge = document.querySelector(".badge")
    if (localStorage.getItem("email")) {
        badge.style.display = "inline";
    }

    if (badge) {
        badge.innerHTML = cartLength
        // console.log(cart.length)
    }


    const removeButtons = document.querySelectorAll(".btn-danger");
    const increaseButtons = document.querySelectorAll(".Quantity-increase");
    const decreaseButtons = document.querySelectorAll(".Quantity-decrease");

    let priceContainer = document.querySelector("#total_price_p")
    if (priceContainer) {
        priceContainer.innerHTML = `$${totalPrice}`
    }

    increaseButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const itemindex = event.target.closest('button').getAttribute("data-index");
            increaseQuantity(itemindex);
        })
    })
    decreaseButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const itemindex = event.target.closest('button').getAttribute("data-index");
            decreaseQuantity(itemindex);
        })
    })

    removeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productId = event.target.closest('button').getAttribute("data-id");
            removeFromCart(productId);
        });
    });

}


function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}




function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    const productId = cart[index].id;

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
        //   delete deletedDecrease;
        updateButtonStates(productId);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateButtonStates(productId);
    updateCart();

}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id != productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    const isInCart = cart.some(item => item.id == productId);

    const allMatchingButtons = document.querySelectorAll(`.add-to-cart[data-id="${productId}"]`);
    const allDeleteButtons = document.querySelectorAll(`.btn-danger[data-id="${productId}"]`);
    if (!isInCart) {
        allMatchingButtons.forEach(btn => {
            btn.classList.remove("active");
        });
        allDeleteButtons.forEach(btn => {
            btn.style.display = 'none';
        });
    }
    if(localStorage.getItem("email")){
    updateButtonStates(productId);}
    updateCart();


}

if(localStorage.getItem("email")) {
function updateButtonStates(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const allMatchingButtons = document.querySelectorAll(`.add-to-cart[data-id="${productId}"]`);
    const allDeleteButtons = document.querySelectorAll(`.btn-danger[data-id="${productId}"]`);
    const isInCart = cart.some(item => item.id == productId);
   
    if (isInCart) {
        allMatchingButtons.forEach(btn => {
            btn.classList.add("active");
        });

        allDeleteButtons.forEach(btn => {
            btn.style.display = 'inline';
        });
    } else {
        allMatchingButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        allDeleteButtons.forEach(btn => {
            btn.style.display = 'none';
        });
    }}
}
updateCart()
