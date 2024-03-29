# Lyrics Search

This project allows you to search for any song you want. Then you can visit the song's page to see the lyrics. And it's built with React.js, Redux-Toolkit, RTK-Query, SCSS, and Framer-Motion.
<br />
<a href="https://songs-search.vercel.app/">Check it out :)<a/>
<br />
<br />
<br />
<br />


## Features

- Search any song you want and get its information.
- See whether each song has lyrics or explicit words.
- See detailed information about each song on its page.
- Read each song's lyrics.
<br />
<br />
<br />
<br />


## How To Use It

When you first open the project, you'll see a warning pop-up. It tells you how you can use the project and what should you do if you're in a sanctioned country. 
<br />
<br />
After that, there is a search bar where you can enter the name of the song you want. 
<br />
Then based on what you searched you'll see the some songs' boxes.
<br />
There are two signs in song's box. 
<br />
One of them is the L sign. It means that the song has lyrics. 
<br />
The other one is E sign which means the song has swear words. 
<br />
<br />
By clicking on the box you can enter to song page. In the song page we've got the signs, the back home button, title, artists, album, genres, lyrics, and Musixmatch Link (that's because we get all of data from their API). 
<br />
If you want to see the lyrics, all you have to do is to click on Song Lyrics box. Then the box will expand and you'll see the lyrics. 
<br />
By the way we can only see some of the lyrics not all of it because the API is not for commercial use.
<br />
<br />
<br />
<br />


## How It Works
This project uses Musixmatch's API to get information about songs and to search for them. 
<br />
And it uses RTK-Query to fetch the data. It has a redux slice to store searched text. Also, it has an API slice to fetch the data, which has 3 endpoints named getSearchTracks, getLyrics, and getTrack. 
<br />
<br />
RTK-Query creates a custom hook for each endpoint and put the keyword 'use' in the first of them. 
<br />
Then we can use the custom hook that RTK-Query created to get what we want. 
<br />
I used the useGetTrack and useGetSearch hooks in the song page to get song information and song lyrics. And I used useGetSearchTracks to search the song. 
<br />
The first hook will give us an array of songs that match what the user has searched for. 
<br />
In that array, we have almost every piece of information that we need about a song. 
<br />
So you may ask why I use another API call to get song data in song page. 
<br />
I could've just passed the data to the song page with props or with routes. 
<br />
(we can use 'state' attributes in the react-router-dom Link property to pass information between routes)
<br />
<br />
The reason why I didn't do that is that if a user hypothetically searches a song and goes to the song's page and saves the song's page URL, and tries to enter it later, it won't work because it doesn't have the passed data. 
<br />
Because no one searched anything before and in that way we have no data to pass onto the song page. 
<br />
In the short term, we'll get an error. 
<br />
So I use a new API call just to get specific song data to show on the song page. 
<br />
Then I thought this isn't efficient because most of the time the user searches for something and then goes to the song page, but every time we get the data from the API when we can simply pass it. 
<br />
So I used them both. When the user has searched for something and we have the data we pass it to the song page and it will not use the hook to fetch the data from the API. And when the user hasn't searched for anything and just entered the URL, we'll use the useGetSong hook to fetch the data and show them.
<br />
<br />
<br />
<br />


## The Story Behind It

To fetch the data, I didn't want to use some ordanairy way to get the data from the API like Axios or Pure JavaScript. 
<br />
I wanted to use something new, and since I was learning Redux and Redux-Toolkit, I decided to use RTK-Query in this project in order to both learn and test it. 
<br />
It took me about a month to learn how to use RTK-Query the way I wanted to. 
<br />
I was almost giving up, but constantly searching did save me. 
<br />
For styling, I wanted to use something new for me and also popular. I chose SCSS. 
<br />
Also, I used BEM for class naming. 
<br />
It was fun (it was hell). 
<br />
I really liked it (i'm never gonna use it again).