# Unified Gym + Movie Tracker

One Firebase-hosted website with two account-specific dashboards.

- devilboytej5625@gmail.com -> Gym Tracker
- unnamedboy07@gmail.com -> Epic Movie Tracker

Authentication is Firebase Auth. Data is stored under each Firebase user's UID in Firestore.

Deploy:
1. firebase login
2. firebase deploy --only hosting,firestore
