import axios from "axios";
import create from "zustand";

const authStore = create((set) => ({
  loggedIn: null,

  loginForm: {
    email: "",
    password: "",
  },

  signupForm: {
    firstName: "",
    lastName: "",
    birthday: "",
    email: "",
    password: "",
  },

  updateLoginForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        },
      };
    });
  },

  updateSignupForm: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        signupForm: {
          ...state.signupForm,
          [name]: value,
        },
      };
    });
  },

  login: async () => {
    const { loginForm } = authStore.getState();

    const res = await axios.post("/login", loginForm, {
      withCredentials: true,
    });

    set({
      loggedIn: true,
      loginForm: {
        email: "",
        password: "",
      },
    });
  },

  checkAuth: async () => {
    try {
      await axios.get("/check-auth");
      set({ loggedIn: true });
    } catch (err) {
      set({ loggedIn: false });
    }
  },

  signup: async () => {
    const { signupForm } = authStore.getState();
    console.log(signupForm);

    const res = await axios.post("/signup", signupForm, {
      withCredentials: true,
    });

    set({
      signupForm: {
        firstName: "",
        lastName: "",
        birthday: "",
        email: "",
        password: "",
      },
    });
    console.log(res);
  },

  logout: async () => {
    await axios.get("/logout");
    set({ loggedIn: false });
  },
}));

export default authStore;
