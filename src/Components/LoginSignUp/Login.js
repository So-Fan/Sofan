import React from "react";

function Login(props) {
  return (
    <div class="form-container login-container">
      <form action="#">
        <h1>Login here.</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <div class="content">
          <div class="checkbox">
            <input type="checkbox" name="checkbox" id="checkbox" />
            <label>Remember me</label>
          </div>
          <div class="pass-link">
            <a href="#">Forgot password?</a>
          </div>
        </div>
        <button>Login</button>
        <span>or use your account</span>
        <div class="social-container">
          <a href="#" class="social">
            <i class="lni lni-facebook-fill"></i>
          </a>
          <a href="#" class="social">
            <i class="lni lni-google"></i>
          </a>
          <a href="#" class="social">
            <i class="lni lni-linkedin-original"></i>
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
