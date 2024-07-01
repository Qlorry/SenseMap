import { Book, UnitBook, Books } from "./book.interface";
import bcrypt from "bcryptjs"
import {v4 as random} from "uuid"
import fs from "fs"

let books: Books = loadBooks() 

function loadBooks () : Books {
  try {
    const data = fs.readFileSync("./books.json", "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.log(`Error ${error}`)
    return {}
  }
}

function saveBooks () {
  try {
    fs.writeFileSync("./books.json", JSON.stringify(books), "utf-8")
    console.log(`Book saved successfully!`)
  } catch (error) {
    console.log(`Error : ${error}`)
  }
}

export const findAll = async (): Promise<UnitBook[]> => Object.values(books);

export const findOne = async (id: string): Promise<UnitBook> => books[id];

export const create = async (bookData: UnitBook): Promise<UnitBook | null> => {

  let id = random()

  let check_book = await findOne(id);

  while (check_book) {
    id = random()
    check_book = await findOne(id)
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(bookData.password, salt);

  const book : UnitBook = {
    id : id,
    bookname : bookData.bookname,
    email : bookData.email,
    password: hashedPassword
  };

  books[id] = book;

  saveBooks()

  return book;
};

export const findByEmail = async (book_email: string): Promise<null | UnitBook> => {

  const allBooks = await findAll();

  const getBook = allBooks.find(result => book_email === result.email);

  if (!getBook) {
    return null;
  }

  return getBook;
};

export const comparePassword  = async (email : string, supplied_password : string) : Promise<null | UnitBook> => {

    const book = await findByEmail(email)

    const decryptPassword = await bcrypt.compare(supplied_password, book!.password)

    if (!decryptPassword) {
        return null
    }

    return book
}

export const update = async (id : string, updateValues : Book) : Promise<UnitBook | null> => {

    const bookExists = await findOne(id)

    if (!bookExists) {
        return null
    }

    if(updateValues.password) {
        const salt = await bcrypt.genSalt(10)
        const newPass = await bcrypt.hash(updateValues.password, salt)

        updateValues.password = newPass
    }

    books[id] = {
        ...bookExists,
        ...updateValues
    }

    saveBooks()

    return books[id]
}

export const remove = async (id : string) : Promise<null | void> => {

    const book = await findOne(id)

    if (!book) {
        return null
    }

    delete books[id]

    saveBooks()
}
