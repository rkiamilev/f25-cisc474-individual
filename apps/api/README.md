# Russian Language Learning LMS - Backend API

This is a NestJS backend API for a Russian Language Learning Management System.

## Database Tables

The API provides endpoints for the following database tables:
- **Users** - Student and instructor user accounts
- **Articles** - Russian reading materials with difficulty levels
- **Words** - Russian vocabulary with translations and definitions

## API Endpoints

### Users
- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID

### Articles  
- `GET /articles` - Get all articles
- `GET /articles/:id` - Get article by ID

### Words
- `GET /words` - Get all words
- `GET /words/:id` - Get word by ID

## Getting Started

First, run the development server:

```bash
pnpm run dev
```

By default, your server will run at [http://localhost:3000](http://localhost:3000). You can use your favorite API platform like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) to test your APIs

You can start editing the demo **APIs** by modifying [linksService](./src/links/links.service.ts) provider.

### ⚠️ Note about build

If you plan to only build this app. Please make sure you've built the packages first.

## Learn More

To learn more about NestJs, take a look at the following resources:

- [Official Documentation](https://docs.nestjs.com) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [Official NestJS Courses](https://courses.nestjs.com) - Learn everything you need to master NestJS and tackle modern backend applications at any scale.
- [GitHub Repo](https://github.com/nestjs/nest)
