const createError = require('http-errors');
const employees = require('../data/employees.json') 

module.exports.list = (req, res, next) => {
    const page = parseInt(req.query.page)
    const oldest = req.query.oldest
    const user = req.query.user
    const badges = req.query.badges

    if(page){
        // /api/employees?page=N
        const perPage = 2
        const from = (page - 1) * perPage
        const to = from + page
        res.json(employees.slice(from, to))

    } else if(oldest == ""){
        // /api/employees?oldest
        let oldEmployee = {}
        let old = 0
        for (let employee of employees) {        
            if (old < employee.age) {
                old = employee.age
                oldEmployee = employee               
            }      
        }          
        return res.json(oldEmployee)
        
    }  else if(user) {
        // /api/employees?user=true
        let privileges = "user"
        let userEmployees = []
        if(user == "true"){
            for (let employee of employees) {        
                if (privileges == employee.privileges) {                 
                    userEmployees.push(employee)                
                }      
            }
        }
        return res.json(userEmployees)  
    }  else if(badges){
        // /api/employees?badges=black
        let employeesBadges = []       

        for (let employee of employees) {        
            for (let badge of employee.badges){
                if (badge == badges) {                 
                    employeesBadges.push(employee)                
                }            
            }           
        }       
        return res.json(employeesBadges)    
    
    }  else {
        res.json(employees)
    }  
}
module.exports.oldest = (req, res, next) => {
    const oldest = req.query.oldest
    let oldEmployee = {}
    let old = 0
    for (let employee of employees) {        
        if (old < employee.age) {
            old = employee.age
            oldEmployee = employee               
        }      
    }          
    return res.json(oldEmployee)

}
module.exports.name = (req, res, next) => {
    const name = req.params.name
    for (let employee of employees) {
        if (employee.name == name) {
            res.json(employee);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send({"code": "not_found"});
}
module.exports.create = (req, res, next) => {
    if(!req.body.name ||
        !req.body.age.toString().match(/^[0-9]{2}$/g) ||        
        !req.body.privileges ||
        !req.body.badges
       ){
       res.status(400);
       res.json({"code": "bad_request"});
    } else {       
       employees.push({
          name: req.body.name,
          age: req.body.age,
          phone: req.body.phone,          
          privileges: req.body.privileges,
          favorites: req.body.favorites,
          finished: req.body.finished,
          badges: req.body.badges,
          points: req.body.points
       });
       res.json({message: "New employee created.", location: "/api/employees/"});
    }
}