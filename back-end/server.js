import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import { error } from "console";

const PORT = 8888;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (request, response) => {
  response.send("GET huselt irlee");
});

app.get("/products", (request, response) => {
  fs.readFile("./data/products.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }
    let dbData = data ? JSON.parse(data) : [];

    response.json({
      success: true,
      products: dbData,
    });
  });
});

app.post("/product", (request, response) => {
  const { name, description, price, image_url } = request.body;

  fs.readFile("./data/products.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }

    let dbData = data ? JSON.parse(data) : [];

    const newProduct = {
      id: Date.now().toString(),
      name: name,
      description: description,
      price: price,
      image_url: image_url,
    };

    dbData.push(newProduct);

    fs.writeFile("./data/products.json", JSON.stringify(dbData), (error) => {
      if (error) {
        response.json({
          success: false,
          error: error,
        });
      } else {
        response.json({
          success: true,
          product: newProduct,
        });
      }
    });
  });
});

app.delete("/product", (request, response) => {
  const { id } = request.body;

  fs.readFile("./data/products.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }

    let dbData = data ? JSON.parse(data) : [];

    const filteredData = dbData.filter((data) => data?.id !== id);

    const deletedProduct = dbData.find((data) => data?.id === id);

    if (filteredData.length === dbData.length) {
      response.json({
        success: false,
        error: "Product id not found",
      });
    }

    fs.writeFile(
      "./data/products.json",
      JSON.stringify(filteredData),
      (error) => {
        if (error) {
          response.json({
            success: false,
            error: error,
          });
        } else {
          response.json({
            success: true,
            product: deletedProduct,
          });
        }
      }
    );
  });
});

app.put("/product", (request, response) => {
  const { id, name, description, price, image_url } = request.body;

  fs.readFile("./data/products.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }

    let dbData = data ? JSON.parse(data) : [];

    const editedData = dbData.map((data) => {
      if (data?.id === id) {
        return {
          id,
          name,
          description,
          price,
          image_url,
        };
      }

      return data;
    });

    fs.writeFile(
      "./data/products.json",
      JSON.stringify(editedData),
      (error) => {
        if (error) {
          response.json({
            success: false,
            error: error,
          });
        } else {
          response.json({
            success: true,
            product: editedData,
          });
        }
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server ajillaa http://localhost:${PORT}`);
});
