Hannah DeFazio
4/24/18

Approach:
I approached this lab in two steps. First, I got the texture to load properly on the image. Then, I messed around with the texture coordinates until the texture appeared on the shape how I wanted it to. 

Image is from: http://www.kinyu-z.net/group/wallpapers-images/

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
creates a list of vertices, texture coordinates, and indices. The texture is created and depending on its size, a mipmap is created or the image is resized. These are placed into their respective buffers. The attribute variables are created.

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



