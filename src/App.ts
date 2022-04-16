import Express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

function bootstrap() {
    const app = Express();

    app.use(cors());
    app.use(morgan('combined'));
    app.use(helmet());

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    });

    app.use(limiter);

    app.use(cookieParser());
    app.use(session({
        secret: `${process.env.SESSION_SECRET}`,
    }))

    app.use(Express.json({
        limit: '50mb'
    }));

    app.listen(`${process.env.token}`, () => {
        console.log('Server is running on port 3000');
    });
}

bootstrap();