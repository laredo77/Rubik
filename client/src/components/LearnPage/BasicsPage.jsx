import React from 'react';

function BasicsPage() {
    return (
        <div style={containerStyle}>
            <h1>Terminology</h1>

            <section>
                <h2>Cell</h2>
                <p>
                    One of the 54 colored squares that make up a Rubik’s cube. There are a total of nine cells per
                    color.
                </p>
            </section>

            <section>
                <h2>Face</h2>
                <p>
                    A cube has six faces where each face is made up of 3x3 cells. These faces are known as “Front”,
                    “Top”, “Back”, “Down”, “Left”, and “Right”.
                </p>
            </section>

            <section>
                <h2>Piece</h2>
                <p>
                    One of the components of the Rubik’s cube itself. The 3x3x3 Rubik’s cube has 26 pieces.
                </p>
            </section>

            <section>
                <h2>Center</h2>
                <p>
                    The piece that holds the middle cell of each face. This is the piece that determines the color of a
                    face.
                </p>
            </section>

            <section>
                <h2>State</h2>
                <p>
                    Refers to the colors each cell has across each face at a given point in time.
                </p>
            </section>

            <section>
                <h2>Notation</h2>
                <p>
                    The notation used to describe cube permutations in this report is listed below in the table.
                </p>

                <table style={tableStyle}>
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
                        <td><img src="/cube-basics/F.png" alt="F" style={imageStyle}/></td>
                    </tr>
                    <tr>
                        <td>F'</td>
                        <td>Front face counterclockwise 90 degrees</td>
                        <td><img src="/cube-basics/F'.png" alt="F'" style={imageStyle}/></td>
                    </tr>
                    <tr>
                        <td>B</td>
                        <td>Back face clockwise 90 degrees</td>
                        <td><img src="/cube-basics/B.png" alt="B" style={imageStyle}/></td>
                    </tr>
                    <tr>
                        <td>B'</td>
                        <td>Back face counterclockwise 90 degrees</td>
                        <td><img src="/cube-basics/B'.png" alt="B'" style={imageStyle}/></td>
                    </tr>
                    <tr>
                        <td>U</td>
                        <td>Top face clockwise 90 degrees</td>
                        <td><img src="/cube-basics/U.png" alt="U" style={imageStyle}/></td>
                    </tr>
                    <tr>
                        <td>U'</td>
                        <td>Top face counterclockwise 90 degrees</td>
                        <td><img src="/cube-basics/U'.png" alt="U'" style={imageStyle}/></td>
                    </tr>
                    <tr>
                        <td>D</td>
                        <td>Down face clockwise 90 degrees</td>
                        <td><img src="/cube-basics/D.png" alt="D" style={imageStyle}/></td>
                    </tr>
                    <tr>
                        <td>D'</td>
                        <td>Down face counterclockwise 90 degrees</td>
                        <td><img src="/cube-basics/D'.png" alt="D'" style={imageStyle}/></td>
                    </tr>
                    <tr>
                        <td>L</td>
                        <td>Left face clockwise 90 degrees</td>
                        <td><img src="/cube-basics/L.png" alt="L" style={imageStyle}/></td>
                    </tr>
                    <tr>
                        <td>L'</td>
                        <td>Left face counterclockwise 90 degrees</td>
                        <td><img src="/cube-basics/L'.png" alt="L'" style={imageStyle}/></td>
                    </tr>
                    <tr>
                        <td>R</td>
                        <td>Right face clockwise 90 degrees</td>
                        <td><img src="/cube-basics/R.png" alt="R" style={imageStyle}/></td>
                    </tr>
                    <tr>
                        <td>R'</td>
                        <td>Right face counterclockwise 90 degrees</td>
                        <td><img src="/cube-basics/R'.png" alt="R'" style={imageStyle}/></td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}

const containerStyle = {
    height: '720px',
    margin: '0 auto',
    width: '90%',
    overflow: 'auto'
};

const tableStyle = {
    marginTop: '20px',
    borderCollapse: 'collapse'
};

const imageStyle = {
    width: '70px',
    height: '70px'
};

export default BasicsPage;
