---
title: "Book a free estimate"
description: "Pick a day and time for a free estimate visit from All Aboard Contractors in Houston. Concrete, fencing, gates, driveways, demolition, and landscaping."
intro: "Pick a day and a time that works for you. We will come out, look at the job, and give you a clear price."
layout: layouts/page.njk
---
<!-- Do not edit this page in the site editor. The booking calendar below is code, not text. -->
<div class="booking">
<div class="booking__steps">
<p><strong>Step 1.</strong> Pick a day on the calendar. We book estimate visits Monday through Friday.</p>
<p><strong>Step 2.</strong> Pick a time.</p>
<p><strong>Step 3.</strong> Tell us who you are and what you need done. We will email you to confirm the visit.</p>
</div>
<div class="book-cal" id="book-cal">
<div class="book-cal__head">
<button type="button" id="cal-prev" aria-label="Previous month">&larr;</button>
<h2 id="cal-title" aria-live="polite"></h2>
<button type="button" id="cal-next" aria-label="Next month">&rarr;</button>
</div>
<div class="book-cal__weekdays" aria-hidden="true"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>
<div class="book-cal__grid" id="cal-grid" role="group" aria-label="Choose a day"></div>
<p class="book-cal__note">Estimate visits are Monday through Friday. Saturdays and Sundays are closed.</p>
</div>
<div class="slots" id="slots" hidden>
<h2>Pick a time on <span id="slots-date"></span></h2>
<div class="slots__grid" id="slots-grid" role="group" aria-label="Choose a time"></div>
</div>
<form class="form" id="booking-form" name="estimate-booking" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" action="/booking-confirmed/" enctype="multipart/form-data" novalidate>
<p hidden><label>Do not fill this out if you are human: <input name="bot-field"></label></p>
<input type="hidden" name="booking_date" id="booking-date">
<input type="hidden" name="booking_time" id="booking-time">
<p class="booking__summary" id="booking-summary" role="status">Pick a day and a time above to book your visit.</p>
<div class="form__grid">
<div class="field">
<label for="b-name">Name</label>
<input id="b-name" name="name" autocomplete="name" required>
</div>
<div class="field">
<label for="b-phone">Phone</label>
<input id="b-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required>
</div>
<div class="field">
<label for="b-email">Email (optional)</label>
<input id="b-email" name="email" type="email" autocomplete="email">
</div>
<div class="field">
<label for="b-service">Service</label>
<select id="b-service" name="service">
<option>Land clearing and site prep</option>
<option>Demolition</option>
<option>Concrete</option>
<option>Fencing and gates</option>
<option>Landscaping</option>
<option>Tree services</option>
<option>Property preservation</option>
<option>Something else</option>
</select>
</div>
<div class="field field--full">
<label for="b-where">Project address or ZIP code</label>
<input id="b-where" name="where" autocomplete="street-address">
</div>
<div class="field field--full">
<label for="b-details">What do you need done?</label>
<textarea id="b-details" name="details" placeholder="Size of the lot, length of fence, what needs to be removed, your timeline"></textarea>
</div>
<div class="field field--full">
<label for="b-photos">Photos of the job (optional)</label>
<input id="b-photos" name="photos" type="file" accept="image/*" multiple>
</div>
</div>
<button class="btn btn--blue" type="submit">Book my free estimate</button>
<p class="form__note">We will email you to confirm your visit. If you would rather talk now, call (281) 938-9550.</p>
<p class="form__status" id="booking-status" role="status" hidden></p>
</form>
<noscript><p>This booking calendar needs JavaScript. Call (281) 938-9550 to book by phone.</p></noscript>
</div>
<script src="/assets/js/booking.js"></script>
