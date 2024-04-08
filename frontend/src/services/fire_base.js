import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB8bN3ndfwpQ_3YxD1y1PQ-3QuYstrGHRA",
    authDomain: "test-push-image-32789.firebaseapp.com",
    projectId: "test-push-image-32789",
    storageBucket: "test-push-image-32789.appspot.com",
    messagingSenderId: "142672814695",
    appId: "1:142672814695:web:b8885d2a05725bbf54eac2"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
module.exports = storage;
