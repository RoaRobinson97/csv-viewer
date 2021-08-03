const assert = require('assert');
var indexRouter = require("./routes/files");
var testArgs = ['marks.csv', 'courses.csv', 'students.csv', 'tests.csv']

var expected = {"students":[{"id":"1","name":"A","totalAverage":72.03,"courses":[{"id":"1","name":"Biology","teacher":"Mr. D","courseAverage":90.1},{"id":"2","name":"History","teacher":" Mrs. P","courseAverage":51.8},{"id":"3","name":"Math","teacher":" Mrs. C","courseAverage":74.2}]},{"id":"2","name":"B","totalAverage":62.15,"courses":[{"id":"1","name":"Biology","teacher":"Mr. D","courseAverage":50.1},{"id":"3","name":"Math","teacher":" Mrs. C","courseAverage":74.2}]},{"id":"3","name":"C","totalAverage":72.03,"courses":[{"id":"1","name":"Biology","teacher":"Mr. D","courseAverage":90.1},{"id":"2","name":"History","teacher":" Mrs. P","courseAverage":51.8},{"id":"3","name":"Math","teacher":" Mrs. C","courseAverage":74.2}]}]}

function asyncFile() {

    var promise = new Promise(function(resolve, reject) {
        setTimeout(function () {
            resolve(indexRouter.readFile(0, './tests_files/',testArgs, true));
        },1200);
      });
      return promise;
}

describe('Testing file handling', () => {
 it('Should return a json equal to expected', () => {
    asyncFile().then(function() {
        setTimeout(function () {     
        assert.strictEqual(JSON.stringify(indexRouter.getStudents()),JSON.stringify(expected))
    },1200);

        // --> 'done!'
      });
    })
});

