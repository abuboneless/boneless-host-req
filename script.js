import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDEwXwXNHz57g4vrZ_1sUJ_NF8UXL1A5G8",
  authDomain: "boneless-hosts-req.firebaseapp.com",
  projectId: "boneless-hosts-req",
  storageBucket: "boneless-hosts-req.firebasestorage.app",
  messagingSenderId: "264386337640",
  appId: "1:264386337640:web:cca8e74c59e31d2ccad4dd",
  measurementId: "G-WZX8LHCD9L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("loginBtn");
const accountArea = document.getElementById("accountArea");
const userPhoto = document.getElementById("userPhoto");
const userNameInput = document.getElementById("userNameInput");
const logoutBtn = document.getElementById("logoutBtn");

// عند تحميل الصفحة
window.onload = () => {
  loginBtn.onclick = () => {
    signInWithPopup(auth, provider).catch((error) => {
      alert("خطأ أثناء تسجيل الدخول: " + error.message);
    });
  };

  logoutBtn.onclick = () => {
    signOut(auth);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      showUser(user);
    } else {
      showLogin();
    }
  });

  // تحديث اسم المستخدم مع debounce
  let timeoutId;
  userNameInput.oninput = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const newName = userNameInput.value.trim();
      if (newName.length > 0) {
        updateProfile(auth.currentUser, { displayName: newName }).catch(err => {
          alert("خطأ في تحديث الاسم: " + err.message);
        });
      }
    }, 1000);
  };
};

function showUser(user) {
  loginBtn.style.display = "none";
  accountArea.style.display = "flex";

  userPhoto.src = user.photoURL || "https://via.placeholder.com/40?text=User";
  userNameInput.value = user.displayName || "مستخدم";
}

function showLogin() {
  loginBtn.style.display = "block";
  accountArea.style.display = "none";
}
