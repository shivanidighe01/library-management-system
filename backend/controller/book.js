import {Book} from '../model/book.js';


export const addBook= async(req,res)=>
{
    try {
        console.log(req.body);
    const {title,author,ISBN,status}=req.body;

    const existBook=await Book.findOne({ISBN});
    if(existBook)
    {
        return res.status(400).json({
            success:false,
            message:"Book with this ISBN number already exist"
        });
    }
    if(!title || !author || !ISBN)
    {
        return res.status(404).json({
            success:false,
            message:"Enter all Feilds"
        });
    }

    const newBook=await new Book({
        title,
        author,
        ISBN,
        status
    });
    newBook.save();

    return res.status(200).json({
        success:true,
        newBook,
        message:"Book added successfully"
    })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"book not added"
        });
    }

}

export const browseBook=async(req,res)=>{
    try {
        const books=await Book.find();

        return res.status(200).json({
            success:true,
            books,
            message:"All books fetched"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"books not fetched"
        })
    }
}

export const getSingleBook=async(req,res)=>{
    try {
        console.log(req.params);
        const id=req.params.id;
        
        if(!id)
        {
            return res.status(404).json({
                success:false,
                message:"id not found"
            })
        }
        const book=await Book.findOne({_id:id});

        if(!book)
        {
            return res.status(404).json({
                success:false,
                message:"book not found"
            })
        }
        return res.status(200).json({
            success:true,
            book,
            message:"book fetched successfully"
        })
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:error.message
        })
    }
}

export const updateBook=async(req,res)=>{
    try {
        const id=req.params.id; 

        const {title,author,ISBN,status}=req.body;

        const book=await Book.findByIdAndUpdate(id,{title,author,ISBN,status},{new:true});

        // book=new Book({
        //     title,author,ISBN,status

        // });

        if(!book)
        {
            return res.status(404).json({
                success:false,
                message:"book not found"
            });
        }

        book.save();

        return res.status(200).json({
            success:true,
            message:"book info updated",
            book
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"book not updated"
        });
    }

}