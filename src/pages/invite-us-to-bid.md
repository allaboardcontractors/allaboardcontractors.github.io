---
title: "Invite us to bid"
description: "Prime contractors and general contractors can invite All Aboard Contractors to bid as a subcontractor on concrete, fencing, demolition, landscaping and site work in Houston."
intro: "Are you a prime contractor or general contractor? Invite us to bid on your project as a subcontractor. Send the project details and we will review the plans and send you a price."
layout: layouts/page.njk
---
<!-- Do not edit this form in the site editor. The bid invitation form below is code, not text. -->
<form class="form" id="bid-form" name="bid-invitation" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" action="/bid-invitation-received/" novalidate>
<p hidden><label>Do not fill this out if you are human: <input name="bot-field"></label></p>
<div class="form__grid">
<div class="field">
<label for="bid-company">Company</label>
<input id="bid-company" name="company" autocomplete="organization" required>
</div>
<div class="field">
<label for="bid-name">Contact name</label>
<input id="bid-name" name="contact_name" autocomplete="name" required>
</div>
<div class="field">
<label for="bid-email">Email</label>
<input id="bid-email" name="email" type="email" autocomplete="email" required>
</div>
<div class="field">
<label for="bid-phone">Phone</label>
<input id="bid-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required>
</div>
<div class="field">
<label for="bid-project">Project name</label>
<input id="bid-project" name="project_name" required>
</div>
<div class="field">
<label for="bid-location">Project location</label>
<input id="bid-location" name="project_location" autocomplete="street-address">
</div>
<div class="field">
<label for="bid-due">Bid due date</label>
<input id="bid-due" name="bid_due_date" type="date">
</div>
<div class="field">
<label for="bid-plans">Link to plans</label>
<input id="bid-plans" name="plans_link" type="url" inputmode="url" placeholder="https://">
</div>
<div class="field field--full">
<label for="bid-details">Project details</label>
<textarea id="bid-details" name="details" placeholder="Trade needed, scope of work, and anything else we should know"></textarea>
</div>
</div>
<button class="btn btn--blue" type="submit">Send bid invitation</button>
<p class="form__note">We will review your invitation and get back to you. If you would rather talk now, call (281) 938-9550.</p>
</form>
