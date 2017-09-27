# how to use

docker run -v /c/your/path/to/this/repo/343-project/project:/usr/src/project -p 80:8080 -it --name 343 343docker/express


If you're on Linux, just run the dev.sh

ALSO (if you are on Linux AND using ESLint), 

in ./project/.eslintrc.js delete this line:

        "linebreak-style": ["error", "windows"]
