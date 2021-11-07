const {ApolloServer, gql} = require('apollo-server');

const port = process.env.PORT || 8000;


const books = [
    {
        title: 'a revenue stamp',
        author: 'Amrita Pritam',
        ISBN: '0-7-3521-4'
    },
    {
        title: 'clarissa',
        author: 'Samuel Richardson',
        ISBN: '0-1749'
    },
    {
        title: 'Emma',
        author: 'Jane Austen',
        ISBN: '99-88-18-16'
    }
]

const schemas = gql`
    type Book {
        title: String!
        author: String!
        ISBN: String
    }
    type Query {
        books: [Book]
        book(title: String!): Book
    }
    type Mutation {
        createBook(title: String!, author: String!, ISBN: String): Book
    }
`;

const bookResolvers = {
    Query: {
        books: () => books,
        book: (parent, args) => books.find(book => book.title === args.title) 
    },

    Mutation: {
        createBook: (parent, args) => {
            const {title, author, ISBN} = args;
            console.log(args)
            const book = {title, author, ISBN};
            books.push(book);
            return book;
        }
    }
}



const server = new ApolloServer({typeDefs: schemas, resolvers: bookResolvers});

server.listen(8000).then(({url}) => {
    console.log(`Server is updated and running at ${url}`);
}).catch(err => console.log(err))