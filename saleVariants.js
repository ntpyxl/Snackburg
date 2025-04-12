const selectElements = document.querySelectorAll('select');

for(var i = 0; i < selectElements.length; i++) {
    selectElements[i].addEventListener('change', function() {
        const product = this.closest('.menuItem');

        if(product.classList.contains('hasDrinkVariant')) {
            changeDisplayedDrinkFlavor(product);
        }
        if(product.classList.contains('hasSizeVariant')) {
            changeDisplayedPrice(product);
        }
    }); 
}

function changeDisplayedDrinkFlavor(product) {
    const drinkVariant = product.querySelector('#drinkVariant');
    const sodaFlavor = product.querySelector('.sodaFlavor');
    const juiceFlavor = product.querySelector('.juiceFlavor');

    switch(drinkVariant.options[drinkVariant.selectedIndex].text) {
        case "Soda":
            if(juiceFlavor) juiceFlavor.classList.add("hidden");
            if(sodaFlavor) sodaFlavor.classList.remove("hidden");
            break;
        case "Juice":
            if(sodaFlavor) sodaFlavor.classList.add("hidden");
            if(juiceFlavor) juiceFlavor.classList.remove("hidden");
            break;
        case "Water":
            if(sodaFlavor) sodaFlavor.classList.add("hidden");
            if(juiceFlavor) juiceFlavor.classList.add("hidden");
    }
}

function changeDisplayedPrice(product) {
    const snackSize = product.querySelector('#snackSize');
    const drinkSize = product.querySelector('#drinkSize');
    const itemSize = snackSize ? snackSize.options[snackSize.selectedIndex].text : drinkSize.options[drinkSize.selectedIndex].text;

    const productPrice = product.querySelector('.productPrice');
    productPrice.textContent = "PHP " + getItemPrice(product.id, itemSize);
}

function getItemPrice(productId, productSize) {
    const prices = {
        frenchFries: [30, 40, 50],
        potatoChips: [35, 45, 55],
        soda: [20, 30, 40],
        juice: [15, 25, 35],
        water: [10, 15, 20]
    };

    switch(productSize) {
        case "Small":
            return prices[productId][0];
        case "Medium":
            return prices[productId][1];
        case "Large":
            return prices[productId][2];
    }
}