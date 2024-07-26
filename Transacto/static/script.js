document.addEventListener('DOMContentLoaded', function() {
    const registerBtn = document.getElementById('registerBtn');
    const signedInBtn = document.getElementById('signedInBtn');
    const transactionBtn = document.getElementById('transactionBtn');
    const registerPageBtn = document.getElementById('registerPageBtn');
    const registerError = document.getElementById('registerError');
    const transactionResult = document.getElementById('transactionResult');

    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            const cardholderName = document.getElementById('cardholderName').value;
            const cardNo = document.getElementById('cardNo').value;
            const password = document.getElementById('password').value;

            if (cardholderName && cardNo && password) {
                localStorage.setItem('cardholderName', cardholderName);
                localStorage.setItem('cardNo', cardNo);
                localStorage.setItem('password', password);
                window.location.href = 'transaction.html';
            } else {
                registerError.textContent = 'Please fill in all details.';
            }
        });
    }

    if (signedInBtn) {
        signedInBtn.addEventListener('click', function() {
            window.location.href = 'transaction.html';
        });
    }

    if (transactionBtn) {
        transactionBtn.addEventListener('click', function() {
            const cardNo = document.getElementById('cardNo').value;
            const password = document.getElementById('password').value;

            const storedCardNo = localStorage.getItem('cardNo');
            const storedPassword = localStorage.getItem('password');

            if (cardNo === storedCardNo && password === storedPassword) {
                transactionResult.textContent = 'Transaction Successful';
                transactionResult.style.color = 'green';
            } else {
                transactionResult.textContent = 'Transaction Failed';
                transactionResult.style.color = 'red';
            }
        });
    }

    if (registerPageBtn) {
        registerPageBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});
