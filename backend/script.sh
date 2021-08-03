#!/bin/bash
echo "
Installing necessary packages...
"

echo "
Installing Express:"
npm install express

echo "
Installing Cookie-Parser:"
npm install cookie-parser

echo "
Installing Logger (Morgan):"
npm install morgan

echo "
Installing Cors:"
npm install cors

echo "
Installing Csv-Parser:"
npm install csv-parser

echo "
Installing Path ( You should have path installed right?(¬_¬ ) ):"
npm install path

echo "
Installing Mocha ( For testing! ):"
npm install mocha

echo "
No you can run the program!

A few instructions!!!

1. You need to drop the cvs files in the cvs_files folder before run it!
2. The generated json will be in the outputs folder.
3. For testing you only need to type \"npm test\"
3. You can make an api call to http://localhost:8000/ .I tested wit axios
in react and is working good.

NOTE: I know it seems that I take a long time to do this. 
But I didn't worked on this all the time. I was busy with 
other tasks. I know the docs says the time is not so important,
but I wanted to clarify.

Robin"

