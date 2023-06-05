import React from 'react';

function AlgorithmPage() {
    return (
        <div style={{height: '720px', margin: '0 auto', width: '90%', overflow: 'auto'}}>
            <h1>Rubik's Cube Solving Algorithms</h1>
            <h2>Two-Phase Algorithm</h2>
            <p>The Two-Phase Algorithm solves the Cube in to steps.

                In phase 1, the algorithm looks for maneuvers which will transform a scrambled cube to G1. That is, the
                orientations of corners and edges have to be constrained and the edges of the UD-slice have to be
                transferred into that slice. In phase 2 we restore the cube.

                There are many different possibilites for maneuvers in phase 1. The algorithm tries different phase 1
                maneuvers to find a most possible short overall solution.</p>
            <h2>Friedrich Method</h2>
            <p>The Friedrich Method is one of the most popular methods for solving the Rubik's Cube. It involves solving
                the cube layer by layer, starting with the cross on the bottom layer, then the corners on the bottom
                layer, followed by the second layer, the top layer edges, and finally the top layer corners. The
                advantages of this method are that it is relatively easy to learn, and it can be quite fast with
                practice. However, it can take a long time to solve the cube, especially for beginners. The time
                complexity of this method is O(n^2).</p>

            <h2>Roux Method</h2>
            <p>The Roux Method is a popular alternative to the Friedrich Method. It involves solving the cube in two
                phases, the first phase involves solving the left and right blocks of the cube, while the second phase
                involves orienting and permuting the remaining pieces of the cube. The advantages of this method are
                that it can be very fast, and it can be more intuitive for some people. However, it can be more
                difficult to learn than the Friedrich Method, and it requires more memorization. The time complexity of
                this method is O(n^2).</p>

            <h2>Zbigniew Method</h2>
            <p>The Zbigniew Method is a newer method for solving the Rubik's Cube. It involves solving the cube using a
                combination of advanced techniques such as block building, commutators, and conjugates. The advantages
                of this method are that it can be very fast, and it can be very efficient for some types of cubes.
                However, it can be very difficult to learn, and it requires a lot of practice and memorization. The time
                complexity of this method is O(n^2).</p>
        </div>
    );
}

export default AlgorithmPage;
