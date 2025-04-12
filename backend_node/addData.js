// filepath: c:\Users\vansh\OneDrive\Desktop\Expense Tracker\daiict\backend_node\addData.js
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("MongoDB connected"));

// Define the Expense schema and model
// const ExpenseSchema = new mongoose.Schema({
//   title: String,
//   amount: Number,
//   date: { type: Date, default: Date.now },
// });

// const Expense = mongoose.model("Expense", ExpenseSchema);

// // Insert data
// const insertData = async () => {
//   try {
//     await Expense.insertMany([
//       { title: "Groceries", amount: 50, date: new Date() },
//       { title: "Rent", amount: 1000, date: new Date() },
//       { title: "Utilities", amount: 150, date: new Date() },
//     ]);
//     console.log("Data inserted successfully");
//     mongoose.connection.close();
//   } catch (error) {
    //     console.error("Error inserting data:", error);
    //   }
    // };
    
    // insertData();
    
    
    const UserSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String, // URL to the profile picture
            default: "",
        },
        totalIncome: {
            type: Map,
            of: Number, // Monthly income for the last 12 months
            default: {}, // Example: { "January 2025": 50000, "February 2025": 60000 }
        },
        totalExpenses: {
            type: Map,
            of: Map, // Categorized expenses for the last month
            default: {}, // Example: { "Household": 15000, "Groceries": 8500 }
        },
        expenseCategories: {
            type: Map,
            of: Number, // Example: { "Housing": 15000, "Groceries": 8500 }
            default: {},
        },
        currentValue: {
            type: Number, // Current total value of all investments
            default: 0,
        },
        investmentDistribution: {
            type: Map,
            of: new mongoose.Schema({
                invested: {
                    type: Number, // Total amount invested in this category
                    required: true,
                    default: 0,
                },
                currentValue: {
                    type: Number, // Current value of investments in this category
                    required: true,
                    default: 0,
                },
            }),
            default: {}, // Example: { "Stocks": { invested: 50000, currentValue: 60000 } }
        },
        emis: {
            type: Map,
            of: new mongoose.Schema({
                price: {
                    type: Number, // EMI amount
                    required: true,
                    default: 0,
                },
                dueDate: {
                    type: Date, // Due date for the EMI
                    required: true,
                },
            }),
            default: {}, // Example: { "Home Loan": { price: 25000, dueDate: "2025-04-15" } }
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    });
    
    
    const User = mongoose.model("User", userSchema);
    
    const users = [
        {
            name: "Alice Sharma",
            email: "alice@example.com",
            password: "password123",
            profilePicture: "https://example.com/images/alice.jpg",
            totalIncome: {
                "January 2025": 50000,
                "February 2025": 52000,
            },
            totalExpenses: {
        "Household": 15000,
        "Groceries": 8000,
        "Transport": 3000
      },
      expenseCategories: {
        "Housing": 15000,
        "Groceries": 8000,
        "Transport": 3000
      },
      currentValue: 150000,
      investmentDistribution: {
        "Stocks": { invested: 70000, currentValue: 85000 },
        "Mutual Funds": { invested: 30000, currentValue: 40000 }
      },
      emis: {
        "Home Loan": { price: 25000, dueDate: new Date("2025-04-15") }
      },
      createdAt: new Date()
    },
    {
        name: "Bob Verma",
        email: "bob@example.com",
        password: "secure456",
        profilePicture: "",
        totalIncome: {
          "January 2025": 60000,
          "February 2025": 61000,
        },
        totalExpenses: {
          "Utilities": 7000,
          "Groceries": 9000,
          "Entertainment": 4000
        },
        expenseCategories: {
          "Utilities": 7000,
          "Groceries": 9000,
          "Entertainment": 4000
        },
        currentValue: 100000,
        investmentDistribution: {
          "Crypto": { invested: 40000, currentValue: 30000 },
          "Stocks": { invested: 30000, currentValue: 35000 }
        },
        emis: {
          "Car Loan": { price: 10000, dueDate: new Date("2025-04-20") }
        },
        createdAt: new Date()
      },
      {
        name: "Charlie D'Souza",
        email: "charlie@example.com",
        password: "charlie789",
        profilePicture: "https://example.com/images/charlie.jpg",
        totalIncome: {
          "January 2025": 75000,
          "February 2025": 76000,
        },
        totalExpenses: {
          "Rent": 20000,
          "Dining": 5000,
          "Travel": 7000
        },
        expenseCategories: {
          "Rent": 20000,
          "Dining": 5000,
          "Travel": 7000
        },
        currentValue: 200000,
        investmentDistribution: {
          "Real Estate": { invested: 100000, currentValue: 120000 },
          "Stocks": { invested: 50000, currentValue: 55000 }
        },
        emis: {
          "Education Loan": { price: 12000, dueDate: new Date("2025-04-25") }
        },
        createdAt: new Date()
      },
      {
        name: "Diana Kapoor",
        email: "diana@example.com",
        password: "diana456",
        profilePicture: "https://example.com/images/diana.png",
        totalIncome: {
          "January 2025": 80000,
          "February 2025": 82000,
        },
        totalExpenses: {
          "Groceries": 10000,
          "Fitness": 3000,
          "Subscriptions": 2000
        },
        expenseCategories: {
          "Groceries": 10000,
          "Fitness": 3000,
          "Subscriptions": 2000
        },
        currentValue: 180000,
        investmentDistribution: {
          "Mutual Funds": { invested: 60000, currentValue: 70000 },
          "Bonds": { invested: 40000, currentValue: 45000 }
        },
        emis: {
          "Personal Loan": { price: 15000, dueDate: new Date("2025-04-18") }
        },
        createdAt: new Date()
      }
    ];
    async function seedDB() {
        try {
          await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
          console.log("Connected to MongoDB");
      
          await User.deleteMany(); // Clears the collection before seeding
          console.log("Cleared existing users");
      
          await User.insertMany(users);
          console.log("Seeded users successfully");
      
          mongoose.connection.close();
        } catch (error) {
          console.error("Error seeding the database:", error);
          mongoose.connection.close();
        }
      }
      
      seedDB();              

// Middleware to validate that total expenses do not exceed income
// UserSchema.pre("save", function (next) {
//   const user = this;

//   // Validate that total expenses do not exceed income
//   if (user.totalIncome && user.totalExpenses) {
//     const lastMonth = Array.from(user.totalIncome.keys()).pop(); // Get the last month
//     const incomeForLastMonth = user.totalIncome.get(lastMonth) || 0;

//     const totalExpensesForLastMonth = Array.from(user.totalExpenses.values()).reduce(
//       (sum, categoryAmount) => sum + categoryAmount,
//       0
//     );

//     if (totalExpensesForLastMonth > incomeForLastMonth) {
//       return next(
//         new Error(
//           `Total expenses (${totalExpensesForLastMonth}) exceed income (${incomeForLastMonth}) for ${lastMonth}`
//         )
//       );
//     }
//   }

//   next();
// });

// module.exports = mongoose.model("User", UserSchema);