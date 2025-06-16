import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

app.use('/api/quizzes-topics', (req, res) => {
  res.json([
    { id: 'aws', name: 'AWS' },
    { id: 'js', name: 'JavaScript' },
    { id: 'ng', name: 'Angular' },
  ]);
});

app.use('/api/quizzes', (req, res) => {
  res.json({
    js: [
      {
        id: 1,
        question: "What does the `esModuleInterop` option in tsconfig enable?",
        choices: [
          { id: "a", text: "Default import syntax from CommonJS modules", isCorrect: true },
          { id: "b", text: "Support for ES6 modules in Node.js", isCorrect: false },
          { id: "c", text: "Stricter type checking for external packages", isCorrect: false },
          { id: "d", text: "Enables top-level await in all files", isCorrect: false }
        ],
        selectMultiple: false,
        level: "Beginner"
      },
      {
        id: 2,
        question: "Which of the following are valid use cases for a callback in Node.js?",
        choices: [
          { id: "a", text: "Handling asynchronous operations", isCorrect: true },
          { id: "b", text: "Declaring global constants", isCorrect: false },
          { id: "c", text: "Responding to HTTP requests", isCorrect: true },
          { id: "d", text: "Defining interfaces", isCorrect: false }
        ],
        selectMultiple: true,
        level: "Beginner"
      },
      {
        id: 3,
        question: "In CORS, what does setting `origin: '*'` do?",
        choices: [
          { id: "a", text: "Allows all origins to access the resource", isCorrect: true },
          { id: "b", text: "Blocks all CORS requests", isCorrect: false },
          { id: "c", text: "Restricts access to same-origin only", isCorrect: false },
          { id: "d", text: "Allows only GET requests", isCorrect: false }
        ],
        selectMultiple: false,
        level: "Beginner"
      },
      {
        id: 4,
        question: "Which TypeScript compiler options improve type safety?",
        choices: [
          { id: "a", text: "`strict`", isCorrect: true },
          { id: "b", text: "`noImplicitAny`", isCorrect: true },
          { id: "c", text: "`allowJs`", isCorrect: false },
          { id: "d", text: "`forceConsistentCasingInFileNames`", isCorrect: true }
        ],
        selectMultiple: true,
        level: "Beginner"
      }
    ],
    aws: [
      {
        id: 1,
        question: "Which AWS service is primarily used for object storage?",
        choices: [
          { id: "a", text: "Amazon S3", isCorrect: true },
          { id: "b", text: "Amazon EC2", isCorrect: false },
          { id: "c", text: "Amazon RDS", isCorrect: false },
          { id: "d", text: "Amazon VPC", isCorrect: false }
        ],
        selectMultiple: false,
        level: "Beginner"
      },
      {
        id: 2,
        question: "Which of the following are serverless compute services in AWS?",
        choices: [
          { id: "a", text: "AWS Lambda", isCorrect: true },
          { id: "b", text: "Amazon EC2", isCorrect: false },
          { id: "c", text: "AWS Fargate", isCorrect: true },
          { id: "d", text: "Amazon Lightsail", isCorrect: false }
        ],
        selectMultiple: true,
        level: "Beginner"
      }
    ]
    ,
    ng: [
      {
        id: 1,
        question: "What is a key feature of Angular's change detection?",
        choices: [
          { id: "a", text: "Zone.js-based automatic detection", isCorrect: true },
          { id: "b", text: "Manual DOM polling", isCorrect: false },
          { id: "c", text: "Server-side rendering only", isCorrect: false },
          { id: "d", text: "No change detection mechanism", isCorrect: false }
        ],
        selectMultiple: false,
        level: "Beginner"
      },
      {
        id: 2,
        question: "Which decorator is used to define a component in Angular?",
        choices: [
          { id: "a", text: "@NgModule", isCorrect: false },
          { id: "b", text: "@Injectable", isCorrect: false },
          { id: "c", text: "@Component", isCorrect: true },
          { id: "d", text: "@Directive", isCorrect: false }
        ],
        selectMultiple: false,
        level: "Beginner"
      }
    ]

  });
});


/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
