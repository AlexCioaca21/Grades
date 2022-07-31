var student = document.getElementById("addStudent");
var sortAsc = document.getElementById("sortAsc");
var sortDesc = document.getElementById("sortDesc");
var studentTable = document.getElementById("studentTable");
var studentDetailsContainer = document.getElementById("studentDetailsContainer");

var students = [];
var selectedStudentId = null;
index = 0 ;


document.getElementById("studentForm").addEventListener('submit',function(e){
    e.preventDefault();
    addStudent();
});

sortDesc.addEventListener("click", sortDescending);
sortAsc.addEventListener("click", sortAscending);


function addStudent(){
    let itemFromForm = student.value;
    if (!(itemFromForm === "")){
        let newStudent = {
            studentId: index++,
            studentName: itemFromForm
        };
        students.push(newStudent);   
    }
    resetInput();
    renderStudentTable();
}

function resetInput(){
    student.value = "";
}

function renderStudentTable(){
    studentTable.innerText = "";
    for (let i=0; i<students.length; i++) {
        addLine(students[i]);
    }
}

function addLine(student){
    var nameCell = document.createElement("td");
    nameCell.innerText = student.studentName;
    nameCell.setAttribute("id", "student-" + student.studentId);

    var averageCell = document.createElement("td");
    averageCell.innerText = studentAvg(student.studentId);
    averageCell.setAttribute("id", "averageForStudent-" + student.studentId);

    var toGradesCell = document.createElement("td");
    toGradesCell.setAttribute("id", "showGrades-" + student.studentId);
    toGradesCell.innerHTML = "<button onClick='studentGrade(" + student.studentId +")' >Vezi/Adauga note</button>";

    var deleteStudentCell = document.createElement("td");
    deleteStudentCell.innerHTML = "<button style='color: red;width: 100%;' onClick='deleteStudent("+ student.studentId +")'>X</button>";

    var row = document.createElement("tr");
    row.appendChild(nameCell);
    row.appendChild(averageCell);
    row.appendChild(toGradesCell);
    row.appendChild(deleteStudentCell);
    studentTable.appendChild(row);
}

function studentGrade(a){
    selectedStudentId = a;
    studentDetailsContainer.classList.remove('hidden');
    showStudentName(a);
}

function sortAscending(){
    students.sort(function(a,b){
        if( studentAvg(a.studentId) <= studentAvg(b.studentId)){
            return -1
        }else{
            return 1;
        }
    });
    renderStudentTable();
}

function sortDescending(){
    students.sort(function(a,b){
        if( studentAvg(a.studentId) >= studentAvg(b.studentId)){
            return -1
        }else{
            return 1;
        }
    });
    renderStudentTable();
}

var grade = document.getElementById("grade");
var gradeDesc = document.getElementById("gradeDesc");
var gradeAsc = document.getElementById("gradeAsc");
var gradeTableBody = document.getElementById("gradesTable");
var studentNamePlaceholder = document.getElementById("studentName");

grades = [];

function hideSudentDetailsContainer(){
    studentDetailsContainer.classList.add('hidden');
    selectedStudentId = null;
}

function showStudentName(id){
    let selectedStudent = getStudentById(id);

    studentNamePlaceholder.innerText = selectedStudent.studentName;
    renderStudentGrades();
}

document.getElementById("addGrade").addEventListener('submit',function(e){
    e.preventDefault();
    addGrade();
});

gradeDesc.addEventListener("click", sortGradesDescending);
gradeAsc.addEventListener("click", sortGradesAscending);

function sortGradesAscending(){
    grades.sort(function(a,b){
        if( a.grade <= b.grade){
            return -1
        }else{
            return 1;
        }
    });
    renderStudentGrades();
}

function sortGradesDescending(){
    grades.sort(function(a,b){
        if( a.grade >= b.grade){
            return -1
        }else{
            return 1;
        }
    });
    renderStudentGrades();
}

function addGrade(){
    let gradeValue = grade.value;
    if (!(gradeValue === "")){
        let newGrade = {
            gradeId: index++,
            studentId: selectedStudentId,
            grade: gradeValue
        };
        grades.push(newGrade);
    }
    resetGradesInput();
    renderStudentGrades();
    renderStudentTable();
}

function resetGradesInput(){
    grade.value = "";
}

function renderStudentGrades(){
    gradeTableBody.innerText = "";
    for (let i=0; i<grades.length; i++) {
        if(grades[i].studentId === selectedStudentId){
            addGradeLine(grades[i]);
        }
    }
}

function addGradeLine(grades) {

    var gradeCell = document.createElement("td");
    gradeCell.innerText = grades.grade;
    gradeCell.setAttribute("id", "grade-" + grades.gradeId);

    var deleteGradeCell = document.createElement("td");
    deleteGradeCell.innerHTML = "<button style='color: red;width: 100%;' onClick='deleteGrade("+ grades.gradeId +")'>X</button>";

    var row = document.createElement("tr");
    row.appendChild(gradeCell);
    row.appendChild(deleteGradeCell);

    gradeTableBody.appendChild(row);
}

function getStudentById(id){
    return students.filter(function(student){ return student.studentId === id})[0];
}
function getStudentGradesById(studentId){
    return grades.filter(function(grade){ return grade.studentId === studentId});
}
function gradeAvg(grades){

    let onlyGrades = grades.map(function(item){ return parseInt(item.grade)});

    let average = onlyGrades.reduce(function(accumulator, currentValue){ return accumulator + currentValue}, 0) / onlyGrades.length;

    return average;

}
function studentAvg(studentId){
    return  gradeAvg(getStudentGradesById(studentId));
}
function deleteGrade(gradeId){
    grades = grades.filter(function(g){return g.gradeId !== gradeId});

    renderStudentGrades();
    renderStudentTable();
}
function deleteStudent(studentId){
students = students.filter(function(stud){ return stud.studentId !== studentId});

renderStudentTable();
hideSudentDetailsContainer();
}