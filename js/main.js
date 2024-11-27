
   
    var loginForm = document.getElementById('loginForm');
    var signupForm = document.getElementById('signupForm');
    var showSignupLink = document.getElementById('showSignup');
    var showLoginLink = document.getElementById('showLogin');
    var homePage = document.getElementById('homePage');
    var userName = document.getElementById('userName');
    var logoutBtn = document.getElementById('logoutBtn');

    
    showSignupLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.replace("d-flex","d-none")
        signupForm.classList.replace("d-none","d-flex")
    });

    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.classList.replace("d-flex","d-none")
        loginForm.classList.replace("d-none","d-flex")
    });

    
    var loginBtn = loginForm.querySelector('.login-btn');
    loginBtn.addEventListener('click', () => {
        var email = loginForm.querySelector("#loginEmail").value.trim();
        var password = loginForm.querySelector("#loginPass").value.trim();

        if (!email || !password) {
            showError(loginForm, 'Please fill in all fields');
            return;
        }

        
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var user = users.find(u => u.email === email && u.password === password);

        if (user) {
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            
            loginForm.classList.replace("d-flex","d-none");
            homePage.classList.replace("d-none","d-flex");
            
            userName.textContent = user.name;
            
            
            loginForm.querySelector("#loginEmail").value = '';
            loginForm.querySelector("#loginPass").value = '';
        } else {
            showError(loginForm, 'Invalid email or password');
        }
    });

   
    var signupBtn = signupForm.querySelector('.login-btn');
    signupBtn.addEventListener('click', function() {
        var name = signupForm.querySelector("#signupName").value.trim();
        var email = signupForm.querySelector("#signupEmail").value.trim();
        var password = signupForm.querySelector("#signupPass").value.trim();

        if (!name || !email || !password) {
            showError(signupForm, 'Please fill in all fields');
            return;
        }

       
        var users = JSON.parse(localStorage.getItem('users')) || [];

        
        if (users.some(user => user.email === email)) {
            showError(signupForm, 'Email already registered');
            return;
        }

       
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Signup successful! Please login.');
        
        signupForm.classList.replace("d-flex","d-none")
        loginForm.classList.replace("d-none","d-flex")
        
        
        signupForm.querySelector("signupName").value = '';
        signupForm.querySelector("signupEmail").value = '';
        signupForm.querySelector("signupPass").value = '';
    });

    
    logoutBtn.addEventListener('click', function() {
        
        localStorage.removeItem('currentUser');
        
        
        homePage.classList.replace("d-flex","d-none")
        loginForm.classList.replace("d-none","d-flex")
        
    });

    
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        loginForm.classList.add('hidden');
        signupForm.classList.add('hidden');
        homePage.classList.remove('hidden');
        userName.textContent = currentUser.name;
    }

    
    function showError(form, message) {
        var errorDiv = form.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            form.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        setTimeout(() => {
            errorDiv.textContent = '';
        }, 3000);
    }

