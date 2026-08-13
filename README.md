# Unified Gym + Movie Tracker

Two dashboards on one Firebase-hosted site:

- devilboytej5625@gmail.com -> Gym Tracker
- unnamedboy07@gmail.com -> Epic Movie Tracker

The movie dashboard is preloaded with the 42 movies from the uploaded 12 Aug 2026 CSV backup. On the first movie-account login, when that account has no Firestore movie data, those 42 records are automatically written to Firestore.

Deploy:
firebase deploy --only hosting,firestore
