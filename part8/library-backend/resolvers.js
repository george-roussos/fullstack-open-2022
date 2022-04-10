const { AuthenticationError, UserInputError } = require("apollo-server");

const Author = require("./models/Author.model");
const Book = require("./models/Book.model");
const User = require("./models/User.model");

require("dotenv").config();

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET;

const PASSWORD = process.env.PASSWORD;

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    allAuthors: async () => {
      return await Author.find({});
    },
    allBooks: async (root, args) => {
      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author });
        if (foundAuthor) {
          if (args.genre) {
            return await Book.find({
              author: foundAuthor.id,
              genres: { $in: [args.genre] },
            }).populate("author");
          }
          return await Book.find({ author: foundAuthor.id }).populate("author");
        }
        return null;
      }

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate("author");
      }

      return Book.find({}).populate("author");
    },
  },
  Author: {
    bookCount: async (root, args, context) => {
      const books = await Book.find({});
      const author = await Author.findOne({ name: root.name });
      filteredBooks = books.filter(
        (book) => JSON.stringify(book.author) === JSON.stringify(author.id)
      );
      return filteredBooks.length;
    },
  },
  Mutation: {
    addAuthor: async (root, args, context) => {
      const { name, born } = args.author;
      const author = new Author({ name, born });
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
    addBook: async (parent, args, context) => {
      const { title, published, author, genres } = args;
      const foundAuthor = await Author.findOne({ name: args.author.name });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      let book = undefined;
      if (foundAuthor) {
        book = new Book({
          title,
          published,
          author: foundAuthor,
          genres: genres,
        });
      } else {
        const newAuthor = new Author({ ...args.author });
        try {
          await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
        const foundAuthor = await Author.findOne({ name: args.author.name });
        book = new Book({
          title,
          published,
          author: foundAuthor,
          genres: genres,
        });
      }
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return book;
    },
    createUser: async (parent, args, context) => {
      const user = new User({ ...args });
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    editAuthor: async (parent, args, context) => {
      const { name, setBornTo } = args;
      const foundAuthor = await Author.findOne({ name: name });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      await Author.findByIdAndUpdate(foundAuthor.id, {
        name: name,
        born: setBornTo,
      });
      try {
        await foundAuthor.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return foundAuthor;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== PASSWORD) {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

module.exports = resolvers;
