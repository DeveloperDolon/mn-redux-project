import React, { useState } from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetAdminUserByEmailQuery } from "@/redux/features/adminUser/adminUserApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/menubar";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { logout } from "@/redux/features/users/userSlice";
import {
  useDeleteGigFromCartMutation,
  useDeleteManyGigFromCartMutation,
  useGetAllCartItemsQuery,
  useUpdateIsSelectedCartMutation,
  useUpdateIsSelectedCartNotMutation,
} from "@/redux/features/cart/cartApi";
import { IoIosClose } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { GiShoppingCart } from "react-icons/gi";
import { BsCart4 } from "react-icons/bs";
const Navbar = () => {

  const { email } = useSelector((state) => state.userSlice);
  const [toggleSelected] = useUpdateIsSelectedCartMutation();
  const [toggleNotSelected] = useUpdateIsSelectedCartNotMutation();
  const { data: cartItems, isLoading: cartIsLoading } = useGetAllCartItemsQuery(email);
  const [cartItemDelete] = useDeleteGigFromCartMutation();
  const { data: AdminUserData, isLoading } = useGetAdminUserByEmailQuery({
    email,
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartAllItemDelete] = useDeleteManyGigFromCartMutation();

  const dispatch = useDispatch();

  const handleLogout = () => {

    Swal.fire({
      title: 'Are you sure log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Log Out'
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth);
        dispatch(logout());
      }
    })
  };

  const selectedCartItems = cartItems?.data?.filter(
    (cartItem) => cartItem.isSelected === true
  );

  const handleCheckboxChange = (_idx, event, id) => {
    event.stopPropagation();
    const selectedIndex = selectedItems.indexOf(_idx);
    let newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      newSelectedItems = [...selectedItems, _idx];
      toggleSelected({ email, id });
    } else {
      newSelectedItems.splice(selectedIndex, 1);
      toggleNotSelected({ email, id });
    }
    setSelectedItems(newSelectedItems);
  };

  // ===================>
  const handleDeleteButtonClick = (e, id) => {
    e.stopPropagation();
    handleItemDelete(id);
  };

  const handleItemDelete = (id) => {
    cartItemDelete(id);
  };

  // ===================>
  const handleManyDeleteButtonClick = (e) => {
    e.stopPropagation();
    cartAllItemDelete({ email });
  };

  return (
    <Menubar className="bg-transparent border-none outline-none text-white">
      <MenubarMenu>
        <MenubarTrigger className="font-normal text-base">
          <Link to={"/"}>Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-normal text-base">
          <Link to={"/inbox"}>Inbox </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-normal text-base">
          <Link to={"/"}>Notifications</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-normal text-base">
          <Link to={"/about"}>About</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="font-normal text-base">
          <Link to={"/contact"}>Contact</Link>
        </MenubarTrigger>
      </MenubarMenu>

      {email ? (
        <MenubarMenu>
          <MenubarTrigger>
            <Avatar>
              <AvatarImage src={AdminUserData?.data?.image} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          {AdminUserData?.data &&
            AdminUserData?.data.role === "admin" &&
            AdminUserData?.data.status === "active" ? (
            <MenubarContent>
              <MenubarItem inset>
                <Link to={"/admin-dashboard"}>Dashboard</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>
                <Link onClick={handleLogout}>Log Out</Link>
              </MenubarItem>
            </MenubarContent>
          ) : (
            // =========================================>
            <MenubarContent>
              <MenubarItem inset>
                <Link to={"/customer-profile"}>Profile</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>
                <Link to={"/billing-address"}>Billing Address</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>
                <Link to={"/social-media"}>Social Media</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>
                <Link to={"/change-password"}>Change Password</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>
                <Link onClick={handleLogout}>Log Out</Link>
              </MenubarItem>
            </MenubarContent>
          )}
        </MenubarMenu>
      ) : (
        <MenubarMenu>
          <Link to={"/customer-login"}>Join</Link>
        </MenubarMenu>
      )}

      {email ? <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative">
            <span className="absolute -right-0 -top-1 bg-webPrimary text-white rounded-full w-6 h-6 flex items-center justify-center">
              {cartItems?.data?.length}
            </span>
            <TiShoppingCart className="text-3xl" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[400px] p-2 mr-6 overflow-y-auto max-h-[400px]">
          <DropdownMenuLabel>
            {cartItems?.data?.length > 0 ? <div className="flex justify-between items-center gap-10">
              <div>
                <h2 className="text-webPrimary font-medium text-xl">
                  {
                    cartItems?.data?.length > 0 && `Your cart (${cartItems?.data?.length} items)`
                  }
                </h2>
              </div>
              <div>
                <IoIosClose onClick={(e) =>
                  handleManyDeleteButtonClick(e)
                } className="text-5xl cursor-pointer" />
              </div>
            </div> : <p className="text-webPrimary font-medium text-xl text-center">You have no item selected!</p>
            }
          </DropdownMenuLabel>
          {
            cartItems?.data?.length > 0 &&
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {cartItems?.data?.map((cartItem, _idx) => (
                  <React.Fragment key={_idx}>
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <div>
                            <input

                              type="checkbox"
                              className="cursor-pointer"
                              checked={cartItem.isSelected}
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
                    </DropdownMenuItem>
                    <DropdownMenuSeparator key={`separator_${_idx}`} />
                  </React.Fragment>
                ))}

                <DropdownMenuItem>
                  <p className="font-bold text-lg w-full text-center">
                    {selectedCartItems?.length} Design
                  </p>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <div className="grid grid-cols-2 gap-5 w-full">
                    <Link to="/cart">
                      <button className="w-full text-white text-sm font-semibold rounded-full py-2 bg-gray-400 ">
                        View Cart
                      </button>
                    </Link>
                    <Link to="/checkout">
                      <button className="w-full text-white text-sm font-semibold rounded-full py-2 bg-webPrimary">
                        Checkout
                      </button>
                    </Link>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          }
        </DropdownMenuContent>
      </DropdownMenu> : <MenubarMenu>
        <MenubarTrigger>
          <TiShoppingCart className="text-3xl" />
        </MenubarTrigger>
      </MenubarMenu>}
    </Menubar>
  );
};

export default Navbar;