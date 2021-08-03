var express = require('express');
var router = express.Router();

const csv = require('csv-parser');
const fs = require('fs');
const { setupMaster } = require('cluster');

var errorType = {}
var students = {}

var csvData = {
    'courses':[],
    'marks': [],
    'students': [],
    'tests': []
};

function getStudents(){
    return students
}


function HandleData(testing){
    
    csvData['students'].forEach(element => {
        element['totalAverage'] = 0
        element['courses'] = []

        var studenMarks = csvData['marks'].filter(function(i) {
            return i['student_id'] == element.id;
        });

        var testMarks = csvData['tests'].filter(function(i) {
        if(studenMarks.map(function (el) { return el['test_id']; }).includes(i['id'])){
            return i
        }
        });


        var studentsCourses = csvData['courses'].filter(function(i) {
            if(testMarks.map(function (el) { return el['course_id']; }).includes(i['id'])){
                return i
            }
        });

        studentsCourses.forEach(mat => {
            element['courses'].push({
                id: mat.id,
                name: mat.name,
                teacher: mat.teacher,
                courseAverage: 0
            })
        });
        element['courses'].forEach(course => {
            var coursesTests = csvData['tests'].filter(function(i) {
                return  (i['course_id'] == course.id) 
            });
            var weight = 0
            coursesTests.forEach(test => {
                weight = weight + parseInt(test.weight)
                var rate = studenMarks.find(a => a.test_id==test.id)
                try {
                    course.courseAverage =  course.courseAverage + rate.mark*(test.weight/100)
                } catch (error) {
                    errorType = {"error": "Invalid course weights"}
                }

                course.courseAverage = Math.round((course.courseAverage + Number.EPSILON) * 100) / 100;
            });

            if (weight != 100 ){
                console.log('Error')
            }else{
            }
        });

        element['courses'].forEach(mat => {
            element.totalAverage = mat.courseAverage + element.totalAverage
        });

        element.totalAverage =element.totalAverage/element['courses'].length
        element.totalAverage = Math.round((element.totalAverage + Number.EPSILON) * 100) / 100;

    });
    students = { students: csvData['students'] }

    if(testing == false){

    if (errorType != {}){
        fs.writeFileSync('./outputs/output.json', JSON.stringify(students));
    }else{
        fs.writeFileSync('./outputs/output.json', JSON.stringify(errorType));
    }
    }

    return students


}

function readFile(i, route, myArgs,testing){
    try {
        tmpData = []
        fs.createReadStream(route+myArgs[i])
        .on('error', (err) => {
            console.log(err)
            errorType = {"error": err}
        })
        .pipe(csv())
        .on('data', (row) => {
            tmpData.push((row))
        })
        
        .on('end', () => {
        csvData[myArgs[i].slice(0, -4)] = tmpData
        if(myArgs[i+1]){
            readFile(i+1, route, myArgs,testing)
        }else{
            HandleData(testing)
        }
        })

      } catch (error) {
        errorType = {"error": error}
      }

      return students

}

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (errorType != {}){
        res.send(students);
    }else{
        res.send(errorType)
    }
});

module.exports = {router, readFile, getStudents};