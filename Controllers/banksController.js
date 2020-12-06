
import bankFunctions from '../AppDefinedFunctions/bankFunctions.js';

export const createBank = (req, res) => {    

    const bank = req.body;  
    const addedBank = bankFunctions.addABank(bank);

    Promise.resolve(addedBank)
    .then(() => {
        res.send({
            'status': 200,
            'message': `Added ${bank.name} to database`
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(500);
    })
}


export const getBanks = (req, res) => {
    const getAllBanks = bankFunctions.getAllBanks();

    Promise.resolve(getAllBanks)
    .then(() => {
        res.json(getAllBanks);
    })
    .catch((err) => {
        console.log(err);
        res.status(500);
    })
}


export const getABank = (req, res) => {
    //const { id } = req.params;    

    const getABank = bankFunctions.getABank(req.query);

    Promise.resolve(getABank)
    .then(() => {
        
        res.send(getABank);
    })
    .catch((err) => {
        console.log(err);
        res.status(500);
    })
}



export const getSelectBanks = (req, res) => {
    const getSelectBanks = bankFunctions.getSelectBanks(req.query);

    Promise.resolve(getSelectBanks)
    .then(() => {
        res.send(getSelectBanks);
    })
    .catch((err) => {
        console.log(err);
        res.status(500);
    })

}



export const updateBank = (req, res) => {

    const { id } = req.params;
    const request = req.body;
    
    const updateABank = bankFunctions.updateABank(id, request);

    Promise.resolve(updateABank)
    .then(() => {
        res.send({
            'status': 200,
            'message': `Bank with id ${ id } has been updated`
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500);
    })

}



export const deleteBank = (req, res) => {
    const { id } = req.params;

    const deleteABank = bankFunctions.deleteABank(id)

    Promise.resolve(deleteABank)
    .then(() => {
        res.send({
            'message': `Bank with id ${ id } has been deleted`
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500);
    })      
}