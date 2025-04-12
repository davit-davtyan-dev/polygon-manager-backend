# Polygon managet backend

### Setup

Create `.env` and add minimal requred variables

example with **vite** frontend default ports for dev and prod

```
DB_URI=mongodb://mongo_db:27017/polygon
ORIGIN_WHITELIST="http://localhost:5173,http://localhost:4173"
```

### Run

To run the backend with database in docker simply run `docker compose up` in root directory.
