module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()    
    
        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age = age - 1
        }
    
        return age
    },
    date: function(timestamp) {
        //converte o timestamp no objeto date
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            dateBr: `${day}/${month}/${year}`
        }
    },
    graduation: function(education){
        switch (education) {
            case "medio":
                education = "Ensino médio completo"
            break;
            case "superior":
                education = "Ensino superior completo"
            break;
            case "mestrado":
                education = "Mestrado"
            break;
            case "doutorado":
                education = "Doutorado"
            break;
        }
        return education;
    },
    school: function(grade){
        switch (grade) {
            case "5EF":
                grade = "5º ano do ensino fundamental"
            break;
            case "6EF":
                grade = "6º ano do ensino fundamental"
            break;
            case "7EF":
                grade = "7º ano do ensino fundamental"
            break;
            case "8EF":
                grade = "8º ano do ensino fundamental"
            break;
            case "9EF":
                grade = "9º ano do ensino fundamental"
            break;
            case "1EM":
                grade = "1º ano do ensino médio"
            break;
            case "2EM":
                grade = "2º ano do ensino médio"
            break;
            case "3EM":
                grade = "3º ano do ensino médio"
            break;
        }
        return grade;
    }
}