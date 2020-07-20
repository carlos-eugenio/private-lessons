const fs = require('fs')
const express = require('express')
const routes = express.Router()

const data = require('./data.json')
const { age, date, graduation } = require('./utils')

routes.get('/', function(req, res) {
    return res.redirect('/teachers')
})

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

routes.get('/students', function(req, res) {
    return res.send('students')
})

module.exports = routes