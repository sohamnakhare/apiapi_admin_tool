const apiai  = require("apiai");
const uuid = require("node-uuid");
const app = apiai("c9ad7b12395c443dbbd1696c8ec7f408",{language:'en'});
const sessionId = uuid.v4();

module.exports = (text, nextCb, errorCb)=>{
    console.log('inside chatter');
    const request = app.textRequest(text, {
        sessionId
    });
    
    request.on('response', function(response) {
        const responseForClient = getResponseForClient(response)
        nextCb(responseForClient)
    });
    
    request.on('error', function(error) {
        errorCb(error);
    });

    request.end();

    function getResponseForClient(res){
        return {message: getMessage(res.result)};
    }

    function getMessage(result){
        const intentName = result.metadata.intentName;
        const parameters = result.parameters;
        switch(intentName){
            case "context_information":
                return messageForContextInformation(parameters);
            case "role_context_information":
                return messageForRoleContext(parameters);
            case "role_information":
                return roleInformation(parameters);
        }
    }

    function messageForContextInformation(parameters){
        return "A context is used while creating a role/positon(only for employees)"+
        ". Different context values are store, country, department."+
        "bla bla bla defining context."
    }

    function messageForRoleContext(parameters){
        const keys = Object.keys(parameters);
        const fixedContextValues = parameters['geo-country'];
        const validContextValues = parameters['contexts'];
        let message="";
        if(fixedContextValues.length > 0 || validContextValues.length > 0){
            if(fixedContextValues.length > 0){
                message+="Set fixed values as country with values as "+fixedContextValues.toString();
            }
            if(validContextValues.length > 0){
                message+=" Set valid context as "+validContextValues.toString();
            }
        }
        return "Bla bla bla about context wrt to role."
    }

    function roleInformation(parameters){
        return "Bla bla bla about role.";
    }
}

