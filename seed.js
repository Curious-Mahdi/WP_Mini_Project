require('dotenv').config();
const mongoose = require('mongoose');
const Flashcard = require('./models/Flashcard');
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB for seeding'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    // Clear existing data
    await Flashcard.deleteMany({});
    await Question.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // HTML Flashcards
    const htmlFlashcards = [
      { module: 'html', front: 'What does HTML stand for?', back: 'HyperText Markup Language', order: 1 },
      { module: 'html', front: 'Which tag is used for the main heading?', back: '<h1> tag', order: 2 },
      { module: 'html', front: 'What is the purpose of the <div> tag?', back: 'A container element for grouping and styling content', order: 3 },
      { module: 'html', front: 'Which attribute is used to add an image?', back: 'src attribute in <img> tag', order: 4 },
      { module: 'html', front: 'What does <a> tag do?', back: 'Creates a hyperlink to another page or resource', order: 5 },
      { module: 'html', front: 'Which tag creates a line break?', back: '<br> tag', order: 6 },
      { module: 'html', front: 'What is semantic HTML?', back: 'HTML that uses meaningful tags to describe content structure', order: 7 },
      { module: 'html', front: 'Which tag is used for creating lists?', back: '<ul> for unordered, <ol> for ordered lists', order: 8 },
      { module: 'html', front: 'What does the <form> tag do?', back: 'Creates a form for user input', order: 9 },
      { module: 'html', front: 'Which tag is used for table rows?', back: '<tr> tag', order: 10 }
    ];

    // CSS Flashcards
    const cssFlashcards = [
      { module: 'css', front: 'What does CSS stand for?', back: 'Cascading Style Sheets', order: 1 },
      { module: 'css', front: 'How do you select an element by ID?', back: 'Use # followed by the ID name', order: 2 },
      { module: 'css', front: 'What is the box model?', back: 'Content, padding, border, and margin', order: 3 },
      { module: 'css', front: 'How do you center text?', back: 'text-align: center;', order: 4 },
      { module: 'css', front: 'What is flexbox?', back: 'A layout method for arranging items in a container', order: 5 },
      { module: 'css', front: 'How do you change text color?', back: 'color: value; property', order: 6 },
      { module: 'css', front: 'What is a CSS class?', back: 'A reusable style that can be applied to multiple elements', order: 7 },
      { module: 'css', front: 'How do you make an element hidden?', back: 'display: none; or visibility: hidden;', order: 8 },
      { module: 'css', front: 'What is media query?', back: 'A CSS feature for responsive design based on screen size', order: 9 },
      { module: 'css', front: 'How do you add rounded corners?', back: 'border-radius: value;', order: 10 }
    ];

    // JavaScript Flashcards
    const jsFlashcards = [
      { module: 'js', front: 'What is a variable?', back: 'A container that stores a value', order: 1 },
      { module: 'js', front: 'How do you declare a variable?', back: 'let, const, or var keyword', order: 2 },
      { module: 'js', front: 'What is a function?', back: 'A block of code that performs a specific task', order: 3 },
      { module: 'js', front: 'What is an array?', back: 'An ordered collection of values', order: 4 },
      { module: 'js', front: 'What is an object?', back: 'A collection of key-value pairs', order: 5 },
      { module: 'js', front: 'What does === mean?', back: 'Strict equality comparison (checks type and value)', order: 6 },
      { module: 'js', front: 'What is a loop?', back: 'A way to repeat code multiple times', order: 7 },
      { module: 'js', front: 'What is DOM?', back: 'Document Object Model - representation of HTML elements', order: 8 },
      { module: 'js', front: 'What is an event listener?', back: 'Code that responds to user actions like clicks', order: 9 },
      { module: 'js', front: 'What is JSON?', back: 'JavaScript Object Notation - data format', order: 10 }
    ];

    // HTML Questions
    const htmlQuestions = [
      {
        module: 'html',
        question: 'What does HTML stand for?',
        options: [
          'HyperText Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlink Text Markup Language'
        ],
        correctAnswer: 0
      },
      {
        module: 'html',
        question: 'Which tag is used for the largest heading?',
        options: ['<h6>', '<h1>', '<head>', '<header>'],
        correctAnswer: 1
      },
      {
        module: 'html',
        question: 'What is the correct HTML element for inserting a line break?',
        options: ['<break>', '<br>', '<lb>', '<line>'],
        correctAnswer: 1
      },
      {
        module: 'html',
        question: 'Which attribute is used to define inline styles?',
        options: ['styles', 'style', 'class', 'css'],
        correctAnswer: 1
      },
      {
        module: 'html',
        question: 'What is the correct HTML for creating a hyperlink?',
        options: [
          '<a url="http://example.com">Link</a>',
          '<a href="http://example.com">Link</a>',
          '<link>http://example.com</link>',
          '<a>http://example.com</a>'
        ],
        correctAnswer: 1
      },
      {
        module: 'html',
        question: 'Which HTML element defines the title of a document?',
        options: ['<title>', '<head>', '<meta>', '<header>'],
        correctAnswer: 0
      },
      {
        module: 'html',
        question: 'What is the purpose of the <div> element?',
        options: [
          'To create a division or section',
          'To display text',
          'To create a link',
          'To insert an image'
        ],
        correctAnswer: 0
      },
      {
        module: 'html',
        question: 'Which tag is used to define an unordered list?',
        options: ['<list>', '<ul>', '<ol>', '<li>'],
        correctAnswer: 1
      },
      {
        module: 'html',
        question: 'What is the correct HTML element for the largest heading?',
        options: ['<heading>', '<h1>', '<head>', '<h6>'],
        correctAnswer: 1
      },
      {
        module: 'html',
        question: 'Which HTML attribute specifies an alternate text for an image?',
        options: ['title', 'src', 'alt', 'href'],
        correctAnswer: 2
      },
      {
        module: 'html',
        question: 'What does the <form> element do?',
        options: [
          'Creates a table',
          'Creates a form for user input',
          'Creates a link',
          'Creates a list'
        ],
        correctAnswer: 1
      },
      {
        module: 'html',
        question: 'Which tag is used to create a table row?',
        options: ['<table>', '<tr>', '<td>', '<th>'],
        correctAnswer: 1
      }
    ];

    // CSS Questions
    const cssQuestions = [
      {
        module: 'css',
        question: 'What does CSS stand for?',
        options: [
          'Computer Style Sheets',
          'Cascading Style Sheets',
          'Creative Style Sheets',
          'Colorful Style Sheets'
        ],
        correctAnswer: 1
      },
      {
        module: 'css',
        question: 'How do you select an element with id "demo"?',
        options: ['#demo', '.demo', 'demo', '*demo'],
        correctAnswer: 0
      },
      {
        module: 'css',
        question: 'How do you select elements with class "test"?',
        options: ['#test', '.test', 'test', '*test'],
        correctAnswer: 1
      },
      {
        module: 'css',
        question: 'Which property is used to change the background color?',
        options: ['color', 'bgcolor', 'background-color', 'background'],
        correctAnswer: 2
      },
      {
        module: 'css',
        question: 'How do you add a background color for all <h1> elements?',
        options: [
          'h1 {background-color:#FFFFFF;}',
          'h1.all {background-color:#FFFFFF;}',
          'all.h1 {background-color:#FFFFFF;}',
          'h1.all.bg {background-color:#FFFFFF;}'
        ],
        correctAnswer: 0
      },
      {
        module: 'css',
        question: 'Which CSS property controls the text size?',
        options: ['font-style', 'text-size', 'font-size', 'text-style'],
        correctAnswer: 2
      },
      {
        module: 'css',
        question: 'What is the correct CSS syntax for making all the <p> elements bold?',
        options: [
          'p {text-size:bold;}',
          'p {font-weight:bold;}',
          '<p style="text-size:bold;">',
          '<p style="font-size:bold;">'
        ],
        correctAnswer: 1
      },
      {
        module: 'css',
        question: 'How do you make text italic?',
        options: [
          'font-style:italic;',
          'text-style:italic;',
          'font:italic;',
          'style:italic;'
        ],
        correctAnswer: 0
      },
      {
        module: 'css',
        question: 'Which property is used to change the left margin?',
        options: ['margin-left', 'padding-left', 'indent', 'margin'],
        correctAnswer: 0
      },
      {
        module: 'css',
        question: 'What is the box model?',
        options: [
          'Content, padding, border, margin',
          'Width, height, padding, margin',
          'Border, content, padding, margin',
          'Content, border, padding, margin'
        ],
        correctAnswer: 0
      },
      {
        module: 'css',
        question: 'How do you center an element horizontally?',
        options: [
          'text-align:center;',
          'align:center;',
          'margin: 0 auto;',
          'center:true;'
        ],
        correctAnswer: 2
      },
      {
        module: 'css',
        question: 'What is flexbox used for?',
        options: [
          'Text formatting',
          'Layout and alignment',
          'Color styling',
          'Animation'
        ],
        correctAnswer: 1
      }
    ];

    // JavaScript Questions
    const jsQuestions = [
      {
        module: 'js',
        question: 'Which of the following is a valid way to declare a variable?',
        options: ['var name = "John";', 'variable name = "John";', 'v name = "John";', 'var = "John";'],
        correctAnswer: 0
      },
      {
        module: 'js',
        question: 'What is the correct way to write an array in JavaScript?',
        options: [
          'var colors = (1:"red", 2:"green", 3:"blue");',
          'var colors = ["red", "green", "blue"];',
          'var colors = "red", "green", "blue";',
          'var colors = {1:"red", 2:"green", 3:"blue"};'
        ],
        correctAnswer: 1
      },
      {
        module: 'js',
        question: 'How do you call a function named "myFunction"?',
        options: [
          'call myFunction();',
          'myFunction();',
          'call function myFunction();',
          'myFunction call;'
        ],
        correctAnswer: 1
      },
      {
        module: 'js',
        question: 'What is the correct way to write an IF statement?',
        options: [
          'if i == 5 then',
          'if (i == 5)',
          'if i = 5',
          'if i = 5 then'
        ],
        correctAnswer: 1
      },
      {
        module: 'js',
        question: 'What does === mean?',
        options: [
          'Assignment operator',
          'Comparison operator (strict)',
          'Logical operator',
          'Mathematical operator'
        ],
        correctAnswer: 1
      },
      {
        module: 'js',
        question: 'What is the correct way to write a FOR loop?',
        options: [
          'for (i = 0; i <= 5; i++)',
          'for i = 1 to 5',
          'for (i <= 5; i++)',
          'for (i = 0; i <= 5)'
        ],
        correctAnswer: 0
      },
      {
        module: 'js',
        question: 'What is an object in JavaScript?',
        options: [
          'A collection of key-value pairs',
          'A function',
          'A variable',
          'An array'
        ],
        correctAnswer: 0
      },
      {
        module: 'js',
        question: 'What does DOM stand for?',
        options: [
          'Document Object Model',
          'Data Object Model',
          'Dynamic Object Model',
          'Document Oriented Model'
        ],
        correctAnswer: 0
      },
      {
        module: 'js',
        question: 'How do you add an event listener to an element?',
        options: [
          'element.addEventListener("click", function);',
          'element.onClick(function);',
          'element.addEvent("click", function);',
          'element.listen("click", function);'
        ],
        correctAnswer: 0
      },
      {
        module: 'js',
        question: 'What is the purpose of JSON?',
        options: [
          'To style web pages',
          'To store and exchange data',
          'To create animations',
          'To validate forms'
        ],
        correctAnswer: 1
      },
      {
        module: 'js',
        question: 'What is a function?',
        options: [
          'A variable',
          'A block of code that performs a task',
          'An array',
          'An object'
        ],
        correctAnswer: 1
      },
      {
        module: 'js',
        question: 'Which method adds an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0
      }
    ];

    // React Flashcards - Expanded
    const reactFlashcards = [
      { module: 'react', front: 'What is React?', back: 'A JavaScript library for building user interfaces, developed by Facebook', order: 1 },
      { module: 'react', front: 'What is JSX?', back: 'JavaScript XML - a syntax extension that allows writing HTML-like code in JavaScript', order: 2 },
      { module: 'react', front: 'What is a component?', back: 'A reusable, independent piece of UI code that returns JSX', order: 3 },
      { module: 'react', front: 'What is useState?', back: 'A React Hook that allows functional components to manage local state', order: 4 },
      { module: 'react', front: 'What is useEffect?', back: 'A React Hook for performing side effects like API calls, subscriptions, or DOM manipulation', order: 5 },
      { module: 'react', front: 'What are props?', back: 'Properties passed from parent to child components, making components reusable', order: 6 },
      { module: 'react', front: 'What is the virtual DOM?', back: 'React\'s in-memory representation of the DOM that enables efficient updates', order: 7 },
      { module: 'react', front: 'How do you render a list?', back: 'Use the map() function to transform arrays into JSX elements', order: 8 },
      { module: 'react', front: 'What is a key prop?', back: 'A unique identifier for list items that helps React track changes efficiently', order: 9 },
      { module: 'react', front: 'What is React Router?', back: 'A popular library for handling navigation and routing in React applications', order: 10 },
      { module: 'react', front: 'What is conditional rendering?', back: 'Displaying different content based on conditions using if statements or ternary operators', order: 11 },
      { module: 'react', front: 'What is state lifting?', back: 'Moving state up to a common ancestor component to share data between siblings', order: 12 },
      { module: 'react', front: 'What is a controlled component?', back: 'A form element whose value is controlled by React state', order: 13 },
      { module: 'react', front: 'What is React Context?', back: 'A way to pass data through the component tree without prop drilling', order: 14 },
      { module: 'react', front: 'What is useCallback?', back: 'A Hook that memoizes functions to prevent unnecessary re-renders', order: 15 },
      { module: 'react', front: 'What is useMemo?', back: 'A Hook that memoizes expensive calculations to optimize performance', order: 16 },
      { module: 'react', front: 'What is React.memo?', back: 'A higher-order component that prevents re-renders if props haven\'t changed', order: 17 },
      { module: 'react', front: 'What is a custom Hook?', back: 'A JavaScript function that starts with "use" and can call other Hooks', order: 18 },
      { module: 'react', front: 'What is the difference between props and state?', back: 'Props are passed from parent, state is managed internally. Props are read-only, state can be updated', order: 19 },
      { module: 'react', front: 'What is React Fragment?', back: 'A way to group multiple elements without adding extra DOM nodes', order: 20 }
    ];

    // Node.js Flashcards - Expanded
    const nodeFlashcards = [
      { module: 'node', front: 'What is Node.js?', back: 'JavaScript runtime built on Chrome\'s V8 engine that runs JavaScript on the server', order: 1 },
      { module: 'node', front: 'What is npm?', back: 'Node Package Manager - the default package manager for Node.js', order: 2 },
      { module: 'node', front: 'What is Express?', back: 'Fast, unopinionated, minimalist web framework for Node.js', order: 3 },
      { module: 'node', front: 'What is a module?', back: 'A reusable block of code that can be exported and imported in Node.js', order: 4 },
      { module: 'node', front: 'What is require()?', back: 'CommonJS function to import modules in Node.js', order: 5 },
      { module: 'node', front: 'What is middleware?', back: 'Functions that have access to request, response, and next in the Express routing cycle', order: 6 },
      { module: 'node', front: 'What is package.json?', back: 'File containing project metadata, dependencies, and scripts', order: 7 },
      { module: 'node', front: 'What is async/await?', back: 'Modern syntax for handling asynchronous operations, making code look synchronous', order: 8 },
      { module: 'node', front: 'What is REST API?', back: 'Representational State Transfer - architectural style for designing web services', order: 9 },
      { module: 'node', front: 'What is MongoDB?', back: 'NoSQL document-oriented database that stores data in JSON-like documents', order: 10 },
      { module: 'node', front: 'What is Mongoose?', back: 'MongoDB object modeling library for Node.js that provides schema-based solution', order: 11 },
      { module: 'node', front: 'What is process.env?', back: 'Object containing user environment variables in Node.js', order: 12 },
      { module: 'node', front: 'What is __dirname?', back: 'Global variable containing the directory name of the current module', order: 13 },
      { module: 'node', front: 'What is a callback?', back: 'A function passed as an argument to another function, executed after completion', order: 14 },
      { module: 'node', front: 'What is a Promise?', back: 'Object representing eventual completion or failure of an asynchronous operation', order: 15 },
      { module: 'node', front: 'What is the event loop?', back: 'Mechanism that handles asynchronous callbacks in Node.js', order: 16 },
      { module: 'node', front: 'What is body-parser?', back: 'Middleware that parses incoming request bodies in Express', order: 17 },
      { module: 'node', front: 'What is CORS?', back: 'Cross-Origin Resource Sharing - mechanism to allow requests from different origins', order: 18 },
      { module: 'node', front: 'What is dotenv?', back: 'Module that loads environment variables from .env file into process.env', order: 19 },
      { module: 'node', front: 'What is a route handler?', back: 'Function that handles HTTP requests for a specific route in Express', order: 20 }
    ];

    // React Questions
    const reactQuestions = [
      {
        module: 'react',
        question: 'What is React?',
        options: [
          'A database',
          'A JavaScript library for building UIs',
          'A CSS framework',
          'A server framework'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'What is JSX?',
        options: [
          'A database query language',
          'JavaScript XML syntax extension',
          'A CSS preprocessor',
          'A testing framework'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'How do you create a component?',
        options: [
          'function MyComponent() { return <div>Hello</div>; }',
          'component MyComponent() { return <div>Hello</div>; }',
          'create MyComponent() { return <div>Hello</div>; }',
          'new MyComponent() { return <div>Hello</div>; }'
        ],
        correctAnswer: 0
      },
      {
        module: 'react',
        question: 'What is useState used for?',
        options: [
          'To fetch data',
          'To manage component state',
          'To style components',
          'To create routes'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'What are props?',
        options: [
          'CSS properties',
          'Data passed to components',
          'Database queries',
          'Event handlers only'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'What is the virtual DOM?',
        options: [
          'A real DOM element',
          'React\'s in-memory DOM representation',
          'A CSS framework',
          'A database model'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'How do you render a list in React?',
        options: [
          'Using for loops',
          'Using map() function',
          'Using while loops',
          'Using if statements'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'What is useEffect used for?',
        options: [
          'To style components',
          'To handle side effects and lifecycle',
          'To create routes',
          'To manage state'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'What is a key prop?',
        options: [
          'A CSS property',
          'Unique identifier for list items',
          'A database key',
          'An API endpoint'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'What is React Router?',
        options: [
          'A database',
          'Library for navigation',
          'A CSS framework',
          'A testing tool'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'How do you pass data to a component?',
        options: [
          'Using props',
          'Using CSS',
          'Using database',
          'Using localStorage only'
        ],
        correctAnswer: 0
      },
      {
        module: 'react',
        question: 'What is a functional component?',
        options: [
          'A component using classes',
          'A component using functions',
          'A database component',
          'A CSS component'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'What is conditional rendering in React?',
        options: [
          'Rendering components based on conditions',
          'Rendering only once',
          'Rendering in loops',
          'Rendering with delays'
        ],
        correctAnswer: 0
      },
      {
        module: 'react',
        question: 'What is React Context used for?',
        options: [
          'Styling components',
          'Passing data without prop drilling',
          'Routing',
          'State management only'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'What does useCallback do?',
        options: [
          'Fetches data',
          'Memoizes functions to prevent re-renders',
          'Creates routes',
          'Manages state'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'What is a controlled component?',
        options: [
          'Component with state',
          'Form element controlled by React state',
          'Component with props',
          'Component with hooks'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'What is React.memo?',
        options: [
          'A hook',
          'HOC that prevents re-renders if props unchanged',
          'A state management tool',
          'A routing library'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'What is the purpose of keys in React lists?',
        options: [
          'Styling',
          'Help React identify which items changed',
          'Routing',
          'State management'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'What is state lifting?',
        options: [
          'Moving state to parent component',
          'Deleting state',
          'Copying state',
          'Hiding state'
        ],
        correctAnswer: 0
      },
      {
        module: 'react',
        question: 'What is a custom Hook?',
        options: [
          'Built-in React Hook',
          'JavaScript function starting with "use"',
          'Component',
          'Library'
        ],
        correctAnswer: 1
      },
      {
        module: 'react',
        question: 'What is React Fragment?',
        options: [
          'A component',
          'Way to group elements without extra DOM nodes',
          'A hook',
          'A library'
        ],
        correctAnswer: 1
      }
    ];

    // Node.js Questions
    const nodeQuestions = [
      {
        module: 'node',
        question: 'What is Node.js?',
        options: [
          'A database',
          'JavaScript runtime for server-side',
          'A CSS framework',
          'A browser'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'What is npm?',
        options: [
          'Node Package Manager',
          'New Project Manager',
          'Network Protocol Manager',
          'Node Program Manager'
        ],
        correctAnswer: 0
      },
      {
        module: 'node',
        question: 'What is Express?',
        options: [
          'A database',
          'Web framework for Node.js',
          'A CSS framework',
          'A browser extension'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'How do you import a module?',
        options: [
          'import module',
          'require("module")',
          'load module',
          'include module'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'What is middleware?',
        options: [
          'A database',
          'Functions in request/response cycle',
          'A CSS framework',
          'A browser feature'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'What is package.json?',
        options: [
          'A CSS file',
          'Project metadata file',
          'A database file',
          'A test file'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'What is async/await?',
        options: [
          'CSS syntax',
          'Asynchronous code handling',
          'Database query',
          'HTML tag'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'What is REST API?',
        options: [
          'A database',
          'Web service architecture',
          'A CSS framework',
          'A browser API'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'What is MongoDB?',
        options: [
          'A CSS framework',
          'NoSQL database',
          'A JavaScript library',
          'A browser'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'How do you start a Node.js server?',
        options: [
          'node server.js',
          'start server.js',
          'run server.js',
          'execute server.js'
        ],
        correctAnswer: 0
      },
      {
        module: 'node',
        question: 'What is req and res in Express?',
        options: [
          'CSS properties',
          'Request and Response objects',
          'Database models',
          'HTML elements'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'What is Mongoose?',
        options: [
          'A CSS framework',
          'MongoDB object modeling library',
          'A browser',
          'A testing tool'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'What is process.env used for?',
        options: [
          'Environment variables',
          'Database connection',
          'File system',
          'Network requests'
        ],
        correctAnswer: 0
      },
      {
        module: 'node',
        question: 'What is __dirname in Node.js?',
        options: [
          'Current file name',
          'Directory name of current module',
          'File path',
          'Module name'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'What is a callback function?',
        options: [
          'Synchronous function',
          'Function passed as argument, executed after completion',
          'Async function only',
          'Promise handler'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'What is the event loop?',
        options: [
          'Synchronous execution',
          'Mechanism handling async callbacks',
          'Database query',
          'File system'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'What is CORS?',
        options: [
          'Database',
          'Cross-Origin Resource Sharing',
          'CSS framework',
          'Authentication'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'What does body-parser do?',
        options: [
          'Parses request bodies',
          'Parses HTML',
          'Parses CSS',
          'Parses JavaScript'
        ],
        correctAnswer: 0
      },
      {
        module: 'node',
        question: 'What is dotenv used for?',
        options: [
          'Loading environment variables from .env',
          'Database connection',
          'File uploads',
          'Email sending'
        ],
        correctAnswer: 0
      },
      {
        module: 'node',
        question: 'What is a Promise?',
        options: [
          'Synchronous operation',
          'Object representing async operation completion',
          'Callback function',
          'Event handler'
        ],
        correctAnswer: 1
      },
      {
        module: 'node',
        question: 'What is a route handler?',
        options: [
          'Database query',
          'Function handling HTTP requests for a route',
          'Middleware',
          'Authentication'
        ],
        correctAnswer: 1
      }
    ];

    // Insert flashcards
    await Flashcard.insertMany([...htmlFlashcards, ...cssFlashcards, ...jsFlashcards, ...reactFlashcards, ...nodeFlashcards]);
    console.log('✅ Inserted flashcards');

    // Insert questions
    await Question.insertMany([...htmlQuestions, ...cssQuestions, ...jsQuestions, ...reactQuestions, ...nodeQuestions]);
    console.log('✅ Inserted questions');

    console.log('\n🎉 Database seeded successfully!');
    const totalFlashcards = htmlFlashcards.length + cssFlashcards.length + jsFlashcards.length + reactFlashcards.length + nodeFlashcards.length;
    const totalQuestions = htmlQuestions.length + cssQuestions.length + jsQuestions.length + reactQuestions.length + nodeQuestions.length;
    console.log(`📊 Flashcards: ${totalFlashcards} total`);
    console.log(`📝 Questions: ${totalQuestions} total`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

