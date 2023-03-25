import React from 'react';

function BasicsPage() {
    return (
        <div>
            <h1>Terminology</h1>
            <p>
                <strong>Cell:</strong> One of 54 colored squares that make up a Rubik’s cube. There are a total of nine
                cells per color.
            </p>
            <p>
                <strong>Face:</strong> A cube has six faces where each face is made up of 3x3 cells. These faces are
                known as “Front”, “Top”, “Back”, “Down”, “Left” and “Right”.
            </p>
            <p>
                <strong>Piece:</strong> One of the components of the Rubik’s cube itself. The 3x3x3 Rubik’s cube has 26
                pieces.
            </p>
            <p>
                <strong>Center:</strong> The piece that holds the middle cell of each face, this is the piece that will
                determine what color a face is.
            </p>
            <p>
                <strong>State:</strong> What colors each cell has across each face at a given point in time.
            </p>
            <p>
                <strong>Notation:</strong> The notation for permuting the cube that will be used in this report is
                described below in the table.
            </p>
            <table>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>F</td>
                    <td>Front face clockwise 90 degrees</td>
                    <td><img src="https://www.rubiks.com/images/detailed/6/F.png?t=1504897406" alt="F"/></td>
                </tr>
                <tr>
                    <td>F'</td>
                    <td>Front face counterclockwise 90 degrees</td>
                    <td><img src="https://www.rubiks.com/images/detailed/6/F-.png?t=1504897406" alt="F'"/></td>
                </tr>
                <tr>
                    <td>B</td>
                    <td>Back face clockwise 90 degrees</td>
                    <td><img src="https://www.rubiks.com/images/detailed/6/B.png?t=1504897406" alt="B"/></td>
                </tr>
                <tr>
                    <td>B'</td>
                    <td>Back face counterclockwise 90 degrees</td>
                    <td><img src="https://www.rubiks.com/images/detailed/6/B-.png?t=1504897406" alt="B'"/></td>
                </tr>
                <tr>
                    <td>U</td>
                    <td>Top face clockwise 90 degrees</td>
                    <td><img src="https://www.rubiks.com/images/detailed/6/U.png?t=1504897406" alt="U"/></td>
                </tr>
                <tr>
                    <td>U'</td>
                    <td>Top face counterclockwise 90 degrees</td>
                    <td><img src="https://www.rubiks.com/images/detailed/6/U-.png?t=1504897406" alt="U'"/></td>
                </tr>
                <tr>
                    <td>D</td>
                    <td>Down face clockwise 90 degrees</td>
                    <td><img src="https://www.rubiks.com/images/detailed/6/D.png?t=1504897406" alt="D"/></td>
                </tr>
                <tr>
                    <td>D'</td>
                    <td>Down face counterclockwise 90 degrees</td>
                    <td><img src="https://www.rubiks.com/images/detailed/6/D-.png?t=1504897406" alt="D'"/></td>
                </tr>
                <tr>
                    <td>L</td>
                    <td>Left face clockwise 90 degrees</td>
                    <td><img src="https://www.rubiks.com/images/detailed/6/L.png?t=1504897406" alt="L"/></td>
                </tr>
                <tr>
                    <td>L'</td>
                    <td>Left face counterclockwise 90 degrees</td>
                    <td><img src="https://www.rubiks.com/images/detailed/6/L-.png?t=1504897406" alt="L'"/></td>
                </tr>
                <tr>
                    <td>R</td>
                    <td>Right face clockwise 90 degrees</td>
                    <td><img src="https://www.rubiks.com/images/detailed/6/R.png?t=1504897406" alt="R"/></td>
                </tr>
                <tr>
                    <td>R'</td>
                    <td>Right face counterclockwise 90 degrees</td>
                    <td><img src="https://www.rubiks.com/images/detailed/6/R-.png?t=1504897406" alt="R'"/></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default BasicsPage;
