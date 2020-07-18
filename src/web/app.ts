import * as path        from 'path';
import * as express     from 'express';
import * as logger      from 'morgan';
import * as bodyParser  from 'body-parser';
import * as cors        from 'cors';
import { Model }        from 'objection';
import * as compression from 'compression';
import * as helmet      from 'helmet';
// import * as dotenv      from 'dotenv';
import * as cron        from 'node-cron';
import * as esm         from 'express-status-monitor';

const connection = require('../Objection');

// import { HttpFlush }    from './middleware/HttpFlush';

// import customValidator  from './middleware/Validator.middleware';

// // Validators
// import { UserObject } from './validators/User.validator';

// // Controllers
import userController   from '../controllers/User.controller';
import movieController  from '../controllers/Movie.controller';



// Swagger
import swaggerJSDoc = require('swagger-jsdoc');
import swaggerUi    = require('swagger-ui-express');

const swaggerDefinition = {
    info: {
        title       : 'Job portal Api ',
        version     : '1.0.0',
        description : 'Api documentation for waqt nepal application. Created by puzansakya@gmail. ApiKey: $2y$10$DZuUfJ27NZ82CKGSZvTHyuCckTkla/58K28D.oXoYwHEbcS8IC4VG',
    },
    basePath    : '/',
};

const options = {
    swaggerDefinition,
    apis        : [path.join(__dirname, '..//swagger/*.js')],
    components  : {
        securitySchemes : {
            bearerAuth  : {
                type        : "http",
                scheme      : "bearer",
                bearerFormat: "JWT"
            },            
            apiKey:{
                type        : "apiKey",
                name        : "api_key",
                in          : "header",
                description : "Requests should pass an api_key header."
            }
        }
    }
};

const swaggerSpec = swaggerJSDoc(options);

class App {

    // private httpFlush   : HttpFlush;
    public express      : express.Application;

    constructor() {        

        Model.knex(connection);
        // this.httpFlush  = new HttpFlush();
        this.express    = express();

        // dotenv.config();
        this.middlewares();
        this.routes();

        // uncomment to run scheduler
        // initialize cron jobs
        // cron.schedule("0 * * * * *", () => {
        //     invoiceController.generateInvoice();
        // })

    }

    private middlewares(): void {

        this.express.use(esm());
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cors());
        this.express.use(compression());
        this.express.use(helmet());            

        // this.express.set('view engine', 'html');        
        // this.express.set('views', path.join(DIST_FOLDER, 'browser'));


    }

    /**
     * Define all the controller routes here
     * Order does matter
     */
    private routes(): void {
        let router = express.Router();
        
        this.express.get('*.*', express.static(path.join(__dirname, '../uploads'),{ maxAge: 31557600000 }));
        this.express.get('*.*', express.static(path.join(__dirname, '../../client-web-dist')));
           
        this.express.get('/',  (req, res) => {
            res.status(200).json({
                "health":"good"
            })
            
            // res.sendFile(path.join(__dirname, '../../client-web-dist', 'index.html'))
        });

        /**
         * swagger
         */
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        // Serve swagger docs the way you like (Recommendation: swagger-tools)
        this.express.get('/api-docs.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(swaggerSpec);
        });

        this.express.get('/api-docs', swaggerUi.serve);

        // this.express.use('/api/v1/user'     , customValidator.validate(UserObject), userController);               
        this.express.use('/api/v1/users'    , userController);
        this.express.use('/api/v1/movies'   , movieController);


        // /**
        // * universal redirect should be at last
        // */
        // this.express.get('/*', (req, res) => {
        //     res.render(path.join('index.html'), { req });
        // });
        
        // this.express.use(this.httpFlush.notFound);
        // this.express.use(this.httpFlush.globalSystemErrorHandler);

    }

}

export default new App().express;