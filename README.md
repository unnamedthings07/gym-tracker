# Fixed unified tracker

- Private URL: root site; authentication routes the two private dashboards.
- Public movie URL: /movie-public.html (later can be mapped to movies.unnamedboy07.qzz.io).
- Gym data remains under authenticated user UID.
- Public page reads only /publicMovies/tracker.
- Movie account writes both its private movie document and the public snapshot.

After deploying:
1. Publish firestore.rules.
2. Log into the movie account once and make/save a movie change (or wait for initial seed if empty).
3. Public viewer will then show the movies.
