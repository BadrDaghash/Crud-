//! Selectors
let productNameInput = document.querySelector("#productName");
let productPriceInput = document.querySelector("#productPrice");
let productCategoryInput = document.querySelector("#productCategory");
let productDescInput = document.querySelector("#productDesc");
let productImgInput = document.querySelector("#productImage");
let searchInput = document.querySelector("#searchInput");
//! btn
let addProduct = document.querySelector("#addProduct");
let updateProduct = document.querySelector("#updateProduct");
//! Array
let productsContainer = [];
let updatedIndex;
//! JS 
if (localStorage.getItem("products") !== null) {
    productsContainer = JSON.parse(localStorage.getItem("products"))
    displayProducts(productsContainer)
}
//! addProduct
addProduct.addEventListener("click", function () {
    let product = {
        code: productNameInput.value,
        price: productPriceInput.value,
        categ: productCategoryInput.value,
        desc: productDescInput.value,
        img: `products/${productImgInput.files[0].name}`,
    }
    productsContainer.push(product)
    localStorage.setItem('products', JSON.stringify(productsContainer))
    clearData()
    displayProducts(productsContainer)

    console.log(productsContainer);
})
//! Display Products function 
function displayProducts(arr) {
    let innerDisplay = ''
    for (let i = 0; i < arr.length; i++) {
        innerDisplay += ` <div class="col-md-3 col-sm-6"> <div class="product">
        <img src="${arr[i].img}" alt="Laptop" class="w-100">
        <h2 class="h4 text-white">${arr[i].code}</h2>
        <p class="test-secondary mb-2 text-white">${arr[i].desc}</p>
        <h3 class="h6 text-white"><span class="fw-bolder ">Price :</span>${arr[i].price}$</h3>
        <h3 class="h6 text-white"><span class="fw-bolder ">Category :</span>${arr[i].categ}</h3>
        <button class="btn btn-danger text-white btn-sm w-100 my-2  " onclick="deleteProduct(${i})">Delete <i class="fas fa-trash-alt"></i></button>
        <button class="btn btn-primary text-white btn-sm w-100 my-2" onclick="setFormForUpdate(${i})" >Update <i class="fas fa-pen"></i></button>
    </div></div>`
    }
    document.querySelector('#rowData').innerHTML = innerDisplay;

}
searchInput.addEventListener("input", function () {
    let termProducts = [];
    let searchTerm = searchInput.value;
    for (let i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].code.toLowerCase().includes(searchTerm) == true) {
            termProducts.push(productsContainer[i])
        }
    }
    displayProducts(termProducts)
});

//! Update Product function
updateProduct.addEventListener("click", function () {
    addProduct.classList.remove("d-none")
    updateProduct.classList.add("d-none")
    productsContainer[updatedIndex].code = productNameInput.value
    productsContainer[updatedIndex].price = productPriceInput.value
    productsContainer[updatedIndex].categ = productCategoryInput.value
    productsContainer[updatedIndex].desc = productDescInput.value
    displayProducts(productsContainer)
    localStorage.setItem('products', JSON.stringify(productsContainer))
    clearData()
})

//! Clear Data function
function clearData() {
    productNameInput.value = null
    productPriceInput.value = null
    productCategoryInput.value = null
    productDescInput.value = null
    productImgInput.value = null
}
//! Search Product 
function setFormForUpdate(i) {
    updatedIndex = i
    addProduct.classList.add("d-none")
    updateProduct.classList.remove("d-none")
    productNameInput.value = productsContainer[i].code
    productPriceInput.value = productsContainer[i].price
    productCategoryInput.value = productsContainer[i].categ
    productDescInput.value = productsContainer[i].desc

    console.log('hi');
}

//! delete Product function
function deleteProduct(deletedIndex) {
    productsContainer.splice(deletedIndex, 1)
    displayProducts(productsContainer)
    localStorage.setItem('products', JSON.stringify(productsContainer))
    console.log(productsContainer);
}

function validateInputs(element) {
    let regex = {
        productName: /^[A-Z][a-z]{2,15}$/,
        productPrice: /^[1-9][0-9]{2,3}$/,
        productDesc: /^.{1,15}$/,
        productCategory: /^(Mobile|Tv|Laptop|Watch)$/,
    }
    if (regex[element.id].test(element.value) == true) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        element.nextElementSibling.classList.replace('d-block','d-none')
       
        return true

    } else {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        element.nextElementSibling.classList.replace("d-none", "d-block")
        return false
    }
}
