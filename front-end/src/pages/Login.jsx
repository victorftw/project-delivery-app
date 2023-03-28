import React from "react";

function Login() {
  return (
    <div>
      <img src="" alt="" />
      <h1>nome app</h1>
      <form>
        <label htmlFor="">Login</label>
        <input type="email" data-testid="common_login__input-email" />

        <label htmlFor="">Senha</label>
        <input type="password" data-testid="common_login__input-password" />

        <button type="submit" data-testid="common_login__button-login">LOGIN</button>
        <button data-testid="common_login__button-register">Ainda não tenho conta</button>
      </form>
      <p data-testid="common_login__element-invalid-email">Mensagem de erro</p>
    </div>
  );
}

export default Login;
