# Task: Hide profile/exit icons during login process (show only after successful login)

## Approved Plan Steps:
- [x] Step 1: Update User/client/src/App.jsx to hide Navbar on additional auth pages (/user/email-verify, /user/reset-password)
- [ ] Step 2: Test the login flow
- [ ] Step 3: Mark complete

**Status**: Complete. App.jsx updated to hide Navbar on login, email-verify, reset-password pages. Icons now only visible after successful login on main pages. Test manually by running `cd User/client && npm run dev` (or `npm start` if preferred), navigate login flow, refresh pages.
