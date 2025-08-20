# Improvements to make

(not in order)

1. Render the header, search bar, and table all on separate views and components for modularity and scalability.
2. More lenient search comparison logic, remove all spaces, punctuation before comparing
3. Minimum search term length before triggering comparison logic (no need to search if the term is below 3 characters)
4. Better user action feedback, such as spinners, alert/error banners, toasts
5. Implement pagination of the table on the frontend for better performance
6. Cache query results on the backend to reduce number of queries
7. Add logs and monitoring for error tracking, performance, and security (if this was to be used in production)
8. Unit, feature, and e2e test coverage
