const loggedInElements = document.querySelectorAll(".logged-in");
const loggedOutElements = document.querySelectorAll(".logged-out");
const popupTitle = document.querySelector("#popup-title");
const userNameField = document.querySelector("#userName");


const setupUI = (user) => {
    if (user) {
        loggedInElements.forEach(item => item.style.display = 'block');
        loggedOutElements.forEach(item => item.style.display = 'none');
        var docRef = db.collection('users').doc(user.email);
        docRef.get().then((doc) => {
            data = doc.data()
            console.log(data.username);
            popupTitle.innerHTML = "Logged In!";
            userNameField.innerHTML = data.username;
        });
    } else {
        popupTitle.innerHTML = "OF Creators"
        loggedOutElements.forEach(item => item.style.display = 'block');
        loggedInElements.forEach(item => item.style.display = 'none');
    }
}

auth.onAuthStateChanged(user => {
    if (user){
        setupUI(user);
        console.log("Logged In");
    } else {
        setupUI();
        console.log("Logged Out");
    }
});

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) => {
    e.preventDefault();;
    const email = signupForm['signup-email'].value;
    const pass = signupForm['signup-password'].value;
    
    auth.createUserWithEmailAndPassword(email, pass).then( cred => {
        console.log(cred);
        console.log(cred.user.uid);
        console.log(signupForm['username'].value);
        db.collection('users').doc(email).set({
            username: signupForm['username'].value,
            uid: cred.user.uid
        });
    }).then(() =>{
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => { console.log("User Signed Out")});
})

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const pass = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,pass).then(cred => {
        console.log(cred.user);
    });

    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
});