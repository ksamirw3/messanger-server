# messenger-server

-- Manual install

git clone git@github.com:ksamirw3/messanger-server.git

cd to "messanger-server" path

run the following commands

npm install

node server.js

-- Docker install

git clone git@github.com:ksamirw3/messanger-server.git

cd to "messanger-server" path

run the following commands

docker build -t messenger/server .

docker run -p 3000:3000 -d -it messenger/server

open browser and type the following to make sure server is running

http://localhost:3000/
