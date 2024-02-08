import React from "react";
import Container from "../../Container";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCustomerByIdQuery } from "@/redux/features/customer/customer";
import { useGetRoleByEmailQuery } from "@/redux/features/roleManage/roleApi";
import { useGetCategoriesNameQuery } from "@/redux/features/categories/category";
import { useGetIndustryUniqueQuery } from "@/redux/features/gigs/gigsApi";

const HeaderBottom = () => {
  const { email } = useSelector((state) => state.userSlice);
  const { data: categoryName, isLoading: categoryLoading } =
    useGetCategoriesNameQuery();
  const { data: industryName, isLoading: industryLoading } =
    useGetIndustryUniqueQuery();
  const { data: role, isLoading: roleLoading } = useGetRoleByEmailQuery({
    email,
  });
  const { data: AdminUserData, isLoading } = useGetCustomerByIdQuery(email);

  return (
    <div className="flex items-center p-4 font-montserrat bg-[#1B8CDC]">
      <Container className="text-white">
        <NavigationMenu>
          <NavigationMenuList className="text-center">
            {role == "admin" && (
              <NavigationMenuItem>
                <Link
                  to="/upload"
                  className="bg-transparent text-white p-2 font-light text-base"
                >
                  Upload
                </Link>
              </NavigationMenuItem>
            )}
            {role == "admin" && (
              <NavigationMenuItem>
                <Link
                  to="/admin-dashboard"
                  className="bg-transparent text-white p-2 font-light text-base"
                >
                  Dashboard
                </Link>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent font-light text-base text-white p-2">
                Designs
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-warp gap-3 p-6 w-[700px]">
                  {categoryName?.data?.map((category) => {
                    return (
                      <Link
                        className="bg-blue-200 px-3 rounded-xl"
                        key={category.id}
                        to={`/all-design-by-category/${category.id}`}
                      >
                        {category.title}
                      </Link>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent font-light text-base text-white p-2">
                Industries
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-warp gap-3 p-6 w-[700px]">
                  {industryName?.data?.map((industry) => {
                    return (
                      <Link
                        className="bg-blue-200 px-3 rounded-xl"
                        key={industry.id}
                        to={`/all-design-by-category/${industry.id}`}
                      >
                        {industry.industry}
                      </Link>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/price"
                className="bg-transparent font-light text-base text-white p-2"
              >
                Price List
              </Link>
            </NavigationMenuItem>
            {role === "admin" && (
              <NavigationMenuItem>
                <Link
                  to="/analytics"
                  className="bg-transparent text-white p-2 font-light text-base"
                >
                  Analytics
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </Container>
    </div>
  );
};

export default HeaderBottom;
const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link ref={ref} className={cn(className)} {...props}>
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
