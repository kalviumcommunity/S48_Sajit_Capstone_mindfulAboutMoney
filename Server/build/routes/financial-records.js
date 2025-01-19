"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const financial_record_1 = __importDefault(require("../schema/financial-record"));
const router = express_1.default.Router();
// Explicitly type the async route handlers
router.get("/getAllByUserID/:userId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all records for a user
    try {
        const userId = req.params.userId; // Get the user ID from the request
        const records = yield financial_record_1.default.find({ userId }); // Find all records with the user ID
        // If no records are found, return a 404 status code
        if (records.length === 0) {
            res.status(404).json({ message: "No records found for the user." });
            return;
        }
        res.status(200).json(records);
    }
    catch (error) {
        console.error("Error getting records:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
// Similar explicit typing for other routes
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new record
    try {
        const newRecord = new financial_record_1.default(req.body); // Create a new record with the request body
        const savedRecord = yield newRecord.save(); // Save the new record
        res.status(201).json(savedRecord);
    }
    catch (error) {
        console.error("Error creating record:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
// Update a record
router.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Update an existing record
    try {
        const id = req.params.id; // Get the record ID from the request
        // Find the record by ID and update it with the request body
        const updatedRecord = yield financial_record_1.default.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        // If the record is not found, return a 404 status code
        if (!updatedRecord) {
            res.status(404).json({ message: "Record not found." });
            return;
        }
        res.status(200).json(updatedRecord); // Return the updated record
    }
    catch (error) {
        console.error("Error updating record:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
// Delete a record
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Delete an existing record
    try {
        const id = req.params.id; // Get the record ID from the request
        const deletedRecord = yield financial_record_1.default.findByIdAndDelete(id); // Find and delete the record by ID
        // If the record is not found, return a 404 status code
        if (!deletedRecord) {
            res.status(404).json({ message: "Record not found." });
            return;
        }
        res.status(200).json(deletedRecord); // Return the deleted record
        // Catch any errors and return a 500 status code
    }
    catch (error) {
        console.error("Error deleting record:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}));
exports.default = router;
