import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, Minus, Plus } from "lucide-react";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/slice/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const getDiscountedPrice = (price, discount) => {
    if (discount == null || discount === undefined) return price;
    return price - (price * discount) / 100;
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => {
      const finalPrice = getDiscountedPrice(item.price, item.discount);
      return total + finalPrice * item.quantity;
    }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-2xl shadow-sm border hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl border"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h2>

                      <div className="flex items-center gap-3 mt-1">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item._id))}
                          className="w-8 h-8 flex items-center justify-center rounded-full border text-gray-700 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>

                        <span className="px-2 font-medium text-gray-700">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => dispatch(increaseQuantity(item._id))}
                          className="w-8 h-8 flex items-center justify-center rounded-full border text-gray-700 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <p className="mt-2 text-gray-900 font-semibold">
                        {item.discount ? (
                          <>
                            <span className="line-through text-gray-500 mr-2">
                              Rs: {(item.price * item.quantity).toLocaleString("en-PK", {
                                minimumFractionDigits: 2,
                              })}
                            </span>
                            <span className="text-red-600">
                              Rs:{" "}
                              {(
                                getDiscountedPrice(item.price, item.discount) *
                                item.quantity
                              ).toLocaleString("en-PK", {
                                minimumFractionDigits: 2,
                              })}
                            </span>
                          </>
                        ) : (
                          <>
                            Rs:{" "}
                            {(item.price * item.quantity).toLocaleString("en-PK", {
                              minimumFractionDigits: 2,
                            })}
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="text-red-500 hover:text-red-600 mt-4 sm:mt-0"
                    title="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-white rounded-2xl shadow-sm border">
              <div className="flex items-center justify-between text-lg font-semibold text-gray-700">
                <span>Total:</span>
                <span className="text-green-600 text-xl font-bold">
                  Rs {getTotalPrice().toLocaleString("en-PK", { minimumFractionDigits: 2 })}
                </span>
              </div>

              <button className="mt-6 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-xl shadow transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
