const moment = require('moment');

const formatDate =  (date, formatType) => {
    return moment(date).format(formatType);
}

const ifEquals = function(arg1, arg2) {
    if(!arg1){
        arg1 = ''
    }

    if(!arg2){
        arg2 = ''
    }
     return arg1.toString() == arg2.toString()
}

const priorityColor = function(priority) {
    switch (priority) {
        case 2:
            return 'background-color:orange; color:black;';
            break;
        case 3: 
            return 'background-color:yellow; color:black;';
            break;
        case 4: 
            return 'background-color:lightgreen; color:black;';
            break;
        case 5: 
            return 'background-color:green';
        default:
            return 'background-color:red;';
            break;
    }
}


module.exports = {
    formatDate,
    ifEquals,
    priorityColor
}