import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import Header from "./components/Header/Header";
import ProductPage from "./pages/ProductPage/ProductPage";
import {
  CartContext,
  CartContextProvider,
} from "./contexts/CartContext/Cart.context";
import {
  ProductsContext,
  ProductsContextProvider,
} from "./contexts/ProductsContext/Products.context";
import CartPage from "./pages/CartPage/CartPage";
import { OrdersContextProvider } from "./contexts/OrdersContext/Orders.context";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import { AuthContextProvider } from "./contexts/AuthContext/Auth.context";
import AuthPopup from "./components/AuthPopup/AuthPopup";
import { PopupContextProvider } from "./contexts/PopupContext/Popup.context";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import { WishlistContextProvider } from "./contexts/WishlistContext/Wishlist.context";

function App() {
  return (
    <>
      <PopupContextProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <ProductsContextProvider>
                <OrdersContextProvider>
                  <Header></Header>
                  <AuthPopup></AuthPopup>
                  <div className="latime">
                    <Routes>
                      <Route path="/" element={<HomePage></HomePage>}></Route>
                      <Route
                        path="/products/:category"
                        element={<ProductsPage></ProductsPage>}
                      ></Route>
                      <Route
                        path="/product/:id"
                        element={<ProductPage></ProductPage>}
                      ></Route>
                      <Route path="/cart" element={<CartPage></CartPage>}></Route>
                      <Route
                        path="/orders"
                        element={<OrdersPage></OrdersPage>}
                      ></Route>
                      <Route
                        path="/order/:id"
                        element={<OrderPage></OrderPage>}
                      ></Route>
                      <Route
                        path="/wishlist"
                        element={<WishlistPage></WishlistPage>}
                      ></Route>
                    </Routes>
                  </div>
                </OrdersContextProvider>
              </ProductsContextProvider>
            </WishlistContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </PopupContextProvider>
    </>
  );
}

export default App;
