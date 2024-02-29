const pg = require("pg");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../client/dist")));

const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/the_flavors_db"
);

const getFlavors = async () => {
  const { rows } = await client.query("SELECT * FROM flavors");
  return rows;
};

const getFlavorById = async (id) => {
  const { rows } = await client.query("SELECT * FROM flavors WHERE id = $1", [
    id,
  ]);
  return rows[0];
};

const createFlavor = async (flavor) => {
  const { rows } = await client.query(
    "INSERT INTO flavors(name, is_favorite) VALUES($1, $2) RETURNING *",
    [flavor.name, flavor.is_favorite]
  );
  return rows[0];
};

const deleteFlavor = async (id) => {
  await client.query("DELETE FROM flavors WHERE id = $1", [id]);
};

const updateFlavor = async (id, flavor) => {
  const { rows } = await client.query(
    "UPDATE flavors SET name = $1, is_favorite = $2 WHERE id = $3 RETURNING *",
    [flavor.name, flavor.is_favorite, id]
  );
  return rows[0];
};

app.get("/api/flavors", async (req, res, next) => {
  try {
    const flavors = await getFlavors();
    res.send(flavors);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/flavors/:id", async (req, res, next) => {
  try {
    const flavor = await getFlavorById(req.params.id);
    res.send(flavor);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/flavors", async (req, res, next) => {
  try {
    const newFlavor = await createFlavor(req.body);
    res.send(newFlavor);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/flavors/:id", async (req, res, next) => {
  try {
    await deleteFlavor(req.params.id);
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.put("/api/flavors/:id", async (req, res, next) => {
  try {
    const updatedFlavor = await updateFlavor(req.params.id, req.body);
    res.send(updatedFlavor);
  } catch (ex) {
    next(ex);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const init = async () => {
  await client.connect();
  console.log("connected to database");
  let SQL = `DROP TABLE IF EXISTS flavors;
  CREATE TABLE flavors(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  is_favorite BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
  );`;
  await client.query(SQL);
  console.log("flavors table created");
  SQL = `
  INSERT INTO flavors(name, is_favorite) VALUES('Vanilla', true);
  INSERT INTO flavors(name, is_favorite) VALUES('Chocolate', false);
  INSERT INTO flavors(name, is_favorite) VALUES('Strawberry', true);
  `;
  await client.query(SQL);
  console.log("flavors data seeded");
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
