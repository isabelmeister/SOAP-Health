# SOAP-Health
Technical Test

# Pizza Builder Full-Stack App

## Backend

1. Navigate to `backend` folder.
2. Run `npm install` to install dependencies.
3. Run `node index.js` to start the server on http://localhost:3001.

## Frontend

1. Navigate to `frontend` folder.
2. Run `npm install` to install dependencies.
3. Run `npm start` to start the React app on http://localhost:3000.

## Known Limitations

### Backend Limitations

1. Data Persistence: All data is stored in memory and will be lost when the server restarts

2. No Authentication: No user authentication or authorization implemented

3. No Database: No persistent database (SQLite/PostgreSQL/MongoDB)

4. Simple Validation: Basic input validation only

5. No Pagination: Pizza list endpoint doesn't support pagination for large datasets

6. No Image Support: Pizza sizes and ingredients don't include images

7. No Order Modification: Cannot update or delete existing pizza orders

### Frontend Limitations

1. No Responsive Design: Layout is not optimized for mobile devices

2. Basic Error Handling: Limited user feedback for errors

3. No Form Validation: Client-side form validation is minimal

4. No Loading States: Only basic loading indicators

5. No Tests: No unit or integration tests

6. No Routing: Single page application without React Router

### API Limitations

1. Rate Limiting: No API rate limiting implemented

2. No Caching: Responses are not cached

3. No File Upload: Cannot upload custom pizza images

4. Limited Filtering: Only basic customer name filtering available