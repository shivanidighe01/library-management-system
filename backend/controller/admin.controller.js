import Staff from "../models/staff.model.js"
import Transaction from '../models/transactions.model.js';

export const getAllStaff=async(req,res)=>{
    try {
        const staff=await Staff.find({role:'Librarian'});

        res.status(200).json({
            message:"All liabrarian fetched",
            Total:staff.length,
            staff
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Inernal server error"
        })
    }
}

export const getAllMember=async(req,res)=>{
    try {
        const staff=await Staff.find({role:'Member'});

        res.status(200).json({
            message:"All Member fetched",
            Total:staff.length,
            staff
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"Inernal server error"
        })
    }
}



export const getTotalFineForAllMembers = async (req, res) => {
    try {
        // Fetch only transactions where status is not "Returned"
        const issuedBooks = await Transaction.find({ status: { $ne: "Returned" } });

        const currentDate = new Date();

        // Calculate total fine across all overdue transactions
        const totalFine = issuedBooks.reduce((acc, t) => {
            if (t.DueDate && currentDate > t.DueDate) {
                const fineDays = Math.ceil((currentDate - t.DueDate) / (1000 * 60 * 60 * 24));
                return acc + (fineDays * 10); // ₹10 per day fine
            }
            return acc;
        }, 0);

        res.status(200).json({
            message: "Total fine for all members (for overdue books)",
            totalFine,
            totalIssuedBooks: issuedBooks.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
