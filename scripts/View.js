function viewClass (){
    window.GlobalViewRef = this;
    this.ProductsTable = new DomRef('productsTable');
    this.ShoppingCartTable = new DomRef('shoppingCartTable');
    this.OrderButton = new DomRef('orderButtonContainer');
};

viewClass.prototype.PopulateProductsTable = function (modelProducts){
    let tableContent = `<thead><tr><th>Image</th><th>Name</th><th>Description</th><th></th></tr></thead>
                        <tbody>`;
    modelProducts.forEach(prod => {
        tableContent += `
        <tr>
            <td><img src="\\assets\\${prod.ImageRef}" /></td>
            <td>${prod.Name}</td>
            <td>${prod.Description}</td>
            <td><span class="btn btn-primary" onclick="GlobalControllerRef.AddItemToCart(${prod.ID},1)">Add</span></td>
        </tr>
        `
    });
    tableContent += "</tbody>"
    this.ProductsTable.SetInnerHTML(tableContent);
}

viewClass.prototype.PopulateShoppingCartTable = function (modelProducts){
    let tableContent = `<thead><tr><th>Image</th><th>Name</th><th>Quantity</th><th></th></tr></thead>
                        <tbody>`;
    let hasValue =  modelProducts && modelProducts.length > 0;
    if (!hasValue) {
        tableContent += `<tr><td colspan="4">Your cart is empty.</td></tr>`
    } else {
        modelProducts.forEach(cartItem => {
        tableContent += `
        <tr>
            <td><img src="\\assets\\${cartItem.Product.ImageRef}" /></td>
            <td>${cartItem.Product.Name}</td>
            <td>${cartItem.Quantity}</td>
            <td><span class="btn btn-light" onclick="GlobalControllerRef.AddItemToCart(${cartItem.Product.ID}, -1)">Remove</span></td>
        </tr>
        `});
    }
    tableContent += "</tbody>"
    this.ShoppingCartTable.SetInnerHTML(tableContent);
    this.ShowOrderButton(hasValue);
}

viewClass.prototype.ShowOrderButton = function(isShow){
    if (isShow){
        this.OrderButton.ReplaceClass("hide",null);
    }else{
        this.OrderButton.ReplaceClass(null,"hide");
    }
}  
