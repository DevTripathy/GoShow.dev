# TODO: Implement Delete Show Functionality

## Backend Tasks
- [x] Add `deleteShow` function in `adminController.js`: Check for existing bookings, prevent deletion if bookings exist, otherwise delete the show.
- [x] Add DELETE route `/delete-show/:showId` in `adminRoutes.js` with adminAuth middleware.

## Frontend Tasks
- [x] Update `ListShows.jsx`: Add delete button in table rows, handle click with confirmation dialog, call delete API, refresh shows list on success.

## Testing
- [x] Fixed invalid token issue by changing DELETE to POST route.
- [ ] Test deletion: Ensure only admins can delete, handle cases with/without bookings.
- [ ] Verify error handling and UI updates.
