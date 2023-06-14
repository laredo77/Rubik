# Rubik
A network application for playing virtual and physical rubik cube.

### Description
The Rubik's cube, invented in 1974, has been a widely enjoyed game across the world. We've developed an app where you can engage with a virtual version of this iconic Hungarian cube - allowing you to play, learn, and practice.
An additional feature in our app is the Mosaic mode. As we know, an image is composed of numerous pixels arranged together. Likewise, you can create art using multiple Rubik's cubes side by side. Within the Mosaic mode, you can choose a picture and follow the guided steps using physical cubes. The result is an impressive and vivid image composed entirely of Rubik's cubes.
Furthermore, you can test your speed and strategic skills in our competitive mode. Here, you'll face off against the clock and other online players. You can even challenge a friend or opponent in a 1vs1 live match. It's all the fun of traditional Rubik's cube puzzling, amplified and made more accessible.

### Installation

### Usage
The application offers multiple modes of play:

>* FreePlay:
In Freeplay mode, you, as the player, can focus on honing your skills. You can interact with a virtual Rubik's cube within the app, manipulate the pieces, receive assistance from the system, and verify your solution.
There are three levels of difficulty: easy, medium, and hard. Each level presents a unique Rubik's cube challenge, enabling you to enhance your capabilities and tackle increasingly complex puzzles.

>* Mosaic:
In this game mode, the player creates an artistic image using several Rubik's cubes. Players can choose to play solo, join a game with other participants, or initiate a new game. When a game is created, the creator's details and the chosen stage are stored in the database. Anyone wishing to join the game will need to provide the game ID and password, which are cross-referenced with the stored data in the database.
This mode utilizes real Rubik's cubes. Players receive an image, select a cube to solve, and mark it as solved once completed. If the player encounters difficulty solving the cube, they can upload images of their physical Rubik's cube to the system. The system, using machine learning and computer vision technology, will provide steps to reach the desired state.
When multiple players are on the same stage, the system ensures all actions run in parallel and are synchronized. If one player completes a cube, the system updates this information for all other players. There's no limit to the number of players in this mode.

>* Competition:
In this mode, players compete against each other within the app. Upon logging in, players first select the stage they wish to play. The difficulty rises with each level, depending on the number of times the app shuffles the cube.
During the game, players race against the clock to solve the Rubik's cube as quickly as possible. The points a player earns are based on the chosen stage and the time taken to solve the cube.
At the end of the game, the player's points are saved in the database and added to the leaderboard, which displays the top-ranking players.

>* Match:\n
In this game mode, two players face each other in a live match. The initiator of the game receives a game number and password from the system. The second player can join the game using these credentials.
Both players' Rubik's cubes are scrambled in an identical manner, ensuring they both start from the same position.
Each player's screen is split into two: on the right, they see their own cube, and on the left, they can view their opponent's cube. As the player tries to solve their cube, they can simultaneously observe their opponent's cube and the moves they choose to make.
All game information is synced in real time with the server. Each player's moves are saved and displayed to their opponent, fostering a truly immersive competitive environment.
