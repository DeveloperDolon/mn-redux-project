import Customer from "@/Dashboard/Customer/Customer";
import Auth from "@/Layout/Auth";
import Root from "@/Layout/Root";
// import MessageForm from "@/Message/MessageForm/MessageForm";
import AllDesignByCategory from "@/Pages/AllDesignByCategory/AllDesignByCategory";
import AdminAuth from "@/Pages/Authentication/AdminAuth/AdminAuth";
import Authentication from "@/Pages/Authentication/Authentication";
import BillingAddress from "@/Pages/BillingAddress/BillingAddress";
import ChangePassword from "@/Pages/ChangePassword/ChangePassword";
import Checkout from "@/Pages/Checkout/Checkout";
import AdminDashboard from "@/Pages/Dashboard/AdminDashboard/AdminDashboard";
import Upload from "@/Pages/Dashboard/AdminDashboard/Upload/Upload";
import DesignDescription from "@/Pages/DesignDescription/DesignDescription";
import Home from "@/Pages/Home/Home";
import Price from "@/Pages/Price/Price";
import PrivacyPolicy from "@/Pages/PrivacyPolicy/PrivacyPolicy";
import Payment from "@/Pages/Payment/Payment";
import ProjectRequirements from "@/Pages/ProjectRequirements/ProjectRequirements";
import SocialMedia from "@/Pages/SocialMedia/SocialMedia";
import StartProject from "@/Pages/StartProject/StartProject";
import TermsConditions from "@/Pages/TermsConditions/TermsConditions";
import About from "@/pages/About/About";
import Cart from "@/pages/Cart/Cart";
import Contact from "@/pages/Contact/Contact";
import Categories from "@/pages/Dashboard/Category/Categories";
import Inbox from "@/pages/Inbox/Inbox";
import Error from "../Pages/Error/Error"

import { createBrowserRouter } from "react-router-dom";
import SearchResult from "@/Pages/SearchResult/SearchResult";
import CustomerProfile from "@/Pages/CustomerProfile/CustomerProfile";
import Testimonials from "@/Pages/Testimonials/Testimonials";
import Affiliate from "@/Pages/Affiliate/Affiliate";

import Design from "@/Pages/Design/Design";
import ProjectPage from "@/Pages/ProjectPage/ProjectPage";
import Customise from "@/Pages/Customise/Customise";
import Analytics from "@/Pages/Analytics/Analytics";
import Tip from "@/Pages/Tip/Tip";
import SavePaymentMethod from "@/Pages/SavePaymentMethod/SavePaymentMethod";
import WithdrawRequest from "@/Pages/WithdrawRequest/WithdrawRequest";
import Feedback from "@/Pages/Feedback/Feedback";
import TipPayment from "@/Pages/TipPayment/TipPayment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/inbox",
        element: <Inbox />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/price",
        element: <Price />,
      },
      { path: "/upload", element: <Upload /> },
      {
        path: "/customer",
        element: <Customer />,
      },
      {
        path: "/affiliate",
        element: <Affiliate />,
      },
      // mehedi hasan added route
      {
        path: "/all-design-by-category/:id",
        element: <AllDesignByCategory />,
      },
      {
        path: "/design-description/:id",
        element: <DesignDescription />,
      },
      {
        path: "/design/:id",
        element: <Design />
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/start-project/:id",
        element: <StartProject />,
      },
      {
        path: "/project-requirements/:id",
        element: <ProjectRequirements />,
      },
      {
        path: "/payment/:id",
        element: <Payment />,
      },
      {
        path: "/save-payment-method/:id",
        element: <SavePaymentMethod />,
      },
      {
        path: "/withdraw-request/:id",
        element: <WithdrawRequest />
      },
      {
        path: "/feedback",
        element: <Feedback />
      },
      {
        path: "/tip",
        element: <Tip />
      },
      {
        path: "/tip-payment/:id",
        element: <TipPayment />
      },
      {
        path: "/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/billing-address",
        element: <BillingAddress />,
      },
      {
        path: "/social-media",
        element: <SocialMedia />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/upload",
        element: <Upload />
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/search-result/:search",
        element: <SearchResult />
      },
      {
        path: "/customer-profile",
        element: <CustomerProfile />
      },
      {
        path: "/testimonials",
        element: <Testimonials />
      },
      {
        path: "/project-page/:id",
        element: <ProjectPage />
      },
      {
        path: "/customise/:id",
        element: <Customise />
      },
      {
        path: "/analytics",
        element: <Analytics />
      }
    ],
  },

  // {
  //   path: "/message",
  //   element: <MessageForm />
  // },

  {
    path: "/customer-login",
    element: <Auth />,
    children: [
      {
        path: "/customer-login",
        element: <Authentication />,
      },
    ],
  },

  {
    path: "/admin-auth",
    element: <AdminAuth />,
    children: [],
  },
]);

export default router;
