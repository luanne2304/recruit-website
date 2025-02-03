let setAccessTokenFn = null;

export const setAccessTokenUtil = (fn) => {
    setAccessTokenFn = fn;
};

export const getAccessTokenUtil = () => {
    return setAccessTokenFn;
};