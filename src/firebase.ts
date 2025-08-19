import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDx9_PBHrT6pfl5hvCsHUy4ntO0rU5nvh8",
  authDomain: "hhpnz-wearable-fc6aa.firebaseapp.com",
  projectId: "hhpnz-wearable-fc6aa",
  storageBucket: "hhpnz-wearable-fc6aa.firebasestorage.app",
  messagingSenderId: "577520981278",
  appId: "1:577520981278:web:476b70e4f893d75c22650f",
  measurementId: "G-B36HMPX4B7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

