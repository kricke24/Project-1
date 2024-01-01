function getTotalBooksCount(books) {
  let bookCount = books.reduce((total, book) => total + 1, 0);
  return bookCount;
}

function getTotalAccountsCount(accounts) {
  const accountCount = accounts.length;
  return accountCount;
}

function getBooksBorrowedCount(books) {
  let booksBorrowed = books.filter((book) =>    //make the accumulator variable, which will filter books...
    book.borrows.filter((element) =>            //by their borrows array, which in turn is filtered...
      element.returned === false).length > 0);  //if they have any returned values that are false
  return booksBorrowed.length;                   //return the accumulator
}

const countedGenres = [];

function genreCounter (books) {                  //helper function that creates an array of {genre, count} objects
  const accumulator = [];                        //make an accumulator
  books.forEach((book) => {                      //for each book in books...
    if (!countedGenres.includes(book.genre)) {   //check if the current genre is in global.countedGenres. if not...
      const name = book.genre;                   //make the name variable
      countedGenres.push(name);                  //add the currentGenre to global.countedGenres
      let count = 0;                             //make the count variable
      books.forEach((book) => {                  //for each book in books...
         if (book.genre === name) {              //if the genre matches currentGenre
          count += 1                             //increate count
         }
      });
      const countedGenre = {name, count};        //make an object that is {name, count}
      accumulator.push(countedGenre);            //push that object into the accumulator
    } 
  });
  return accumulator;                            //return the accumulator  
}
  

function getMostCommonGenres(books) {
  const genreArray = genreCounter (books)
  sortedArray = genreArray.sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1));//sort that array by count
  const output = [                               //put that array indices 0-4 into the output array
    sortedArray[0],                           
    sortedArray[1],
    sortedArray[2],
    sortedArray[3],
    sortedArray[4]
  ]; 
  return output;   //return the output array
}

function borrowCounter (books) {              //helper function that creates an array of {name, count} objects
  const accumulator = [];                     //make an accumulator
  books.forEach((book) => {                   //for each book in books...
      const name = book.title;                //make the name variable
      const count = book.borrows.length;      //make the count equal to the borrow length
      const countedBorrows = {name, count};   //make an object that is {name, count}
      accumulator.push(countedBorrows);       //push that object into the accumulator
  });
  return accumulator;                         //return the accumulator  
}

function getMostPopularBooks(books) {
  const borrowArray = borrowCounter (books)
  sortedArray = borrowArray.sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1));//sort that array by count
  const output = [                              //put that array indices 0-4 into the output array
    sortedArray[0],                           
    sortedArray[1],
    sortedArray[2],
    sortedArray[3],
    sortedArray[4]
  ]; 
  return output;                                //return the output array
}

function authorPuller (books, authors){              //helper function that counts borrows and reformats author objects
  const accumulator = [];                            //create an accumulator
  authors.forEach((author) => {                      //for each author... NOTE: instead of spending two hours trying to start with books, which can be duplicated, START with authors next time, which can't (that is, begin with the limited resouce)
   let currentAuthor = { name: `${author.name.first} ${author.name.last}`,  count: 0};    //make the new object using template literals to format as requried
   books.forEach((book) => {                        //then, for each book...
    if (book.authorId === author.id) {              //check if the book's authorId matches the author's id
     currentAuthor.count += book.borrows.length;    //increase the count by the current book's borrow length
    }
   });
   accumulator.push(currentAuthor);                  //push the current author into the accumulator
  });
  return accumulator
 }

 function getMostPopularAuthors(books, authors) {
  const authorArray = authorPuller (books, authors)
  sortedArray = authorArray.sort((authorA, authorB) => (authorA.count < authorB.count ? 1 : -1)); //sort that array by count
  const output = [                               //put that array indices 0-4 into the output array
    sortedArray[0],                           
    sortedArray[1],
    sortedArray[2],
    sortedArray[3],
    sortedArray[4]
  ]; 
  return output;   //return the output array
 }
 
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
