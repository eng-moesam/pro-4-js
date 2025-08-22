let product=[
    {
        id: 1,
        name: "Ruffle Shirt",
        price: 99.99,
        description: "woman clothes",
        category: "woman",
        image: "images/product-01.jpg"
    },
    {
        id: 2,
        name: "Herschel supply",
        price: 89.99,
        description: "woman clothes",
        category: "woman",
        image: "images/product-02.jpg"
    },
    {
        id: 3,
        name: "Check Trouser",
        price: 79.99,
        description: "Men clothes",
        category: "Men",
        image: "images/product-03.jpg"
    }
    ,{
        id:4,
        name: "Classic Coat",
        price: 69.99,
        description: "woman clothes",
        category: "woman",
        image: "images/product-04.jpg"
    }
    ,{
        id:5,
        name: "Pocket Jumper",
        price: 59.99,
        description: "woman clothes",
        category: "woman",
        image: "images/product-05.jpg"
    },
    {
        id:6,
        name: "Inspired Classic",
        price: 49.99,
        description: " watch",
        category: "watch",
        image: "images/product-06.jpg"
    }
    ,{
        id:7,
        name: "Shirt in Cotton",
        price: 39.99,
        description: "woman clothes",
        category: "woman",
        image: "images/product-07.jpg"
    }
    ,{
        id:8,
        name: "Pieces Printed",
        price: 29.99,
        description: "woman clothes",
        category: "woman",
        image: "images/product-08.jpg"
    },{
        id:9,
        name: "Converse All Star",
        price: 19.99,
        description: "Shoes",
        category: "shoes",
        image: "images/product-09.jpg"
    }
]


// ////////////////////////////////////////////////////////////////////////////////////////////////


let allProducts=document.querySelector(".products")

function drawItems(){
    const cart =JSON.parse(localStorage.getItem("cart")) || [];
    if(allProducts){
        allProducts.innerHTML="";
    product.forEach((item,index) => {
        let isInCart = cart.some(cartitem => cartitem.id === item.id);
    

    let productCard = `
    <div class="col-md-6 col-lg-4 p-4">
    <div class="box card">
        <div class="img-box">
            <img src="${item.image}" alt="" class=" ">
        </div>
        <div class="box-info">
            <p class="product-name fs-3 bold">${item.name}</p>
            <p class="product-price text-black-50">$${item.price}</p>
            <p class="product-description">${item.description}</p>
            <p class="product-category d-none">${item.category}</p>
            <div class="py-2">
                <i class="fas fa-heart add_to_favorite" data-id="${item.id}"></i>
                <button href="#" class="add-to-cart btn-primary btn ${isInCart ? 'active' : ''}" data-id="${item.id}">add to cart</button>
                <button href="#" class="btn btn-danger remove-from-cart" data-id="${item.id}" style="display: ${isInCart ? 'inline' : 'none'};">remove from cart</button>
            </div>
        </div>
    </div>
</div>

    `;
    allProducts.innerHTML += productCard;
})
        // addEventListenersToButtons();

    }

}
drawItems();
