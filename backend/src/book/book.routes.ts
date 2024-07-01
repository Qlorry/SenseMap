import express, {Request, Response} from "express"
import { UnitBook, Book } from "./book.interface"
import {StatusCodes} from "http-status-codes"
import * as database from "./book.database"

export const bookRouter = express.Router()

bookRouter.get("/books", async (req : Request, res : Response) => {
    try {
        const allBooks : UnitBook[] = await database.findAll()

        if (!allBooks) {
            return res.status(StatusCodes.NOT_FOUND).json({msg : `No books at this time..`})
        }

        return res.status(StatusCodes.OK).json({total_book : allBooks.length, allBooks})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})

bookRouter.get("/book/:id", async (req : Request, res : Response) => {
    try {
        const book : UnitBook = await database.findOne(req.params.id)

        if (!book) {
            return res.status(StatusCodes.NOT_FOUND).json({error : `Book not found!`})
        }

        return res.status(StatusCodes.OK).json({book})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})

bookRouter.post("/register", async (req : Request, res : Response) => {
    try {
        const { bookname, email, password } = req.body

        if (!bookname || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({error : `Please provide all the required parameters..`})
        }

        const book = await database.findByEmail(email) 

        if (book) {
            return res.status(StatusCodes.BAD_REQUEST).json({error : `This email has already been registered..`})
        }

        const newBook = await database.create(req.body)

        return res.status(StatusCodes.CREATED).json({newBook})

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})

bookRouter.post("/login", async (req : Request, res : Response) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({error : "Please provide all the required parameters.."})
        }

        const book = await database.findByEmail(email)

        if (!book) {
            return res.status(StatusCodes.NOT_FOUND).json({error : "No book exists with the email provided.."})
        }

        const comparePassword = await database.comparePassword(email, password)

        if (!comparePassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({error : `Incorrect Password!`})
        }

        return res.status(StatusCodes.OK).json({book})

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})


bookRouter.put('/book/:id', async (req : Request, res : Response) => {

    try {

        const {bookname, email, password} = req.body

        const getBook = await database.findOne(req.params.id)

        if (!bookname || !email || !password) {
            return res.status(401).json({error : `Please provide all the required parameters..`})
        }

        if (!getBook) {
            return res.status(404).json({error : `No book with id ${req.params.id}`})
        }

        const updateBook = await database.update((req.params.id), req.body)

        return res.status(201).json({updateBook})
    } catch (error) {
        console.log(error) 
        return res.status(500).json({error})
    }
})

bookRouter.delete("/book/:id", async (req : Request, res : Response) => {
    try {
        const id = (req.params.id)

        const book = await database.findOne(id)

        if (!book) {
            return res.status(StatusCodes.NOT_FOUND).json({error : `Book does not exist`})
        }

        await database.remove(id)

        return res.status(StatusCodes.OK).json({msg : "Book deleted"})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})