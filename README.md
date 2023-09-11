# Gigl

![Gigl Logo](Your-Logo-Image-Link-Here) <!-- Replace with your logo URL -->

**Gigl** is a dedicated platform for humor and positivity, designed to escape the negativity often found on other social media platforms. Gigl offers a space where both professional comedians and general users can share jokes, funny content, and spread laughter.

## Overview

- **Positive Platform:** Gigl is all about spreading joy and positivity through humor.
- **Inclusivity:** We welcome both professional comedians and everyday humorists.
- **User Engagement:** Jokes receiving the most laughs or views gain more visibility.
- **Safety & Moderation:** We ensure a respectful environment through AI-powered content moderation.
- **Personalized Experience:** Tailor-made content based on user humor preferences.
- **User Authentication:** User data is securely stored, and jokes are authenticated to maintain authenticity.

## Technologies Used

- **Frontend:** React.js
- **Backend:** .NET Core
- **Database:** Entity Framework Core with SQL Server
- **Authentication:** JWT (JSON Web Tokens)
- **AI Moderation:** (Your AI service or library)
- **Deployment:** Azure (or your deployment platform)

## Backend Endpoints

### Account Controller
- `POST` - CreateComedian: Register as a comedian.
- `GET` - ShowProfile: View your comedian profile.
- `GET` - IdentifySignedInUser: Identify signed-in users.

### Joke Controller
- `GET` - ListJokeTypes: Retrieve joke categories.
- `POST` - MakeAJoke: Share your humor with the community.
- `GET` - ListJokesBasedByCategory: Explore jokes by category.
- `POST` - LikeAJoke: Express appreciation for a joke.
- `POST` - IsAJokeGigledByUser: Verify if a joke has been liked by you.
- `GET` - ListGigledJokes: Retrieve jokes that a user (identified by token) has liked.
- `GET` - ShowUsersJokes: Showcase your contributed jokes.

## Frontend Features

### Pages

#### Create Page
![Create Page](YOUR-IMAGE-LINK-HERE)
Easily create and share your humor. Responsive design for all screens.

#### Feed Page
![Feed Page](YOUR-IMAGE-LINK-HERE)
Explore a feed of jokes and filter by categories.

#### Gigled Page
![Gigled Page](YOUR-IMAGE-LINK-HERE)
Review your liked jokes - your personal collection of laughter.

#### Profile Page
![Profile Page](YOUR-IMAGE-LINK-HERE)
Share your humor with a profile that highlights your contributions.

### Components

#### Join Modal
![Join Modal](YOUR-IMAGE-LINK-HERE)
A friendly invitation to join our community and spread laughter.

## User Authentication and Security

- **Secure User Data:** User information is safely stored using industry-standard encryption methods.
- **Local Storage:** User tokens are stored in the browser's local storage for a seamless experience.
- **Maintaining Authenticity:** Jokes are authenticated to ensure the genuine humor of our community.
- **Account Recovery:** Lost access to an account is designed to be unrecoverable, enhancing joke authenticity and user trust.

## Entity Models

### Comedian Entity

The `Comedian` entity represents a user on Gigl who shares their humor with the community.

- **Id**: A unique identifier for each comedian.
- **Username**: The username of the comedian.
- **ProfileImage**: URL of the comedian's profile image.
- **Jokes**: A list of jokes shared by the comedian.
- **LikedJokes**: A list of jokes liked by the comedian.
- **DateJoined**: The date when the comedian joined Gigl.

### Joke Entity

The `Joke` entity represents a humorous content shared on Gigl.

- **Id**: A unique identifier for each joke.
- **ComedianId**: The ID of the comedian who posted the joke.
- **Comedian**: Navigation property to the comedian who posted the joke.
- **ComedianUsername**: The username of the comedian who posted the joke.
- **Date**: The date when the joke was posted.
- **Title**: The title of the joke.
- **Content**: The content of the joke.
- **Gigls**: The number of laughs (gigls) received by the joke.
- **ComediansThatGigled**: A list of comedians who liked the joke.
- **Category**: The category or type of the joke.

### ComedianJoke Entity

The `ComedianJoke` entity establishes a many-to-many relationship between comedians and jokes. It represents the relationship between a comedian and a joke.

- **ComedianId**: The ID of the comedian.
- **Comedian**: Navigation property to the comedian.
- **JokeId**: The ID of the joke.
- **Joke**: Navigation property to the joke.

These entities help organize and manage the data within Gigl, allowing for the creation, sharing, liking, and personalized presentation of humorous content.
