import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import * as CART from "../constants/cart.js";
import Toast from "../components/Toast/Toast.js";

class Store {
  constructor() {
    this.store = localStorage;
  }

  getCartList() {
    return JSON.parse(this.store.getItem("cart"));
  }

  setCartList(product) {
    this.store.setItem("cart", JSON.stringify(product));
    return true;
  }

  initCartItem() {
    this.store.setItem("cart", JSON.stringify([]));
  }

  setCartItem(product) {
    if (this.checkDuplication(product)) {
      new Toast("이미 장바구니에 있는 상품입니다.");
      return false;
    }

    const { price } = product;
    const cartList = this.getCartList();

    const newCartList = [
      ...cartList,
      { ...product, id: uuidv4(), quantity: CART.INIT_QUANTITY, total: price }
    ];

    this.store.setItem("cart", JSON.stringify(newCartList));
    return true;
  }

  checkDuplication(product) {
    const cartList = this.getCartList();

    if (this.isEmpty()) {
      return;
    }

    const isDuplicationExist = cartList.some(
      cartItem => cartItem.name === product.name
    );

    return isDuplicationExist;
  }

  isEmpty() {
    const cartList = this.getCartList();

    if (cartList.length === 0) {
      return true;
    }

    return false;
  }
}

const cart = new Store();

export { cart };
