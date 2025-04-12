const buttonElements = document.querySelectorAll('.addOrderButton');
let totalAmount = 0;

// If a button is clicked, checks which item it's pressed on and adds to order list
for(var i = 0; i < buttonElements.length; i++) {
    buttonElements[i].addEventListener('click', function() {
        const product = this.closest('.menuItem');
        const isComboItem = product.classList.contains('comboItem');
        const hasSnackVariant = product.classList.contains('hasSnackVariant');
        const hasDrinkVariant = product.classList.contains('hasDrinkVariant');
        addNewItem(product, isComboItem, hasSnackVariant, hasDrinkVariant);
    });
}

function addNewItem(product, isComboItem, hasSnackVariant, hasDrinkVariant){
    const productName = product.querySelector('.productName').textContent;
    const quantity = product.querySelector('#quantity').value;
    const price = quantity * parseInt(product.querySelector('.productPrice').textContent.replace('PHP ', '')); // i.e. from "PHP 90", parses it into an integer 90

    changeTotalAmount(price);
    createParentItem(productName, quantity, price);

    if(isComboItem) {
        switch(productName) {
            case "Quickombo":
                createChildItem("Cheeseburger");
                break;
            case "Decent Combo":
                createChildItem("Cheeseburger");
                break;
            case "Big Combo":
                createChildItem("Bacon Cheesebuger");
                break;
            case "Wombo Combo":
                createChildItem("Stacked Burger");
                break;
        }
    }
    if(hasSnackVariant) {
        const snackVariant = product.querySelector('#snackVariant');
        const snackFlavor = product.querySelector('#snackFlavor');
        const snackSize = product.querySelector('#snackSize');
        const displaySnackVariant = snackFlavor.options[snackFlavor.selectedIndex].text + " " + snackVariant.options[snackVariant.selectedIndex].text + " " + snackSize.options[snackSize.selectedIndex].text[0];

        createChildItem(displaySnackVariant);
    }
    if(hasDrinkVariant) {
        const drinkVariant = product.querySelector('#drinkVariant');
        const drinkFlavor = product.querySelector(drinkVariant.options[drinkVariant.selectedIndex].text == "Soda" ? '#sodaFlavor' : '#juiceFlavor');
        const drinkSize = product.querySelector('#drinkSize');

        let displayDrinkVariant;
        if(drinkVariant.options[drinkVariant.selectedIndex].text == "Water") {
            displayDrinkVariant = drinkVariant.options[drinkVariant.selectedIndex].text + " " + drinkSize.options[drinkSize.selectedIndex].text[0];
        } else {
            displayDrinkVariant = drinkFlavor.options[drinkFlavor.selectedIndex].text + " " + drinkVariant.options[drinkVariant.selectedIndex].text + " " + drinkSize.options[drinkSize.selectedIndex].text[0];
        }

        createChildItem(displayDrinkVariant);
    }
}

function createParentItem(productName, quantity, price) {
    const orderList = document.getElementById('orderList');

    const row = document.createElement('div');
    row.className = 'grid grid-cols-[7fr_2fr_3fr] gap-2 border-t border-gray-500 px-3 pt-2';

    const displayName = document.createElement('span');
    displayName.className = 'text-left';
    displayName.textContent = productName;

    const displayQuantity = document.createElement('span');
    displayQuantity.className = 'text-center';
    displayQuantity.textContent = "x" + quantity;

    const displayPrice = document.createElement('span');
    displayPrice.className = 'text-right';
    displayPrice.textContent = price;

    row.appendChild(displayName);
    row.appendChild(displayQuantity);
    row.appendChild(displayPrice);
    orderList.appendChild(row);
}

function createChildItem(variantName) {
    const orderList = document.getElementById('orderList');

    const row = document.createElement('div');
    row.className = 'grid grid-cols-[7fr_2fr_3fr] gap-2 border-none border-gray-500 px-3';

    const displayName = document.createElement('span');
    displayName.className = 'text-left ml-5 font-normal';
    displayName.textContent = variantName;

    row.appendChild(displayName);

    orderList.appendChild(row);
}

function changeTotalAmount(priceToAdd) {
    totalAmount = parseInt(totalAmount) + priceToAdd;
    displayedTotalAmount = document.getElementById('totalAmount');
    displayedTotalAmount.textContent = "PHP " + totalAmount;
}

function pay() {
    if(totalAmount != 0) {
        userPayAmount = document.getElementById('userPayAmount').value;
        if(userPayAmount >= totalAmount) {
            const change = userPayAmount - totalAmount;
            alert("Thank your for purchasing from Snackburg! Your change is: PHP " + change + "!");
            location.reload();
        } else {
            alert("You have insufficient funds! Please try again!")
        }
    }
    
}