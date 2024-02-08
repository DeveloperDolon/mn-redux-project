import React, { useState } from "react";
import { useDeleteGigFromCartMutation, useGetAllCartItemsQuery, useUpdateIsSelectedCartMutation, useUpdateIsSelectedCartNotMutation } from "@/redux/features/cart/cartApi";
import { IoIosClose } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = () => {
  const { email } = useSelector((state) => state.userSlice);
  const [toggleSelected] = useUpdateIsSelectedCartMutation();
  const [toggleNotSelected] = useUpdateIsSelectedCartNotMutation();
  // const { data: cartItems, isLoading: cartIsLoading } = useGetAllCartItemsQuery();
  const { data: cartItems, isLoading: cartIsLoading } = useGetAllCartItemsQuery(email);
  const [cartItemDelete] = useDeleteGigFromCartMutation();
  const [selectedItems, setSelectedItems] = useState([]);

  // Filter cartItems to get items where isSelected is true
  const selectedCartItems = cartItems?.data?.filter(
    (cartItem) => cartItem.isSelected === true
  );

  //=======> todo
  const customerEmail = email;
  const handleCheckboxChange = (_idx, event, id) => {
    event.stopPropagation();
    const selectedIndex = selectedItems.indexOf(_idx);
    let newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      newSelectedItems = [...selectedItems, _idx];
      toggleSelected({ customerEmail, id });
    } else {
      newSelectedItems.splice(selectedIndex, 1);
      toggleNotSelected({ customerEmail, id });
    }
    setSelectedItems(newSelectedItems);
  };

  // ===================>
  const handleDeleteButtonClick = (e, id) => {
    e.stopPropagation(); // Ensuring the event doesn't propagate further if needed
    handleItemDelete(id);
  };

  const handleItemDelete = (id) => {
    cartItemDelete(id);
  };

  return (
    <div className="w-1/3 bg-[#F2F9FF] mx-auto my-10">
      <div className="border p-5">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-webPrimary font-medium text-2xl">
              Your cart ({cartItems?.data.length} items)
            </h2>
          </div>
          <div>
            <IoIosClose className="text-5xl" />
          </div>
        </div>

        <div className="border"></div>

        <div>
          {cartItems?.data.map((cartItem, _idx) => (
            <div className="mt-3" key={_idx}>
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <input
                      // Cart select checkbox
                      type="checkbox"
                      className="cursor-pointer"
                      checked={cartItem.isSelected} // Checkbox state controlled by isSelected property
                      onChange={(e) =>
                        handleCheckboxChange(_idx, e, cartItem.id)
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div>
                    <img
                      className="w-12 h-12 object-cover"
                      src={cartItem?.gig?.GigsImage[0]?.image}
                      alt=""
                    />
                  </div>
                  <div>
                    <h6 className="font-semibold text-base">{cartItem?.gig?.title}</h6>
                    <p className="text-xs">
                      Category: {cartItem?.gig?.Category?.title}
                    </p>
                    <p className="text-xs">
                      Subcategory:{" "}
                      {cartItem?.gig?.Category?.SubCategory[0]?.title}
                    </p>
                  </div>
                  <div>
                    <IoCloseCircleOutline
                      onClick={(e) =>
                        handleDeleteButtonClick(e, cartItem.id)
                      }
                      className="text-xl cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="border mt-3"></div>
            </div>
          ))}
        </div>

        <div className="text-center my-5">
          <span className="font-semibold text-lg">{selectedCartItems?.length} Design</span>
        </div>

        <div>
          <Link to="/checkout">
            <button className="w-full text-white text-sm font-semibold rounded-full py-3 bg-webPrimary">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
