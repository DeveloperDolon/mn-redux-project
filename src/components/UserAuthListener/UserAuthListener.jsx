import { useEffect } from "react";
import { auth } from "../../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, toggleLoading } from "@/redux/features/users/userSlice";

const UserAuthListener = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ name: user.displayName, email: user.email }));
        dispatch(toggleLoading(false));
      } else {
        dispatch(toggleLoading(true));
      }
    });
  }, [dispatch]);
  return null;
};

export default UserAuthListener;
