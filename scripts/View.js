function viewClass() {
    window.GlobalViewRef = this;
    this.ProductsTable = new DomRef('productsTable');
    this.ShoppingCartTable = new DomRef('shoppingCartTable');
    this.OrderButton = new DomRef('orderButtonContainer');
    this.PricingTable = new DomRef('pricingTable')
    this.OrderFormContainer = new DomRef('orderFormContainer');
    this.OrderForm = new DomRef('orderForm');
    this.LoginForm = new DomRef('loginForm');
    this.Welcome = new DomRef('welcome');
};

viewClass.prototype.PopulateProductsTable = function (modelProducts) {
    let tableContent = `<thead><tr><th>Image</th><th>Name</th><th>Description</th><th>Price</th><th></th></tr></thead>
                        <tbody>`;
    modelProducts.forEach(prod => {
        tableContent += `
        <tr>
            <td><img src="\\assets\\${prod.ImageRef}" /></td>
            <td>${prod.Name}</td>
            <td>${prod.Description}</td>
            <td>$${prod.Price}</td>
            <td><span class="btn btn-primary" onclick="GlobalControllerRef.AddItemToCart(${prod.ID},1)">Add</span></td>
        </tr>
        `
    });
    tableContent += "</tbody>"
    this.ProductsTable.SetInnerHTML(tableContent);
}

viewClass.prototype.PopulateShoppingCartTable = function (cart) {
    let tableContent = `<thead><tr><th>Image</th><th>Name</th><th>Quantity</th><th>Price</th><th></th></tr></thead>
                        <tbody>`;
    let hasValue = cart.SelectedProducts && cart.SelectedProducts.length > 0;
    if (!hasValue) {
        tableContent += `<tr><td colspan="4">Your cart is empty.</td></tr>`
    } else {
        cart.SelectedProducts.forEach(cartItem => {
            tableContent += `
        <tr>
            <td><img src="\\assets\\${cartItem.Product.ImageRef}" /></td>
            <td>${cartItem.Product.Name}</td>
            <td>${cartItem.Quantity}</td>
            <td>$${(cartItem.Quantity * cartItem.Product.Price).toFixed(2)}</td>
            <td><span class="btn btn-light" onclick="GlobalControllerRef.AddItemToCart(${cartItem.Product.ID}, -1)">Remove</span></td>
        </tr>
        `});
    }
    tableContent += "</tbody>"
    this.ShoppingCartTable.SetInnerHTML(tableContent);
    this.OrderButton.Show(hasValue);
    this.OrderFormContainer.Show(hasValue);
}

viewClass.prototype.PopulatePricingTable = function (cart) {
    let tableContent = `<tbody>`;
    let hasValue = cart.SelectedProducts && cart.SelectedProducts.length > 0;
    if (hasValue) {
        tableContent += `
        <tr><td>Sub Total</td><td>$${ cart.getSubtotal().toFixed(2) }</td></tr>
        <tr><td>Tax</td><td>$${ cart.getTax().toFixed(2) }</td></tr>
        <tr><td>Shipping</td><td>$${ cart.Shipping.Price.toFixed(2) }</td></tr>
        <tr><td>Grand Total</td><td>$${ cart.getTotal().toFixed(2) }</td></tr>
        `}
    tableContent += "</tbody>"
    this.PricingTable.SetInnerHTML(tableContent);
}

viewClass.prototype.InitializeForm = function(customerName, customerEmail, customerAddress, shippingID){
    new DomRef('CustomerName').SetValue(customerName);
    new DomRef('CustomerEmail').SetValue(customerEmail);
    new DomRef('CustomerAddress').SetInnerHTML(customerAddress);
    new DomRef('orderShipping').SetValue(shippingID);
} 