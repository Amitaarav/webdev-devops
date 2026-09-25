enum LoginMode{
    app = 0,
    email = 1,
    social = 2
    // always provide initial value
}

console.log(LoginMode['app']); // 1
console.log(LoginMode.social); // 2
console.log(LoginMode.app); // 0