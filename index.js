const express = require("express");
const bodyParser = require("body-parser"); 
const sequelize = require("./config/database");
const authRoutes = require("./router/auth");
const userRoutes = require("./router/users");
const postRoutes = require("./router/post");
const commentRoutes = require("./router/comments");
const crypto = require("crypto");


require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;


// Configura body-parser
app.use(bodyParser.json());

// Verificar si JWT_SECRET está definido, si no, generar uno nuevo
if (!process.env.JWT_SECRET) {
  const generatedSecret = crypto.randomBytes(32).toString("base64");
  console.warn(
    "No JWT_SECRET found in environment variables. Generated a new one:",
    generatedSecret
  );
  process.env.JWT_SECRET = generatedSecret;
}

// Define las rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/post", postRoutes);
app.use("/post", commentRoutes);


app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>NodeJs y Express en Vercel</title>
      </head>
      <body>
        <h1>Soy un proyecto Back end en vercel</h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

// Conecta a la base de datos y arranca el servidor
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
