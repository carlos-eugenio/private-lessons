const fs = require('fs')
const express = require('express')
const routes = express.Router()

const data = require('./data.json')
const { age, date, graduation } = require('./utils')

routes.get('/', function(req, res) {
    return res.redirect('/teachers')
})

// ---- TEACHERS ----
routes.get('/teachers', function(req, res) {
    return res.render('teachers/index', { teachers: data.teachers })
})

routes.get('/teachers/create', function(req, res) {
    return res.render("teachers/create")
})

routes.get('/teachers/:id', function(req, res) {
    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("teacher not found!")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        education: graduation(foundTeacher.education),    
        created_at: date(foundTeacher.birth).dateBr
        // Função intl.datetimeformat não está funcionando
        // Quando chamada pega a data atual e mostra no formato en-US
        //created_at: new Intl.DateTimeFormat("pt-BR").format(foundteacher.created_at),
    }

    return res.render("teachers/show", { teacher })
})

routes.get('/teachers/:id/edit', function(req, res) {
    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher, 
        birth: date(foundTeacher.birth).iso
    }

    return res.render('teachers/edit', { teacher })
})

routes.post('/teachers', function(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == ""){
            return res.send('Please, fill in all fields!')
        }    
    }

    let { avatar_url, birth, name, services, education, skills } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)
    skills = skills.split(",")

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        education,
        services,
        skills,
        created_at
    })

    //objeto.metodoescrevearquivo"arquivo.txt", JSON.stringify(dados do post), função-de-callback(){})
    //Tem algum conflito na função fs.writeFile
    //So grava o arquivo se for em algum formato que não seja .json ou .js
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err){
        if (err) {
            return res.send('Error writing file!')
        }
        return res.redirect('/teachers')
    })

})

routes.put('/teachers', function(req,res) {
    const { id } = req.body
    let index = 0
    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if (id == teacher.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err){
        if (err)  return res.send('Write error!')

        return res.redirect(`/teachers/${id}`)
    })
})

routes.delete('/teachers', function(req, res) {
    const { id } = req.body
    const filteredTeachers = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    //objeto.metodoescrevearquivo"arquivo.txt", JSON.stringify(dados do post), função-de-callback(){})
    //Tem algum conflito na função fs.writeFile
    //So grava o arquivo se for em algum formato que não seja .json ou .js
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err){
        if (err) {
            return res.send('Error writing file!')
        }
        return res.redirect('/teachers')
    })
})    


// ---- STUDENTS ----
routes.get('/students', function(req, res) {
    return res.render('students/index', { students: data.students })
})

routes.get('/students/create', function(req, res) {
    return res.render("students/create")
})

routes.get('/students/:id', function(req, res) {
    const { id } = req.params
    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send("student not found!")

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        education: graduation(foundStudent.education),    
        created_at: date(foundStudent.birth).dateBr
        // Função intl.datetimeformat não está funcionando
        // Quando chamada pega a data atual e mostra no formato en-US
        //created_at: new Intl.DateTimeFormat("pt-BR").format(foundteacher.created_at),
    }

    return res.render("students/show", { student })
})

routes.get('/students/:id/edit', function(req, res) {
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
})

routes.post('/students', function(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if(req.body[key] == ""){
            return res.send('Please, fill in all fields!')
        }    
    }

    let { avatar_url, birth, name, services, education, skills } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.students.length + 1)
    skills = skills.split(",")

    data.students.push({
        id,
        avatar_url,
        name,
        birth,
        education,
        services,
        skills,
        created_at
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

})

routes.put('/students', function(req,res) {
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

    data.student[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err){
        if (err)  return res.send('Write error!')

        return res.redirect(`/students/${id}`)
    })
})

routes.delete('/students', function(req, res) {
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
})    

module.exports = routes