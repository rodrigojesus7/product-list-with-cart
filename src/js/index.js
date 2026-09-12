const foodsContainer = document.querySelector('.foodsContainer')

let screenSize = ''


if (innerWidth < 768) {
    screenSize = 'mobile'
} else if (innerWidth < 1024) {
    screenSize = 'tablet'
} else {
    screenSize = 'desktop'
}



async function getData() {

    try {
        let response = await fetch('./data.json')
        let data = await response.json()

        console.log(data[0].image.thumbnail)
        console.log(data)




        foodsContainer.innerHTML = `${data.map(food => `
        <div class="food">
            <div class="food__imageContainer">
                <img class="food__image" src="${food.image[screenSize]}" alt="${food.name}">
                
                <button class="addToCartBtn hidden">
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

                <div class="addToCartWithQuantityContainer">
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
    }

    catch (error) {
        console.error('Erro ao carregar os dados:', error)
    }
}


getData()





