const foodsContainer = document.querySelector('.foodsContainer')

const emptyCart = document.querySelector('.emptyCart')
const confirmOrderContainer = document.querySelector('.cartItems__confirmOrderContainer')
const cartItems = document.querySelector('.cartItems')

const cartItemsContainer = document.querySelector('.cartItems__itemsContainer');
const totalOrderValue = document.querySelector('.cartItems__totalOrderContainer__valueNumber')
const cartTotalItemsCount = document.querySelector('.cart__totalItemsCount')
let cart = []
let foods = []



function renderCart() {

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    if (cartTotalItemsCount) {
        cartTotalItemsCount.textContent = `(${totalItems})`
    }

    if (cart.length === 0) {
        emptyCart.classList.remove('hidden')
        confirmOrderContainer.classList.add('hidden')
        cartItems.classList.add('hidden')
        return
    }

    emptyCart.classList.add('hidden')
    confirmOrderContainer.classList.remove('hidden')
    cartItems.classList.remove('hidden')

    cartItemsContainer.innerHTML = ''

    let totalOrderPrice = 0

    cart.forEach((item, index) => {
        const itemTotalPrice = item.price * item.quantity
        totalOrderPrice += itemTotalPrice

        cartItemsContainer.innerHTML += `
        <div class="cartItems__itemContainer">
                <div class="cartItems__itemContainer__infoContainer">
                    <h4 class="cartItems__itemContainer__itemName">${item.name}</h4>
                    <div class="cartItems__itemContainer__itemNumbersInfoContainer">
                        <span class="cartItems__itemContainer__itemQuantity">${item.quantity}x</span>
                        <div class="cartItems__itemContainer__itemValuesInfoContainer">
                            <p class="cartItems__itemContainer__itemUnityValue">@ $<span class="cartItems__itemContainer__itemUnityValue__number">${item.price.toFixed(2)}</span></p>
                            <p class="cartItems__itemContainer__itemTotalValue">$<span class="cartItems__itemContainer__itemTotalValue__number">${itemTotalPrice.toFixed(2)}</span></p>
                        </div>
                    </div>
                </div>
                <button class="cartItems__itemContainer__deleteButton" data-index="${index}">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none"
                                viewBox="0 0 10 10">
                                <path fill="#AD8A85"
                                    d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z" />
                            </svg>
                </button>
            </div>
        `
    })

    totalOrderValue.textContent = totalOrderPrice.toFixed(2)


    const cartItemsDeleteButtons = document.querySelectorAll('.cartItems__itemContainer__deleteButton')

    cartItemsDeleteButtons.forEach((button) => {
        button.addEventListener('click', () => {

            const index = button.getAttribute('data-index')
            const itemToRemove = cart[index]

            cart.splice(index, 1)

            const foodIndex = foods.findIndex(food => food.name === itemToRemove.name)

            if (foodIndex !== -1) {

                const addToCartBtn = document.querySelectorAll('.addToCartBtn')[foodIndex]
                const quantityContainer = document.querySelectorAll('.addToCartWithQuantityContainer')[foodIndex]
                const itemQuantityToAdd = document.querySelectorAll('.addToCartWithQuantityContainer__text')[foodIndex]

                itemQuantityToAdd.textContent = '0'

                quantityContainer.classList.add('hidden')
            }

            renderCart()

        })
    })




}






async function getData() {

    try {
        let response = await fetch('./data.json')
        let data = await response.json()


        foods = data


        foodsContainer.innerHTML = `${data.map(food => `
        <div class="food">
            <div class="food__imageContainer">

        <picture>
            <source media="(min-width: 90rem)" srcset="${food.image.desktop}">

                <source media="(min-width: 48rem)" srcset="${food.image.tablet}"">

                    <img class="food__image" src="${food.image.mobile}" alt="${food.name}">

        </picture>                
                <button class="addToCartBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20">
                        <g fill="#C73B0F" clip-path="url(#a)">
                            <path
                                d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
                            <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
                        </g>
                        <defs>
                            <clipPath id="a">
                                <path fill="#fff" d="M.333 0h20v20h-20z" />
                            </clipPath>
                        </defs>
                    </svg>

                    <p class="addToCartBtn__text">Add to Cart</p>
                </button>

                <div class="addToCartWithQuantityContainer hidden">
                    <button class="addToCartWithQuantity__button addToCartWithQuantity__decrementButton">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2">
                            <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
                        </svg>
                    </button>

                    <p class="addToCartWithQuantityContainer__text">0</p>

                    <button class="addToCartWithQuantity__button addToCartWithQuantity__incrementButton">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                            <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
                        </svg>
                    </button>
                 </div>
            </div>

            <div class="food_infoContainer">
                <h2 class="food__category"> ${food.category}</h2>
                <h3 class="food__name">${food.name}</h3>
                <p class="food__price">$<span class="food__price-number">${food.price.toFixed(2)}</span></p>
            </div>

        </div>
        `).join('')}`

        const addToCartBtn = document.querySelectorAll('.addToCartBtn')
        const addToCartWithQuantityContainer = document.querySelectorAll('.addToCartWithQuantityContainer')

        addToCartBtn.forEach((button, index) => {

            button.addEventListener('click', () => {
                addToCartWithQuantityContainer[index].classList.remove('hidden')

                const food = foods[index]
                const existingItem = cart.find(item => item.name === food.name)

                if (existingItem) {
                    existingItem.quantity += 1
                } else {
                    cart.push({
                        name: food.name,
                        price: food.price,
                        quantity: 1,
                        image: food.image.thumbnail
                    })
                }

                const currentItem = cart.find(item => item.name === food.name)
                itemQuantityToAdd[index].textContent = currentItem.quantity

                renderCart()
            })

        })


        const incrementButton = document.querySelectorAll('.addToCartWithQuantity__incrementButton')
        const decrementButton = document.querySelectorAll('.addToCartWithQuantity__decrementButton')
        let itemQuantityToAdd = document.querySelectorAll('.addToCartWithQuantityContainer__text')

        incrementButton.forEach((button, index) => {
            button.addEventListener('click', () => {

                const food = foods[index]

                const existingItem = cart.find(item => item.name === food.name);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        name: food.name,
                        price: food.price,
                        quantity: 1,
                        image: food.image.thumbnail
                    });
                }

                const currentItem = cart.find(item => item.name === food.name)
                itemQuantityToAdd[index].textContent = currentItem.quantity

                renderCart();
            })
        })


        decrementButton.forEach((button, index) => {
            button.addEventListener('click', () => {

                const food = foods[index]

                const existingItemIndex = cart.findIndex(item => item.name === food.name);

                if (existingItemIndex !== -1) {
                    cart[existingItemIndex].quantity -= 1;

                    let currentQuantity = cart[existingItemIndex].quantity;

                    itemQuantityToAdd[index].textContent = currentQuantity;

                    if (currentQuantity === 0) {
                        cart.splice(existingItemIndex, 1);

                        addToCartWithQuantityContainer[index].classList.add('hidden');
                    }
                }

                renderCart();
            })
        })










    }

    catch (error) {
        console.error('Erro ao carregar os dados:', error)
    }
}


getData()





