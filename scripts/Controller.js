function controllerClass (){
    this.Model = new modelClass();
    window.GlobalControllerRef = this;
    this.Model.ShoppingCart = this.InitializeShoppingCart();
    this.PopulateProductsTable();
    this.PopulateShoppingCartTable();
    this.PopulatePricingTable();
    this.FormRegistration();

}

controllerClass.prototype.FormRegistration = function(){
    this.OrderForm = new FormBinding(ModelRef.ShoppingCart,'orderForm', 
                                    (model)=> { this.OrderFormOnChange(model);},
                                    () => { this.SubmitOrder();})

    this.LoginForm = new FormBinding(ModelRef.Authentication,'loginForm');
    
    this.UserEditForm = new FormBinding(ModelRef.UserEdit, 'userEdit', 
                                        ()=>{ return;}, 
                                        () => { this.UpdateUser(this.Model.UserEdit);});
}

controllerClass.prototype.OrderFormOnChange = function(model){
    let orderID = model.orderShipping ? model.orderShipping : 0;
    this.UpdateShipping(orderID);
    LocalStorage.ShoppingCart.set(ModelRef.ShoppingCart);
}

controllerClass.prototype.InitializeShoppingCart = function(){
    let localCart = LocalStorage.ShoppingCart.get();
    if (localCart) {
        GlobalViewRef.InitializeForm(localCart.CustomerName, 
                                    localCart.CustomerEmail, 
                                    localCart.CustomerAddress, 
                                    localCart.Shipping.ID);

        return cart = new Cart(localCart.SelectedProducts,
                            localCart.Shipping, 
                            localCart.CustomerName, 
                            localCart.CustomerEmail, 
                            localCart.CustomerAddress);
    }else{
       return  cart = new Cart();
    }
}

controllerClass.prototype.UpdateShipping = function(ShipingID){
    let shipping = Picklists.ShippingTypes[ShipingID];
    if (shipping) {
        this.Model.ShoppingCart.Shipping = shipping;
        this.PopulatePricingTable();
    }
}

controllerClass.prototype.PopulateProductsTable = function () {
    this.Model.Products = [];
    Data.Get("Product").then((res) => {
        let productList = res.Result;
        productList.forEach(prod => {
            let newProduct = new Product(prod.ID, 
                                        prod.Name, 
                                        prod.Description, 
                                        prod.ImageRef, 
                                        prod.Price);
            this.Model.Products.push(newProduct);
        });
        GlobalViewRef.PopulateProductsTable(this.Model.Products);
    });
}

controllerClass.prototype.PopulateShoppingCartTable = function () {
    GlobalViewRef.PopulateShoppingCartTable(this.Model.ShoppingCart);
    this.PopulatePricingTable();
}

controllerClass.prototype.PopulatePricingTable = function () {
    GlobalViewRef.PopulatePricingTable(this.Model.ShoppingCart);
}

controllerClass.prototype.AddItemToCart = function (productID, increment){
    let alreadyInCart = this.Model.ShoppingCart.SelectedProducts.find(x => x.Product.ID == productID);
    if (alreadyInCart){
        alreadyInCart.Quantity += increment;
    }else{
        let selectedProduct = this.Model.Products.find(x => x.ID == productID);
        let newCartItem =  new SelectedProduct(1, selectedProduct);
        this.Model.ShoppingCart.SelectedProducts.push(newCartItem);
    }
    
    this.Model.ShoppingCart.SelectedProducts = this.Model.ShoppingCart.SelectedProducts.filter(x => x.Quantity > 0);
    LocalStorage.ShoppingCart.set(this.Model.ShoppingCart);
    this.PopulateShoppingCartTable();
}

controllerClass.prototype.EmptyCart = function () {
    this.Model.ShoppingCart = new Cart()
    this.OrderForm.ObjectRef = this.Model.ShoppingCart;
    LocalStorage.ShoppingCart.clear();
    GlobalViewRef.OrderForm.Reset();
    this.PopulateShoppingCartTable();
}

controllerClass.prototype.Login = function(){
    Data.Post("Login",this.Model.Authentication)
    .then((res) => {
        if(res.ValidationMessages.length > 0) {
            alert(res.ValidationMessages[0]);
            return;
        }

        let loginModel = res.Result[0];
        Object.assign(this.Model.Authentication, loginModel);

        this.LoginForm.ModelToForm(this.Model.Authentication, 'loginForm'); 
        GlobalViewRef.LoginForm.Show(false);  
        GlobalViewRef.Welcome.SetInnerHTML(`
        <span>Welcome, ${loginModel.Login}</span>
        <span class="btn btn-light" onclick="GlobalControllerRef.LogOut()">Log Out</span>`); 
        GlobalViewRef.ShowAdmin(loginModel.IsAdmin);  
        this.GetUsers(loginModel.IsAdmin);  
    });
}

controllerClass.prototype.SignUp = function () {
    Data.Post('User', this.Model.Authentication).then((res) =>{
      if(res.ValidationMessages.length > 0) {
        alert(res.ValidationMessages[0]);
        return;
      }

      alert("Success, Please Login to Continue");
    });
  }

controllerClass.prototype.UpdateUser = function(userModel) {
    Data.Put('User',userModel).then((res) => {
        if(res.ValidationMessages.length > 0) {
            alert(res.ValidationMessages);
            return;
        }
        this.GetUsers();
        Object.assign(this.Model.UserEdit, new Authentication());
        this.UserEditForm.ModelToForm();
        GlobalViewRef.UserEdit.Show(false);
    });
}

controllerClass.prototype.GetUsers = function(){
    Data.Get('User').then((res)=>{
        this.Model.Users = res.Result;
        GlobalViewRef.DisplayUsers(this.Model.Users);
    });
}

controllerClass.prototype.SetEditUser = function(userID){
    let user = this.Model.Users.filter( x => x.UserID == userID);
    Object.assign(this.Model.UserEdit,user[0])
    this.UserEditForm.ModelToForm();
    GlobalViewRef.UserEdit.Show(true);
}

controllerClass.prototype.ClearUser = function(){
    Object.assign(this.Model.UserEdit, new Authentication());
    this.UserEditForm.ModelToForm();
}


controllerClass.prototype.LogOut = function(){
    Object.assign(this.Model.Authentication.UserID,new Authentication);
    GlobalViewRef.Welcome.SetInnerHTML('');  
    GlobalViewRef.LoginForm.Show(true);
    GlobalViewRef.ShowAdmin(false);  
    GlobalViewRef.DisplayUsers([]);
    this.LoginForm.ObjectRef = this.Model.Authentication;
    this.LoginForm.ModelToForm(); 
}

controllerClass.prototype.SubmitOrder = function(){
    if(this.Model.ShoppingCart.SelectedProducts.length == 0){
        alert("Your cart is empty");
    }

    let rejectMessages = []; 

    let orderRef = this.Model.ShoppingCart;

    if(!orderRef.CustomerEmail.IsType(RegexType.Email,'i'))
        rejectMessages.push("Email is Invalid");

    let selectedProducts = []
    orderRef.SelectedProducts.forEach(
        (selectedProd) => {
            let prod = selectedProd.Product;
            selectedProducts.push({
                product_quantity: selectedProd.Quantity,
                product_price: prod.Price,
                product_ID: prod.ID
        });
    });

    let orderSubmit = {
        UserID: this.Model.Authentication.UserID,
        CustomerAddress: orderRef.CustomerAddress,
        CustomerName: orderRef.CustomerName,
        ShippingType: orderRef.Shipping.Type,
        ShippingCost: orderRef.Shipping.Price,
        SubTotal: orderRef.getSubtotal(),
        Tax: orderRef.getTax(),
        Total: orderRef.getTotal(),
        ProductList: selectedProducts
    }

    Data.Post('Order',orderSubmit).then((res) => {
        if(res.ValidationMessages.length > 0) {
            alert(res.ValidationMessages);
            return;
        }
        this.EmptyCart();
        alert(`Thank you for your order, your order confirmation # is ${res.Result} `);
        
    });
}