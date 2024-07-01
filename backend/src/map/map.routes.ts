import express, {Request, Response} from "express"
// import { UnitBook, Book } from "./book.interface"
import {StatusCodes} from "http-status-codes"
// import * as database from "./book.database"

export const mapRouter = express.Router()

mapRouter.get("/map", async (req : Request, res : Response) => {
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

mapRouter.post("/update_map", async (req : Request, res : Response) => {
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
