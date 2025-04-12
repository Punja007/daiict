const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("MongoDB connected"));

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
        monthlyIncomeVsExpenses: {
            type:Map,
            of: new mongoose.Schema({
                income: {
                    type: Number, 
                    required: true,
                    default: 0,
                },
                expences: {
                    type: Number, 
                    required: true,
                    default: 0,
                },
            }),
            default: {},   //Example: { "January 2025": {income: , enpense: } }
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
    
    
    // const User = mongoose.model("User", UserSchema);
    

module.exports = mongoose.model("User", UserSchema);