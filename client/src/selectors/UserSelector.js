export const getUser = (state) => {
    state.user.email = localStorage.getItem("userEmail");
    state.user.img = localStorage.getItem("userImg");
    state.user.isError = localStorage.getItem("userIsError");
    state.user.isLoading = localStorage.getItem("userIsLoading");
    return state.user;
};