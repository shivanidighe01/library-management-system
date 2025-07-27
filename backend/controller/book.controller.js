import express from "express";
import Category from "../models/category.model.js";
import Book from "../models/book.model.js";
import Staff from "../models/staff.model.js";
import Transaction from "../models/transactions.model.js";

export const addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const exist = await Category.findOne({
      category_name: { $regex: category_name, $options: "i" },
    });
    if (exist) {
      return res.status(400).json({
        message: "category already exist",
      });
    }
    const cat = new Category({
      category_name,
    });

    await cat.save();

    res.status(200).json({
      message: "category created successfully",
      cat,
    });
  } catch (error) {
    console.log(`category error ${error}`);
  }
};

export const addBook = async (req, res) => {
  try {
    const { ISBN, title, author, quantity, category, status } = req.body;

    if (!ISBN || !title || !author || !quantity || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const exist = await Book.findOne({ ISBN });
    if (exist) {
      return res.status(400).json({
        message: `Book already exist with ISBN no ${exist.ISBN}`,
      });
    }

    const cat = await Category.findOne({ category_name: category });

    if (!cat) {
      return res.status(400).json({
        message: "Category not found",
      });
    }
    // console.log(cat._id);

    const book = await new Book({
      ISBN,
      title,
      author,
      quantity,
      category: cat._id,
      status,
    });

    await book.save();

    res.status(200).json({
      message: "book added successfully",
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { ISBN, title, author, quantity, category, status } = req.body;

    const exist = await Book.findOne({ ISBN });

    if (!exist) {
      return res.status(400).json({
        message: "Book not found!! plz provide valid ISBN number",
      });
    }

    let categoryId = exist.category;

    if (category) {
      const foundCat = await Category.findOne({ category_name: category });
      if (!foundCat) {
        return res.status(400).json({
          message: "Invalid category",
        });
      }
      categoryId = foundCat._id;
    }
    exist.ISBN = ISBN || exist.ISBN;
    exist.title = title || exist.title;
    exist.author = author || exist.author;
    exist.quantity = quantity || exist.quantity;
    exist.status = status || exist.status;
    exist.category = categoryId;

    await exist.save();

    res.status(200).json({
      message: "Book data updated successfully",
      exist,
    });
  } catch (error) {
    console.log(`book updation error ${error}`);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { ISBN } = req.body;

    if (!ISBN) {
      return res.status(400).json({
        message: "Plz provide ISBN number",
      });
    }
    const exist = await Book.findOne({ ISBN });
    if (!exist) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    const delBook = await Book.findOneAndDelete({ ISBN });

    if (!delBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: `Book Deleted Successfully with ISBN number ${ISBN} `,
    });
  } catch (error) {
    console.log(`Book deletion error ${error}`);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

export const showAllBook = async (req, res) => {
  try {
    const books = await Book.find().populate("category");
    res.status(200).json({
      message: "All books Fetched",
      books,
    });
  } catch (error) {
    console.log(`Book fetch error ${error}`);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

export const getByISBN = async (req, res) => {
  try {
    const { ISBN } = req.body;

    if (!ISBN) {
      return res.status(400).json({
        message: "ISBN number required",
      });
    }

    const book = await Book.findOne({ ISBN });
    if (!book) {
      return res.status(404).json({
        message: "Book you are looking for not found",
      });
    }

    res.status(200).json({
      message: "Book found",
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

export const getByAuthor = async (req, res) => {
  try {
    const { author } = req.body;

    if (!author) {
      return res.status(400).json({
        message: "Author name required",
      });
    }
    const book = await Book.find({ author: { $regex: author, $options: "i" } });

    if (!book) {
      return res.status(404).json({
        message: `Book with author ${author} not found`,
      });
    }

    res.status(200).json({
      message: "book found",
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};

export const getByTitle = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title required",
      });
    }
    const book = await Book.find({ title: { $regex: title, $options: "i" } });

    if (!book) {
      return res.status(404).json({
        message: `Book with title ${title} not found`,
      });
    }

    res.status(200).json({
      message: "book found",
      book,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};
export const issueBook = async (req, res) => {
  try {
    const { ISBN, memberID } = req.body;

    if (!ISBN || !memberID) {
      return res.status(400).json({
        message: "ISBN number and member ID is required",
      });
    }

    const book = await Book.findOne({ ISBN });

    if (!book || book.quantity <= 0) {
      return res.status(404).json({
        message: "Book you are looking for is not Available",
      });
    }
    // const bookId=book._id;
    const member = await Staff.findById(memberID);

    if (!member || member.role != "Member") {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    let trans = await new Transaction({
      bookId: book._id,
      memberId: member._id,
      IssueDate: new Date(),
      //2 week
      DueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: "Issued",
    });

    await trans.save();

    book.quantity -= 1;
    if (book.quantity === 0) {
      book.status = "Not-Available";
    }
    await book.save();

    trans = await trans.populate([
      {
        path: "bookId",
        select: "title ISBN author quantity status",
      },
      {
        path: "memberId",
        select: "name role",
      },
    ]);
    res.status(200).json({
      message: "Book Issued successfully",
      trans,
    });
  } catch (error) {
    console.log(`Error at issuing book ${error}`);
    res.status(400).json({
      message: "Internal Server error",
    });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { transactionId } = req.body;

    if (!transactionId) {
      return res.status(400).json({
        message: "Transaction id required",
      });
    }
    const trans = await Transaction.findById(transactionId).populate([
      {
        path: "bookId",
      },
      {
        path: "memberId",
      },
    ]);

    if (!trans) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

     if (trans.status === "Returned") {
      return res.status(400).json({
        message: "This book has already been returned."
      });
    }


    const currentDate = new Date();

    // Update transaction fields
    trans.ReturnDate = currentDate;
    trans.status = "Returned";

    let fine = 0;
    if (currentDate > trans.DueDate) {
      const diffTime = Math.abs(currentDate - trans.DueDate);
      const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      fine = overdueDays * 10;
    }


    await trans.save();

    const book = trans.bookId;
    book.quantity += 1;
    if (book.quantity > 0) {
      book.status = "Available";
    }
    await book.save();

    res.status(200).json({
      message: `Book returned successfully with ${fine} fine`,
      trans,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};
export const getAllIssueBook = async (req, res) => {
  try {
    // const{transId}=req.body;

    const issueBook = await Transaction.find({
      status: { $ne: "Returned" },
    }).populate([
      {
        path: "bookId",
      },
      {
        path: "memberId",
      },
    ]);

    res.status(200).json({
      message: "All issued Books",
      issueBook,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal server error",
    });
  }
};




