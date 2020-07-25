const fs = require('fs')
const data = require('../data.json')
const { age, date, school } = require('../utils')


// ---- STUDENTS ----
exports.index = function(req, res) {
    const foundStudents = data.students
    const gradeStudents = []
    for (const students of foundStudents) {
        gradeStudents.push({
            ...students,
            grade: school(students.grade)
        })
    }
    return res.render('students/index', { students: gradeStudents })
}

exports.create = function(req, res) {
    return res.render("students/create")
}

exports.show = function(req, res) {
    const { id } = req.params
    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        grade: school(foundStudent.grade)
    }

    return res.render("students/show", { student })
}

exports.edit = function(req, res) {
    const { id } = req.params
    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent, 
        birth: date(foundStudent.birth).iso
    }

    return res.render('students/edit', { student })
}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == ""){
            return res.send('Please, fill in all fields!')
        }    
    }

    birth = Date.parse(req.body.birth)
    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if(lastStudent) {
        id = lastStudent.id + 1
    }

    data.students.push({
        ...req.body,
        id,
        birth
    })

    //objeto.metodoescrevearquivo"arquivo.txt", JSON.stringify(dados do post), função-de-callback(){})
    //Tem algum conflito na função fs.writeFile
    //So grava o arquivo se for em algum formato que não seja .json ou .js
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err){
        if (err) {
            return res.send('Error writing file!')
        }
        return res.redirect('/students')
    })

}

exports.put = function(req,res) {
    const { id } = req.body
    let index = 0
    const foundStudent = data.students.find(function(student, foundIndex){
        if (id == student.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err){
        if (err)  return res.send('Write error!')

        return res.redirect(`/students/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body
    const filteredStudents = data.students.filter(function(student){
        return student.id != id
    })

    data.students = filteredStudents

    //objeto.metodoescrevearquivo"arquivo.txt", JSON.stringify(dados do post), função-de-callback(){})
    //Tem algum conflito na função fs.writeFile
    //So grava o arquivo se for em algum formato que não seja .json ou .js
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err){
        if (err) {
            return res.send('Error writing file!')
        }
        return res.redirect('/students')
    })
}  