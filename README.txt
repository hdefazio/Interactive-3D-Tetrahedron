Hannah DeFazio
3/13/18

Approach:
I took this lab in incremental steps. I first started with getting the shape to appear, then I worked on adding the transformations in the order that they appeared in the assignment. After this, I changed the composition, but found that the one that I started with seemed to create the most natural moving effect. 


Keys:
w: +y translation
a: -x translation
s: -y translation
d: +x translation
x: rotation around x axis
y: rotation around y axis
z: rotation around z axis
j: x scale
k: y scale


composition:
vf = (scaling * translation * xRotation, yRotation, zRotation) * vi

I chose this composition because it behaved closely to how I expected it to. All of the transformations seemed to behave correctly and none of them seemed 'off' with this composition. 


Values:
alpha, beta, and gamma start at 0 and are increased by 0.01. 
tx and ty start at 0 and are increased by 0.03.
sx and sy start at 1 and are increased by 0.01.

Most of these values we have used in previous examples and labs. I found that they are good values to use because they move at the tempo that is excepted for the transformation. I picked the values so the transformation wouldn't be overwhelmingly slow or fast. 


Implementation:

function initGL:
sets up the variables and calls the setUpTetrahedron and render functions.

function setUpTetrahedron:
creates a list of vertices, vertex colors, and indices. These are placed into their respective buffers. The attribute variables are created.

function keyPress(event):
determines what function to called based on what key was pressed.

functions XRot, YRot, ZRot:
increases the angle variables, sets up the transformation matrix, and updates the uniform variable

function transl:
changes the value of tx and ty, depending on what key is pressed, sets up the translation matrix, and updates the uniform variable

function scale:
changes the value of sx an sy, depending on what key is pressed, sets up the scaling matrix, and updates the uniform variable

function render:
clears the COLOR_BUFFER_BIT and DEPTH_BUFFER_BIT and draws the shape



