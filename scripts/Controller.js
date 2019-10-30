function controllerClass (){
    this.Model = new modelClass();
    window.GlobalControllerRef = this;
    this.PopulateProductsTable();
};

controllerClass.prototype.PopulateProductsTable = function () {
    this.Model.Products = [];
    Data.Get("Product.php").then((productList) => {
        productList.forEach(prod => {
            let newProduct = new Product(prod.ID, prod.Name, prod.Description, prod.ImageRef);
            this.Model.Products.push(newProduct);
        });
        GlobalViewRef.PopulateProductsTable(this.Model.Products);
    });
}

controllerClass.prototype.AddItemToCart = function (productID){
    let selectedProduct = this.Model.Products.find( x => x.ID == productID);
    this.Model.ShoppingCart.push(selectedProduct);
    //this.Model.View.UpdateShoppingCart();
}