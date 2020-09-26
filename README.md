# Reddit-Inertia
<table>
<tr>
<td>
  A web app for a custom reddit dashboard using the new features from Laravel v8.0, which uses the InertiaJS framework to render components instead of traditional html templates. This is more of a learning/experimental project to try out their Single-Page App approach with React instead of Vue, also Jest & PHPUnit for testing, and Docker as a container. 
</td>
</tr>
</table>


## Site

### Dashboard
The user's dashboard shows the subreddits they are following (and friends), which they can browse posts from and archive them for later use. 

![](/public/dashboard.png?raw=true)


Users can also open up browse panel to add popular subreddits to their profile, as well as search for new ones. 

![](/public/browse.png?raw=true)


The search will verify if the subreddit exists and return a success or error alert.

![](/public/search.png?raw=true)


### Profile
Here the user can view and remove their archived posts.

![](public/Profile.png?raw=true)


### Subreddits Index
Livewire Component that shows top 100 subreddits and can retrieve more from Reddit API.

![](public/Top100.png?raw=true)


## Docker Instructions
- docker-compose build
- docker-compose up -d
- docker-compose exec app composer install
- docker-compose exec app php artisan key:generate
- docker-compose exec app php artisan migrate --seed
- docker-compose run --rm npm install
- docker-compose run --rm npm run dev
- Go to (http://localhost:8000/) to register & login


## Mobile support
This app uses a responsive grid to cater to different devices & sizes. 


## Built with 
- [Laravel](https://laravel.com/) v8.0.0
- [React](https://reactjs.org/) v16.2.0
- [Redux](https://redux.js.org/) v4.0.5
- [MySQL](https://www.mysql.com/) v5.7.24
- [Inertia](http://inertiajs.com/) v0.1.7
- [Chakra-UI](https://chakra-ui.com/) v0.8.0
- [Docker](https://docker.com/) v19.03.01


## Testing
- PHPUnit through Laravel 
- Jest for React Components

- docker-compose exec app php artisan test
- docker-compose run --rm npm run jtest


## Contact
Created by Ryan Hsin - please feel free to contact me!
