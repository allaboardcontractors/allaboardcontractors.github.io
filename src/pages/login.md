---
title: "Log in"
description: "Log in to the All Aboard Contractors CRM."
intro: "Enter your code to open the CRM."
layout: layouts/page.njk
---
<div class="login-box" style="max-width:420px;margin:0 auto;">
  <form id="login-form">
    <label for="login-code" style="display:block;font-weight:600;margin-bottom:8px;">Your code</label>
    <input id="login-code" type="password" inputmode="numeric" autocomplete="off" placeholder="Enter your code" style="width:100%;padding:12px 14px;font-size:1rem;border:1px solid #D8DFEA;border-radius:8px;" required>
    <p id="login-error" style="display:none;color:#B00020;margin-top:10px;">That code did not match. Try again.</p>
    <button type="submit" class="btn btn--blue" style="margin-top:16px;">Log in</button>
  </form>
</div>
<script>
(function () {
  var CODE_HASH = "48290cf691c41cbc99b2396d2e5313ccfba91987b384e6d8f08b951fa5045e83";
  var form = document.getElementById("login-form");
  var input = document.getElementById("login-code");
  var error = document.getElementById("login-error");
  function hex(buf) {
    return Array.prototype.map.call(new Uint8Array(buf), function (b) {
      return ("0" + b.toString(16)).slice(-2);
    }).join("");
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var code = input.value.trim();
    if (!code) { return; }
    error.style.display = "none";
    crypto.subtle.digest("SHA-256", new TextEncoder().encode(code)).then(function (buf) {
      if (hex(buf) === CODE_HASH) {
        window.location.href = "https://muse.ai/artifacts";
      } else {
        error.style.display = "block";
        input.value = "";
        input.focus();
      }
    });
  });
})();
</script>
