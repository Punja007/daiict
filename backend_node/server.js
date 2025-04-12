const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("MongoDB connected"));

// Define a Mongoose schema and model
// const ExpenseSchema = new mongoose.Schema({
//   title: String,
//   amount: Number,
//   date: { type: Date, default: Date.now },
// });

// const Expense = mongoose.model("Expense", ExpenseSchema);



// async function seedDB() {
//   try {
//     await User.deleteMany(); // Clears the collection before seeding
//     console.log("Cleared existing users");

//     db.users.insertMany([
//       {
//         name: "Alice Johnson",
//         email: "alice@example.com",
//         password: "hashedpassword1",
//         profilePicture: "https://example.com/profiles/alice.jpg",
//         totalIncome: {
//           "January 2024": 50000,
//           "February 2024": 52000,
//           "March 2024": 51000,
//           "April 2024": 53000,
//           "May 2024": 54000,
//           "June 2024": 55000,
//           "July 2024": 56000,
//           "August 2024": 57000,
//           "September 2024": 58000,
//           "October 2024": 59000,
//           "November 2024": 60000,
//           "December 2024": 61000
//         },
//         totalExpensesPerMonth: {
//           "December 2024": {
//             "Housing": 15000,
//             "Groceries": 8000,
//             "Utilities": 3000,
//             "Entertainment": 2500
//           }
//         },
//         totalExpensesPerDay: {
//           ...Object.fromEntries(
//             Array.from({ length: 31 }, (_, i) => {
//               const day = String(i + 1).padStart(2, '0');
//               return [
//                 `2024-12-${day}`,
//                 {
//                   "Groceries": Math.floor(200 + Math.random() * 200),
//                   "Transport": Math.floor(100 + Math.random() * 100),
//                   "Utilities": i % 7 === 0 ? 500 : 0 // Weekly utility
//                 }
//               ];
//             })
//           )
//         },
//         expenseCategories: {
//           "Housing": 15000,
//           "Groceries": 8000,
//           "Utilities": 3000,
//           "Entertainment": 2500
//         },
//         currentValue: 250000,
//         investmentDistribution: {
//           "Stocks": { invested: 100000, currentValue: 120000 },
//           "Mutual Funds": { invested: 50000, currentValue: 60000 }
//         },
//         emis: {
//           "Home Loan": { price: 25000, dueDate: new Date("2025-01-15") }
//         },
//         createdAt: new Date()
//       },
    
//       {
//         name: "Bob Smith",
//         email: "bob@example.com",
//         password: "hashedpassword2",
//         profilePicture: "https://example.com/profiles/bob.jpg",
//         totalIncome: {
//           "January 2024": 45000,
//           "February 2024": 47000,
//           "March 2024": 46000,
//           "April 2024": 48000,
//           "May 2024": 49000,
//           "June 2024": 50000,
//           "July 2024": 51000,
//           "August 2024": 52000,
//           "September 2024": 53000,
//           "October 2024": 54000,
//           "November 2024": 55000,
//           "December 2024": 56000
//         },
//         totalExpensesPerMonth: {
//           "December 2024": {
//             "Rent": 12000,
//             "Food": 6500,
//             "Internet": 1800,
//             "Fuel": 2500
//           }
//         },
//         totalExpensesPerDay: {
//           ...Object.fromEntries(
//             Array.from({ length: 31 }, (_, i) => {
//               const day = String(i + 1).padStart(2, '0');
//               return [
//                 `2024-12-${day}`,
//                 {
//                   "Food": Math.floor(150 + Math.random() * 150),
//                   "Fuel": Math.floor(80 + Math.random() * 120),
//                   "Internet": i % 15 === 0 ? 900 : 0 // Half-month bill
//                 }
//               ];
//             })
//           )
//         },
//         expenseCategories: {
//           "Rent": 12000,
//           "Food": 6500,
//           "Internet": 1800,
//           "Fuel": 2500
//         },
//         currentValue: 180000,
//         investmentDistribution: {
//           "Crypto": { invested: 30000, currentValue: 50000 },
//           "Bonds": { invested: 40000, currentValue: 42000 }
//         },
//         emis: {
//           "Car Loan": { price: 8000, dueDate: new Date("2025-01-20") }
//         },
//         createdAt: new Date()
//       },
    
//       {
//         name: "Clara White",
//         email: "clara@example.com",
//         password: "hashedpassword3",
//         profilePicture: "",
//         totalIncome: {
//           "January 2024": 60000,
//           "February 2024": 62000,
//           "March 2024": 61000,
//           "April 2024": 63000,
//           "May 2024": 64000,
//           "June 2024": 65000,
//           "July 2024": 66000,
//           "August 2024": 67000,
//           "September 2024": 68000,
//           "October 2024": 69000,
//           "November 2024": 70000,
//           "December 2024": 71000
//         },
//         totalExpensesPerMonth: {
//           "December 2024": {
//             "Education": 10000,
//             "Health": 5000,
//             "Dining": 4000
//           }
//         },
//         totalExpensesPerDay: {
//           ...Object.fromEntries(
//             Array.from({ length: 31 }, (_, i) => {
//               const day = String(i + 1).padStart(2, '0');
//               return [
//                 `2024-12-${day}`,
//                 {
//                   "Dining": Math.floor(100 + Math.random() * 150),
//                   "Health": i % 10 === 0 ? 1000 : 0 // Once every 10 days
//                 }
//               ];
//             })
//           )
//         },
//         expenseCategories: {
//           "Education": 10000,
//           "Health": 5000,
//           "Dining": 4000
//         },
//         currentValue: 300000,
//         investmentDistribution: {
//           "Real Estate": { invested: 150000, currentValue: 180000 },
//           "Gold": { invested: 30000, currentValue: 35000 }
//         },
//         emis: {
//           "Education Loan": { price: 10000, dueDate: new Date("2025-01-10") }
//         },
//         createdAt: new Date()
//       },
    
//       {
//         name: "David Brown",
//         email: "david@example.com",
//         password: "hashedpassword4",
//         profilePicture: "https://example.com/profiles/david.jpg",
//         totalIncome: {
//           "January 2024": 70000,
//           "February 2024": 72000,
//           "March 2024": 71000,
//           "April 2024": 73000,
//           "May 2024": 74000,
//           "June 2024": 75000,
//           "July 2024": 76000,
//           "August 2024": 77000,
//           "September 2024": 78000,
//           "October 2024": 79000,
//           "November 2024": 80000,
//           "December 2024": 81000
//         },
//         totalExpensesPerMonth: {
//           "December 2024": {
//             "Mortgage": 20000,
//             "Kids School": 9000,
//             "Fuel": 5000
//           }
//         },
//         totalExpensesPerDay: {
//           ...Object.fromEntries(
//             Array.from({ length: 31 }, (_, i) => {
//               const day = String(i + 1).padStart(2, '0');
//               return [
//                 `2024-12-${day}`,
//                 {
//                   "Fuel": Math.floor(100 + Math.random() * 150),
//                   "Kids School": i === 0 ? 9000 : 0 // Paid on first of the month
//                 }
//               ];
//             })
//           )
//         },
//         expenseCategories: {
//           "Mortgage": 20000,
//           "Kids School": 9000,
//           "Fuel": 5000
//         },
//         currentValue: 400000,
//         investmentDistribution: {
//           "Index Funds": { invested: 200000, currentValue: 230000 },
//           "Startups": { invested: 50000, currentValue: 70000 }
//         },
//         emis: {
//           "Home Loan": { price: 20000, dueDate: new Date("2025-01-18") },
//           "Personal Loan": { price: 5000, dueDate: new Date("2025-01-25") }
//         },
//         createdAt: new Date()
//       }
//     ]);;
//     console.log("Seeded users successfully");

//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error seeding the database:", error);
//     mongoose.connection.close();
//   }
// }

// seedDB();              

// API endpoint to fetch expenses
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find(); // Fetch all expenses from the database
    res.json(expenses); // Send the data as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// Example route
app.get("/chat", (req, res) => {
  res.json({ message: "Hello from Node.js backend!" });
});

// Start the server
app.listen(5000, () => {
  console.log("Server listening on http://localhost:5000");
});