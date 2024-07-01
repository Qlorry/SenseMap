export interface Book {
    bookname : string,
    email : string,
    password : string
}

export interface UnitBook extends Book {
    id : string
}

export interface Books {
    [key : string] : UnitBook
}