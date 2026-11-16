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
  <div id="login-success" style="display:none;text-align:center;padding:12px 0;">
    <p style="font-size:1.25rem;font-weight:700;margin:0 0 8px 0;">Code accepted.</p>
    <p style="margin:0 0 20px 0;">Tap the button below to open Muse. Then tap All Aboard CRM to open your CRM.</p>
    <a href="https://muse.ai/artifacts" class="btn btn--blue" style="display:inline-block;text-decoration:none;">Open the CRM</a>
  </div>
</div>
<script>
(function () {
  var CODE_HASH = "a9e1bff2b8e4471adddaa8d56ce4cfd508059be86a03b4d613f281c9fe664ef2";
  var form = document.getElementById("login-form");
  var success = document.getElementById("login-success");
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
        form.style.display = "none";
        success.style.display = "block";
      } else {
        error.style.display = "block";
        input.value = "";
        input.focus();
      }
    });
  });
})();
</script>
