const express = require("express");
const path = require("path");

const calcApp = express();
const listenPort = process.env.PORT || 3000;

// Middleware: parse JSON bodies and serve static files from /public
calcApp.use(express.json());
calcApp.use(express.static(path.join(__dirname, "public")));

// Helper: validate and parse two numbers from a source (query or body)
function readOperands(source) {
  const first = parseFloat(source.a);
  const second = parseFloat(source.b);
  if (Number.isNaN(first) || Number.isNaN(second)) {
    return null;
  }
  return { first, second };
}

// ---------- Part 1: simple endpoint ----------
calcApp.get("/hello", (req, res) => {
  res.send("Hello from my Express server!");
});

// ---------- Part 2: REST calculator (GET) ----------
// Example: /add?a=5&b=3
calcApp.get("/add", (req, res) => {
  const nums = readOperands(req.query);
  if (!nums) {
    return res.status(400).json({ error: "Provide valid numbers: /add?a=5&b=3" });
  }
  res.json({ operation: "add", a: nums.first, b: nums.second, result: nums.first + nums.second });
});

calcApp.get("/subtract", (req, res) => {
  const nums = readOperands(req.query);
  if (!nums) {
    return res.status(400).json({ error: "Provide valid numbers: /subtract?a=5&b=3" });
  }
  res.json({ operation: "subtract", a: nums.first, b: nums.second, result: nums.first - nums.second });
});

calcApp.get("/multiply", (req, res) => {
  const nums = readOperands(req.query);
  if (!nums) {
    return res.status(400).json({ error: "Provide valid numbers: /multiply?a=5&b=3" });
  }
  res.json({ operation: "multiply", a: nums.first, b: nums.second, result: nums.first * nums.second });
});

calcApp.get("/divide", (req, res) => {
  const nums = readOperands(req.query);
  if (!nums) {
    return res.status(400).json({ error: "Provide valid numbers: /divide?a=6&b=3" });
  }
  if (nums.second === 0) {
    return res.status(400).json({ error: "Cannot divide by zero" });
  }
  res.json({ operation: "divide", a: nums.first, b: nums.second, result: nums.first / nums.second });
});

// ---------- Part 2 extra: POST calculator ----------
// Body: { "a": 10, "b": 4, "operation": "add" }
calcApp.post("/calculate", (req, res) => {
  const nums = readOperands(req.body);
  const { operation } = req.body;
  if (!nums) {
    return res.status(400).json({ error: "Body must include numeric a and b" });
  }

  let outcome;
  switch (operation) {
    case "add":      outcome = nums.first + nums.second; break;
    case "subtract": outcome = nums.first - nums.second; break;
    case "multiply": outcome = nums.first * nums.second; break;
    case "divide":
      if (nums.second === 0) {
        return res.status(400).json({ error: "Cannot divide by zero" });
      }
      outcome = nums.first / nums.second;
      break;
    default:
      return res.status(400).json({ error: "operation must be add, subtract, multiply or divide" });
  }
  res.json({ operation, a: nums.first, b: nums.second, result: outcome });
});

calcApp.listen(listenPort, () => {
  console.log(`Server running at http://localhost:${listenPort}`);
});